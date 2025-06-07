import { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { NAVBAR_HEIGHT } from '../constants/visualConstants'
import { doc, getDoc } from 'firebase/firestore'
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
  const { isSmallScreen } = useContext(ScreenContext)
  const { courses } = useContext(CourseContext)
  const [courseData, setCourseData] = useState(null)
  const { search } = useLocation()
  const courseId = new URLSearchParams(search).get('course')

  // Fetch course data for display names
  useEffect(() => {
    if (!courseId) return

    // First try to get from CourseContext
    const contextCourse = courses.find(course => course.id === courseId)
    if (contextCourse) {
      setCourseData(contextCourse)
      return
    }
  }, [courseId, courses])

  return (
    <div
      style={{ marginTop: NAVBAR_HEIGHT }}
      className='w-full flex flex-row flex-wrap justify-center'
    >
      <div className='flex-1 flex justify-center p-4 top-30 items-center bg-black min-w-96 w-full min-h-full'>
        <VideoCall courseId={courseId} />
      </div>
      <div className=' min-h-11/12 flex'>
        <ChatComponent courseId={courseId} courseData={courseData} />
      </div>
    </div>
  )
}

export default Session
