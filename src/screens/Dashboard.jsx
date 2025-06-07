import { useContext, useEffect, useState, useRef } from 'react'
import { CourseContext } from '../contexts/CourseContext'
import { UserContext } from '../contexts/UserContext'
import UpcomingSchedule from '../components/UpcomingSchedule'
import ProgressTracker from '../components/ProgressTracker'
import QuickRebook from '../components/QuickRebook'
import CustomButton from '../components/CustomButton'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import CustomCard from '../components/CustomCard'
import { useTranslation } from 'react-i18next'
import ChatComponent from '../components/ChatComponent'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Dashboard page for students and tutors.
 *
 * @returns {JSX.Element} The rendered dashboard
 */
const Dashboard = () => {
  const { t } = useTranslation()
  const { user } = useContext(UserContext)
  const { courses } = useContext(CourseContext)
  const [notifications, setNotifications] = useState([])
  const [chatCourse, setChatCourse] = useState(null)
  const chatRef = useRef(null)

  const isTutor = user?.claims?.isTutor

  useEffect(() => {
    const checkReminders = () => {
      if (!courses) {
        return
      }
      const now = new Date()
      const upcomingNotifications = []

      courses.forEach(course => {
        if (!course.bookingTime?.toDate) {
          return
        }
        const courseTime = course.bookingTime.toDate()
        const timeDiff = courseTime - now

        const ONE_DAY = 24 * 60 * 60 * 1000
        const THIRTY_MINUTES = 30 * 60 * 1000

        if (timeDiff > 0 && timeDiff <= THIRTY_MINUTES) {
          upcomingNotifications.push({ ...course, reminderType: 'minutes' })
        } else if (timeDiff > 0 && timeDiff <= ONE_DAY) {
          upcomingNotifications.push({ ...course, reminderType: 'day' })
        }
      })
      setNotifications(upcomingNotifications)
    }

    checkReminders()
    const intervalId = setInterval(checkReminders, 60000)
    return () => clearInterval(intervalId)
  }, [courses])

  // Close chat when clicking outside
  useEffect(() => {
    if (!chatCourse) {
      return
    }
    /**
     * Handles click outside the chat component.
     *
     * @param {MouseEvent} event - The mouse event
     */
    const handleClickOutside = event => {
      if (
        chatRef.current &&
        !chatRef.current.contains(event.target)
      ) {
        setChatCourse(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [chatCourse])

  /**
   * Notification bar for course reminders.
   *
   * @param {Object} props - Component props
   * @param {Object} props.course - The course object
   * @param {'day' | 'minutes'} props.reminderType - Type of reminder
   * @returns {JSX.Element|null} The notification bar
   */
  const NotificationBar = ({ course, reminderType }) => {
    let reminderText = ''

    const courseTime = course.bookingTime?.toDate().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })

    if (reminderType === 'day') {
      reminderText = `Your course, "${course.topic}" in ${course.subject}, is scheduled for tomorrow at ${courseTime}.`
    } else if (reminderType === 'minutes') {
      reminderText = `Your course, "${course.topic}" in ${course.subject}, starts in 30 minutes!`
    }

    if (!reminderText) {
      return null
    }

    return (
      <div className='bg-alert-background border border-card-outline rounded-md p-4 mb-8 shadow-sm'>
        <h3 className='font-semibold text-lg text-primary-text'>
          Reminder ⏰
        </h3>
        <p className='text-base text-primary-text'>{reminderText}</p>
      </div>
    )
  }

  NotificationBar.propTypes = {
    course: PropTypes.shape({
      id: PropTypes.string,
      topic: PropTypes.string,
      subject: PropTypes.string,
      details: PropTypes.string,
      bookingTime: PropTypes.shape({
        toDate: PropTypes.func,
      }),
    }).isRequired,
    reminderType: PropTypes.oneOf(['day', 'minutes']).isRequired,
  }

  /**
   * Student dashboard view.
   *
   * @returns {JSX.Element} The student dashboard
   */
  const StudentDashboard = () => (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
      <div className='lg:col-span-2'>
        <CustomCard className='px-6 md:px-10 py-8'>
          <h2 className='text-2xl font-bold mb-6 text-primary-text'>
            {t('dashboard.myCourses', 'My Courses')}
          </h2>
          <div className='divide-y divide-card-outline'>
            {courses && courses.length > 0 ? (
              courses.map(course => (
                <div
                  key={course.id}
                  className='flex flex-col sm:flex-row sm:items-center py-5 gap-4'
                >
                  <div className='flex-1 min-w-0'>
                    <div className='font-bold text-lg text-primary-text'>
                      {course.subject}
                    </div>
                    <div
                      className='font-semibold text-base break-words truncate max-w-full text-primary-text'
                      title={course.topic}
                    >
                      {course.topic}
                    </div>
                    <div
                      className='mt-1 text-primary course-description truncate max-w-full'
                      title={course.details}
                    >
                      {course.details || 'No description'}
                    </div>
                  </div>
                  <div className='flex flex-col sm:flex-row gap-2 w-full sm:w-auto sm:min-w-[160px]'>
                    <CustomButton
                      className='w-full sm:w-auto'
                      onClick={() => setChatCourse(course)}
                    >
                      Chat
                    </CustomButton>
                    <Link
                      to={{
                        pathname: '/session',
                        search: `course=${course.id}`,
                      }}
                      className='w-full sm:w-auto'
                    >
                      <CustomButton filled className='w-full sm:w-auto'>
                        Start Session
                      </CustomButton>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className='text-center text-primary py-4'>
                You have no upcoming courses. Book one from the Booking page!
              </p>
            )}
          </div>
        </CustomCard>
      </div>
      <div className='flex flex-col gap-8'>
        <UpcomingSchedule courses={courses} />
        <ProgressTracker courses={courses} />
        <QuickRebook courses={courses} />
      </div>
    </div>
  )

  /**
   * Tutor dashboard view.
   *
   * @returns {JSX.Element} The tutor dashboard
   */
  const TutorDashboard = () => (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
      <div className='lg:col-span-2'>
        <CustomCard className='px-6 md:px-10 py-8'>
          <h2 className='text-2xl font-bold mb-6 text-primary-text'>
            Tutor Dashboard
          </h2>
          <div className='divide-y divide-card-outline'>
            <div className='divide-y divide-card-outline'>
              {courses && courses.length > 0 ? (
                courses.map(course => (
                  <div
                    key={course.id}
                    className='flex flex-col sm:flex-row sm:items-center py-5 gap-4'
                  >
                    <div className='flex-1 min-w-0'>
                      <div className='font-bold text-lg text-primary-text'>
                        {course.subject}
                      </div>
                      <div
                        className='font-semibold text-base break-words truncate max-w-full text-primary-text'
                        title={course.topic}
                      >
                        {course.topic}
                      </div>
                      <div
                        className='mt-1 text-primary-text course-description truncate max-w-full'
                        title={course.details}
                      >
                        {course.details || 'No description'}
                      </div>
                    </div>
                    <div className='flex flex-col sm:flex-row gap-2 w-full sm:w-auto sm:min-w-[160px]'>
                      <CustomButton
                        className='w-full sm:w-auto'
                        onClick={() => setChatCourse(course)}
                      >
                        Chat
                      </CustomButton>
                      <Link
                        to={{
                          pathname: '/session',
                          search: `course=${course.id}`,
                        }}
                        className='w-full sm:w-auto'
                      >
                        <CustomButton filled className='w-full sm:w-auto'>
                          Start Session
                        </CustomButton>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p className='text-center text-primary py-4'>
                  You have no upcoming courses. Book one from the Booking page!
                </p>
              )}
            </div>
          </div>
        </CustomCard>
      </div>
      <div className='flex flex-col gap-0'>
        <UpcomingSchedule courses={courses} />
        <ProgressTracker courses={courses} />
      </div>
    </div>
  )

  return (
    <div className='flex flex-col flex-1 min-h-screen bg-background font-[Montserrat]'>
      <main className='w-full px-6 md:px-12 pt-23 pb-6'>
        {/* {notifications.map(notification => (
          <NotificationBar
            key={`${notification.id}-${notification.reminderType}`}
            course={notification}
            reminderType={notification.reminderType}
          />
        ))} */}
        {isTutor ? <TutorDashboard /> : <StudentDashboard />}
        <AnimatePresence>
          {chatCourse && (
            <motion.div
              className='fixed flex bottom-4 right-4 w-fit z-50'
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div
                className='flex flex-1 h-[75vh] w-fit'
                ref={chatRef}
              >
                {chatCourse && (
                  <ChatComponent
                    courseId={chatCourse.id}
                    courseData={chatCourse}
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

export default Dashboard
