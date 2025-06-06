import { useContext, useEffect, useState } from 'react'
import { CourseContext } from '../contexts/CourseContext'
import { UserContext } from '../contexts/UserContext'
import UpcomingSchedule from '../components/UpcomingSchedule'
import ProgressTracker from '../components/ProgressTracker'
import QuickRebook from '../components/QuickRebook'
import CustomButton from '../components/CustomButton'
import { Link, useNavigate } from 'react-router-dom'

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

  if (!reminderText) return null

  return (
    <div className='bg-[#f3f1e3] border border-[#bdb9a7] rounded-md p-4 mb-8 shadow-sm'>
      <h3 className='font-semibold text-lg text-[#57534e]'>Reminder ⏰</h3>
      <p className='text-base text-[#7d7865]'>{reminderText}</p>
    </div>
  )
}

const Dashboard = () => {
  const { user } = useContext(UserContext)
  const { courses } = useContext(CourseContext)
  const [notifications, setNotifications] = useState([])
  const navigate = useNavigate()

  const isTutor = user?.claims?.isTutor

  useEffect(() => {
    const checkReminders = () => {
      if (!courses) return
      const now = new Date()
      const upcomingNotifications = []

      courses.forEach(course => {
        if (!course.bookingTime?.toDate) return
        const courseTime = course.bookingTime.toDate()
        const timeDiff = courseTime - now

        const oneDay = 24 * 60 * 60 * 1000
        const thirtyMinutes = 30 * 60 * 1000

        if (timeDiff > 0 && timeDiff <= thirtyMinutes) {
          upcomingNotifications.push({ ...course, reminderType: 'minutes' })
        } else if (timeDiff > 0 && timeDiff <= oneDay) {
          upcomingNotifications.push({ ...course, reminderType: 'day' })
        }
      })
      setNotifications(upcomingNotifications)
    }

    checkReminders()
    const intervalId = setInterval(checkReminders, 60000)
    return () => clearInterval(intervalId)
  }, [courses])

  const StudentDashboard = () => (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
      <div className='lg:col-span-2'>
        <div className='bg-white border border-[#bdb9a7] rounded-lg px-6 md:px-10 py-8 shadow-sm'>
          <h2 className='text-2xl font-bold mb-6'>My Courses</h2>
          <div className='divide-y divide-[#e0dcc8]'>
            {courses && courses.length > 0 ? (
              courses.map(course => (
                <div
                  key={course.id}
                  className='flex flex-col sm:flex-row sm:items-center py-5 gap-4'
                >
                  <div className='flex-1 min-w-0'>
                    <div className='font-bold text-lg'>{course.subject}</div>
                    <div
                      className='font-semibold text-base break-words truncate max-w-full'
                      title={course.topic}
                    >
                      {course.topic}
                    </div>
                    <div
                      className={'mt-1 text-[#7d7865] course-description truncate max-w-full'}
                      title={course.details}
                    >
                      {course.details || 'No description'}
                    </div>
                  </div>
                  <div className='flex flex-col sm:flex-row gap-2 w-full sm:w-auto sm:min-w-[160px]'>
                    <CustomButton className='w-full sm:w-auto'>
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
              <p className='text-center text-[#7d7865] py-4'>
                You have no upcoming courses. Book one from the Booking page!
              </p>
            )}
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-8'>
        <UpcomingSchedule courses={courses} />
        <ProgressTracker courses={courses} />
        <QuickRebook courses={courses} />
      </div>
    </div>
  )

  const TutorDashboard = () => (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
      <div className='lg:col-span-2'>
        <div className='bg-white border border-[#bdb9a7] rounded-lg px-6 md:px-10 py-8 shadow-sm'>
          <h2 className='text-2xl font-bold mb-6'>Tutor Dashboard</h2>
          <div className='divide-y divide-[#e0dcc8]'>
            <p className='mb-4'>
              Welcome, Tutor! Please visit the{' '}
              <a href='/requests' className='underline font-semibold'>
                Requests Page
              </a>{' '}
              to see pending sessions.
            </p>
            <div className='divide-y divide-[#e0dcc8]'>
            {courses && courses.length > 0 ? (
              courses.map(course => (
                <div
                  key={course.id}
                  className='flex flex-col sm:flex-row sm:items-center py-5 gap-4'
                >
                  <div className='flex-1 min-w-0'>
                    <div className='font-bold text-lg'>{course.subject}</div>
                    <div
                      className='font-semibold text-base break-words truncate max-w-full'
                      title={course.topic}
                    >
                      {course.topic}
                    </div>
                    <div
                      className={'mt-1 text-[#7d7865] course-description truncate max-w-full'}
                      title={course.details}
                    >
                      {course.details || 'No description'}
                    </div>
                  </div>
                  <div className='flex flex-col sm:flex-row gap-2 w-full sm:w-auto sm:min-w-[160px]'>
                    <CustomButton className='w-full sm:w-auto'>
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
              <p className='text-center text-[#7d7865] py-4'>
                You have no upcoming courses. Book one from the Booking page!
              </p>
            )}
          </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-8'>
        {/* Optionally add tutor-specific widgets here */}
        <UpcomingSchedule courses={courses} />
        <ProgressTracker courses={courses} />
      </div>
    </div>
  )

  return (
    <div className='flex flex-col flex-1 min-h-screen bg-[#f8f7f4] font-[Montserrat]'>
      <main className='w-full px-6 md:px-12 pt-23 pb-6'>
        {notifications.map(notification => (
          <NotificationBar
            key={`${notification.id}-${notification.reminderType}`}
            course={notification}
            reminderType={notification.reminderType}
          />
        ))}
        {isTutor ? <TutorDashboard /> : <StudentDashboard />}
      </main>
    </div>
  )
}

export default Dashboard
