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
      style={{ paddingTop: NAVBAR_HEIGHT }}
      className='w-screen flex flex-row'
    >
      <div className='flex-1 flex'>
        <div className='flex-1 flex flex-col'>
          <div className='flex-1 flex justify-center items-center bg-black'>
            <VideoCall courseId={courseId} />
          </div>
        </div>
      </div>
      <ChatComponent courseId={courseId} courseData={courseData} />
    </div>
  )
}

export default Session
