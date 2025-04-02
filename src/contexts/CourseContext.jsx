import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  startAfter,
  where,
} from 'firebase/firestore'
import { httpsCallable } from 'firebase/functions'
import { auth, db, functions } from '../../firebaseConfig'
import { createContext, useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { UserContext } from './UserContext'
import { stringToFirestamp } from '../utils/conversions'
import { useConsoleLog } from '../hooks'
import { ScreenContext } from './ScreenContext'

/**
 * @typedef {Object} CourseContextType
 * @property {Array<Object>} courses - The user's active courses
 * @property {Array<Object>} requests - The user's pending course requests
 * @property {(courseForm: Object) => Promise<void>} requestCourse - Function to request a course
 * @property {(requestId: string) => Promise<void>} acceptRequest - Function to accept a request
 * @property {boolean} isRequestPending - Whether a request is in progress
 * @property {(id: string) => Promise<void>} cancelRequestCourse - Function to cancel a request
 * @property {boolean} isCancelRequestPending - Whether a cancel request is in progress
 * @property {(id: string) => Promise<void>} cancelCourse - Function to cancel a course
 * @property {boolean} isCancelPending - Whether a cancel is in progress
 */

const defaultContext = {
  courses: [],
  requests: [],
  requestCourse: async () => Promise.resolve(),
  isRequestPending: false,
  acceptRequest: async () => Promise.resolve(),
  isAcceptPending: false,
  cancelRequestCourse: async () => Promise.resolve(),
  isCancelRequestPending: false,
  cancelCourse: async () => Promise.resolve(),
  isCancelPending: false,
  loadNewerRequests: async () => Promise.resolve(), // Add this line
}

const CourseContext = createContext(defaultContext)

/**
 * Provider component for course-related data and operations.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} The CourseContext provider
 */
const CourseContextProvider = ({ children }) => {
  const { user } = useContext(UserContext)
  const { addAlert } = useContext(ScreenContext)
  const [courses, setCourses] = useState([])
  const [requests, setRequests] = useState([])
  const [isRequestPending, setIsRequestPending] = useState(false)
  const [isCancelRequestPending, setIsCancelRequestPending] = useState(false)
  const [isAcceptPending, setIsAcceptPending] = useState(false)
  const [isCancelPending, setIsCancelPending] = useState(false)
  const [lastVisibleRequest, setLastVisibleRequest] = useState(null)

  const isTutor = user?.claims?.isTutor

  // useConsoleLog('courses', courses)
  // useConsoleLog('requests', requests)
  // useConsoleLog('isTutor', isTutor)

  useEffect(() => {
    if (!auth.currentUser) return
    let coursesUnsubscribe
    let requestsUnsubscribe

    if (isTutor) {
      // Tutor view: courses where user is the tutor
      coursesUnsubscribe = onSnapshot(
        query(
          collection(db, 'courses'),
          where('tutorId', '==', auth.currentUser.uid)
        ),
        snapshot => {
          setCourses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        },
        error => {
          console.error('Error fetching tutor courses:', error)
        }
      )

      // Tutor view: all requests
      requestsUnsubscribe = onSnapshot(
        query(
          collection(db, 'requests'),
          orderBy('createdAt', 'desc'),
          limit(25)
        ),
        snapshot => {
          const requestDocs = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))

          // Store the last document for potential future pagination
          if (snapshot.docs.length > 0) {
            setLastVisibleRequest(snapshot.docs[snapshot.docs.length - 1])
          }

          requestDocs.sort((a, b) => {
            if (!a.bookingTime && b.bookingTime) return -1
            if (a.bookingTime && !b.bookingTime) return 1
            if (!a.bookingTime && !b.bookingTime) {
              // Compare timestamps by converting to milliseconds
              return a.createdAt.toMillis() - b.createdAt.toMillis()
            }
            // Compare timestamps by converting to milliseconds
            return a.bookingTime.toMillis() - b.bookingTime.toMillis()
          })
          setRequests(requestDocs)
        },
        error => {
          console.error('Error fetching tutor requests:', error)
        }
      )
    } else {
      // Student view: courses where user is the tutee
      coursesUnsubscribe = onSnapshot(
        query(
          collection(db, 'courses'),
          where('tuteeId', '==', auth.currentUser.uid)
        ),
        snapshot => {
          setCourses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        },
        error => {
          console.error('Error fetching student courses:', error)
        }
      )

      // Student view: requests where user is the tutee
      requestsUnsubscribe = onSnapshot(
        query(
          collection(db, 'requests'),
          where('tuteeId', '==', auth.currentUser.uid)
        ),
        snapshot => {
          setRequests(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        },
        error => {
          console.error('Error fetching student requests:', error)
        }
      )
    }

    return () => {
      if (coursesUnsubscribe) coursesUnsubscribe()
      if (requestsUnsubscribe) requestsUnsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTutor])

  /**
   * Load older requests beyond the initial 25
   * @returns {Promise<void>}
   */
  const loadNewerRequests = async () => {
    if (!isTutor) return
    if (!lastVisibleRequest) {
      console.warn('No more requests to load')
      return
    }

    try {
      const newerRequestsQuery = query(
        collection(db, 'requests'),
        orderBy('createdAt', 'desc'),
        startAfter(lastVisibleRequest),
        limit(25)
      )

      const snapshot = await getDocs(newerRequestsQuery)

      if (!snapshot.empty) {
        // Convert snapshot to array of request objects
        const newerRequests = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))

        // Update state by appending older requests
        setRequests(currentRequests => [...currentRequests, ...newerRequests])

        // Update the last visible document for next pagination
        setLastVisibleRequest(snapshot.docs[snapshot.docs.length - 1])
      }
    } catch (error) {
      console.error('Error loading older requests:', error)
    }
  }

  /**
   * Accept a course request by creating a new course and deleting the request.
   * Uses a server-side function to handle display names and chat initialization.
   *
   * @param {Object} requestData - The request to accept
   * @returns {Promise<void>} Promise that resolves when the request is accepted
   */
  const acceptRequest = async requestData => {
    if (!isTutor) return
    setIsAcceptPending(true)
    try {
      // Call the server-side function to accept the request
      const acceptCourseRequest = httpsCallable(
        functions,
        'acceptCourseRequest'
      )

      // Call the function with the request ID
      const result = await acceptCourseRequest({
        requestId: requestData.id,
      })

      console.log('Request accepted successfully:', result.data)
      addAlert({
        title: 'Request Accepted',
        message: 'Course accepted successfully!',
      })
    } catch (error) {
      console.error('Error accepting request:', error)
      addAlert({
        title: 'Error',
        message: `Error accepting request: ${error.message}`,
      })
    } finally {
      setIsAcceptPending(false)
    }
  }

  /**
   * Request a new course by adding it to the requests collection.
   *
   * @param {Object} courseForm - The course information
   * @returns {Promise<void>} Promise that resolves when the request is complete
   */
  const requestCourse = async courseForm => {
    try {
      if (!courseForm.subject || !courseForm.topic)
        throw new Error('Subject and topic are required')

      // convert courseForm's bookingTime string into firebase timestamp
      if (courseForm.bookingTime) {
        courseForm.bookingTime = stringToFirestamp(courseForm.bookingTime)
        if (!courseForm.bookingTime) throw new Error('Invalid booking time')
      }

      if (
        requests.some(
          course =>
            course.subject === courseForm.subject &&
            course.topic === courseForm.topic
        )
      )
        throw new Error(
          `Course already requested with subject: ${courseForm.subject} and topic: ${courseForm.topic}`
        )

      setIsRequestPending(true)
      await addDoc(collection(db, 'requests'), {
        tuteeId: auth.currentUser.uid,
        createdAt: serverTimestamp(),
        ...courseForm,
      })
      addAlert({
        title: 'Request Sent',
        message: 'Course request sent successfully!',
      })
    } catch (error) {
      addAlert({
        title: 'Error',
        message: `Error requesting course: ${error.message}`,
      })
      throw error
    } finally {
      setIsRequestPending(false)
    }
  }

  /**
   * Cancel a course request by deleting it from the requests collection.
   *
   * @param {string} id - The ID of the request to cancel
   * @returns {Promise<void>} Promise that resolves when the cancellation is complete
   */
  const cancelRequestCourse = async id => {
    try {
      setIsCancelRequestPending(true)
      await deleteDoc(doc(db, 'requests', id))
      console.log('Course cancelled successfully!')
    } catch (error) {
      console.error('Error cancelling course:', error)
    } finally {
      setIsCancelRequestPending(false)
    }
  }

  /**
   * Cancel a course by deleting it from the courses collection.
   *
   * @param {string} id - The ID of the course to cancel
   * @returns {Promise<void>} Promise that resolves when the cancellation is complete
   */
  const cancelCourse = async id => {
    try {
      setIsCancelPending(true)
      await deleteDoc(doc(db, 'courses', id))
      console.log('Course cancelled successfully!')
    } catch (error) {
      console.error('Error cancelling course:', error)
    } finally {
      setIsCancelPending(false)
    }
  }

  return (
    <CourseContext.Provider
      value={{
        courses,
        requests,
        loadNewerRequests,
        requestCourse,
        acceptRequest,
        cancelRequestCourse,
        cancelCourse,
        isRequestPending,
        isAcceptPending,
        isCancelRequestPending,
        isCancelPending,
      }}
    >
      {children}
    </CourseContext.Provider>
  )
}

CourseContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { CourseContext, CourseContextProvider }
