import { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { NAVBAR_HEIGHT } from '../constants/visualConstants'
import { doc, getDoc, increment, updateDoc } from 'firebase/firestore'
import { db } from '../../firebaseConfig'
import { UserContext } from '../contexts/UserContext'
import { ScreenContext } from '../contexts/ScreenContext'
import VideoCall from '../components/VideoCall'
import { CourseContext } from '../contexts/CourseContext'
import ChatComponent from '../components/ChatComponent'

/**
 * Video & chat session component that handles real-time messaging.
 *
 * @returns {JSX.Element} The session component
 */
const Session = () => {
  const { user } = useContext(UserContext)
  const { isSmallScreen, addAlert } = useContext(ScreenContext)
  const { courses } = useContext(CourseContext)
  const [courseData, setCourseData] = useState(null)
  const { search } = useLocation()
  const courseId = new URLSearchParams(search).get('course')

  // Fetch course data for display names
  useEffect(() => {
    if (!courseId) {
      return
    }
    // First try to get from CourseContext
    const contextCourse = courses.find(course => course.id === courseId)
    if (contextCourse) {
      setCourseData(contextCourse)
      return
    }
  }, [courseId, courses])

  /**
   * Handles the end call action for tutors with confirmation alert.
   *
   * @returns {Promise<void>}
   */
  const onEndCall = async () => {
    if (!courseId) {
      return
    }
    if (user?.claims?.isTutor) {
      addAlert({
        type: 'info',
        title: 'End Session',
        message: 'Are you sure you want to end this session?',
        cancelButton: true,
        okayButton: true,
        primary: 'cancel',
        onCancel: () => {},
        onOkay: async () => {
          try {
            console.log('Ending session for course:', courseId)
            const courseRef = doc(db, 'courses', courseId)
            await updateDoc(courseRef, { done: true })
            // Transfer course price to tutor's balance
            // Get course data to find price and tuteeId
            const courseSnap = await getDoc(courseRef)
            if (courseSnap.exists()) {
              const course = courseSnap.data()
              const price = course.price || 0
              const tutorId = course.tutorId
              if (tutorId && price > 0) {
                const tutorBalanceRef = doc(db, 'balance', tutorId)
                await updateDoc(tutorBalanceRef, {
                  money: window.firebase?.firestore?.FieldValue
                    ? window.firebase.firestore.FieldValue.increment(price)
                    : increment(price)
                })
              }
            }
          } catch (error) {
            console.error('Failed to end session:', error)
            addAlert({
              type: 'error',
              title: 'Error',
              message: 'Failed to end session. Please try again.'
            })
          }
        }
      })
      return
    }
    // If not tutor, just return or handle as needed
  }

  return (
    <div
      style={{ marginTop: NAVBAR_HEIGHT }}
      className='w-full flex flex-row flex-wrap justify-center'
    >
      <div className='flex-1 flex justify-center p-4 top-30 items-center bg-black rounded-xl min-w-96 w-full min-h-full'>
        <VideoCall courseId={courseId} onEndCall={onEndCall} />
      </div>
      <div className=' min-h-11/12 flex'>
        <ChatComponent courseId={courseId} courseData={courseData} />
      </div>
    </div>
  )
}

export default Session
