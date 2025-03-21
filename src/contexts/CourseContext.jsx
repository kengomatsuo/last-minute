import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore'
import { createContext, useEffect, useState } from 'react'
import { auth, db } from '../../firebaseConfig'
import PropTypes from 'prop-types'
import { useConsoleLog } from '../hooks'

const defaultContext = {
  courses: [],
  requestCourse: async () => Promise.resolve(),
  isRequestPending: false,
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
  const [pendingCourses, setPendingCourses] = useState([])
  const [isRequestPending, setIsRequestPending] = useState(false)
  const [isCancelPending, setIsCancelPending] = useState(false)

  useConsoleLog('pendingCourses', pendingCourses)

  useEffect(() => {
    const coursesUnsubscribe = onSnapshot(
      query(
        collection(db, 'courses'),
        where('tuteeId', '==', auth.currentUser.uid)
      ),
      snapshot => {
        setCourses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      }
    )

    const requestsUnsubscribe = onSnapshot(
      query(
        collection(db, 'requests'),
        where('tuteeId', '==', auth.currentUser.uid)
      ),
      snapshot => {
        setPendingCourses(
          snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        )
      }
    )

    return () => {
      coursesUnsubscribe()
      requestsUnsubscribe()
    }
  }, [])

  /**
   * Request a new course by adding it to the requests collection.
   *
   * @param {Object} courseForm - The course information
   * @returns {Promise<void>} Promise that resolves when the request is complete
   */
  const requestCourse = async courseForm => {
    try {
      if (
        pendingCourses.some(
          course =>
            course.Subject === courseForm.Subject &&
            course.Topic === courseForm.Topic
        )
      )
        throw new Error('Course already requested')
      setIsRequestPending(true)
      await addDoc(collection(db, 'requests'), {
        tuteeId: auth.currentUser.uid,
        createdAt: serverTimestamp(),
        ...courseForm,
      })
      console.log('Course added successfully!')
    } catch (error) {
      console.error('Error requesting course:', error)
      throw error
    } finally {
      setIsRequestPending(false)
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
        pendingCourses,
        requestCourse,
        cancelCourse,
        isRequestPending,
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
