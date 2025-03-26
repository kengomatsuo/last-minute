import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  where,
} from 'firebase/firestore'
import { createContext, useEffect, useState, useContext } from 'react'
import { auth, db } from '../../firebaseConfig'
import PropTypes from 'prop-types'
import { useConsoleLog } from '../hooks'
import { UserContext } from './UserContext'

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
  const [courses, setCourses] = useState([])
  const [requests, setrequests] = useState([])
  const [isRequestPending, setIsRequestPending] = useState(false)
  const [isCancelRequestPending, setIsCancelRequestPending] = useState(false)
  const [isAcceptPending, setIsAcceptPending] = useState(false)
  const [isCancelPending, setIsCancelPending] = useState(false)
  const [lastVisibleRequest, setLastVisibleRequest] = useState(null)

  const { user } = useContext(UserContext)
  const isTutor = user?.claims?.isTutor

  useConsoleLog('courses', courses)
  useConsoleLog('requests', requests)
  useConsoleLog('isTutor', isTutor)

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
            ...doc.data() 
          }));

          // Store the last document for potential future pagination
          if (snapshot.docs.length > 0) {
            setLastVisibleRequest(snapshot.docs[snapshot.docs.length - 1]);
          }

          setrequests(requestDocs);
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
          setrequests(
            snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
          )
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
      console.warn('No more requests to load');
      return;
    }

    try {
      const newerRequestsQuery = query(
        collection(db, 'requests'),
        orderBy('createdAt', 'asc'),
        startAfter(lastVisibleRequest),
        limit(25)
      );

      const snapshot = await getDocs(newerRequestsQuery);

      if (!snapshot.empty) {
        // Convert snapshot to array of request objects
        const newerRequests = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Update state by appending older requests
        setrequests(currentRequests => [
          ...currentRequests, 
          ...newerRequests
        ]);

        // Update the last visible document for next pagination
        setLastVisibleRequest(snapshot.docs[snapshot.docs.length - 1]);
      }
    } catch (error) {
      console.error('Error loading older requests:', error);
    }
  }

  /**
   * Accept a course request by creating a new course and deleting the request.
   *
   * @param {Object} request - The request to accept
   * @returns {Promise<void>} Promise that resolves when the request is accepted
   */
  const acceptRequest = async request => {
    if (!isTutor) return
    setIsAcceptPending(true)
    try {
      // Run the operations as a transaction
      await runTransaction(db, async transaction => {
        // exclude request.id from the request object
        const { id, createdAt, ...request } = request

        // Create a new course document with the request data
        transaction.set(doc(collection(db, 'courses')), {
          ...request,
          tutorId: auth.currentUser.uid,
          requestedAt: createdAt,
          createdAt: serverTimestamp(),
        })

        // Delete the request document
        transaction.delete(doc(db, 'requests', request.id))
      })
      alert('Request accepted successfully!')
    } catch (error) {
      alert('Error accepting request:', error);
    }
    setIsAcceptPending(false)
  }

  /**
   * Request a new course by adding it to the requests collection.
   *
   * @param {Object} courseForm - The course information
   * @returns {Promise<void>} Promise that resolves when the request is complete
   */
  const requestCourse = async courseForm => {
    try {
      if (
        requests.some(
          course =>
            course.subject === courseForm.subject &&
            course.topic === courseForm.topic
        )
      )
        throw new Error('Course already requested')
      setIsRequestPending(true)
      await addDoc(collection(db, 'requests'), {
        tuteeId: auth.currentUser.uid,
        createdAt: serverTimestamp(),
        ...courseForm,
      })
      alert('Course added successfully!')
    } catch (error) {
      alert('Error requesting course:', error)
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
