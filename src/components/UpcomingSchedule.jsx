import React from 'react'
import CustomCard from './CustomCard'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

/**
 * Displays the user's upcoming scheduled sessions.
 *
 * @param {Object} props - Component props
 * @param {Array} props.courses - List of course objects
 * @returns {JSX.Element} The upcoming schedule card
 */
const formatDate = (date, t) => {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  if (date.toDateString() === today.toDateString()) {
    return t('upcomingSchedule.today')
  }
  if (date.toDateString() === tomorrow.toDateString()) {
    return t('upcomingSchedule.tomorrow')
  }
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const UpcomingSchedule = ({ courses }) => {
  const { t } = useTranslation()

  const upcomingCourses =
    courses &&
    courses
      .filter(course => course.bookingTime?.toDate)
      .sort((a, b) => a.bookingTime.toDate() - b.bookingTime.toDate())
      .slice(0, 3)

  return (
    <CustomCard className='w-full px-6 py-6'>
      <h3 className='text-xl font-bold mb-4 text-primary-text'>
        {t('upcomingSchedule.header')}
      </h3>
      {upcomingCourses && upcomingCourses.length > 0 ? (
        <ul className='space-y-4'>
          {upcomingCourses.map(course => (
            <li
              key={course.id}
              className='flex items-center gap-4 p-3 bg-background-secondary/50 rounded-md'
            >
              <div className='flex-shrink-0 text-center bg-card-outline p-2 rounded-md w-16'>
                <p className='font-bold text-sm text-filled-button-text'>
                  {formatDate(course.bookingTime.toDate(), t)}
                </p>
              </div>
              <div className='min-w-0'>
                <p
                  className='font-semibold text-base text-primary-text truncate max-w-xs'
                  title={course.topic}
                >
                  {course.topic}
                </p>
                <p className='text-sm text-primary-text'>
                  {course.bookingTime
                    .toDate()
                    .toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-sm text-center text-primary py-4'>
          {t('upcomingSchedule.noSessions')}
        </p>
      )}
    </CustomCard>
  )
}

UpcomingSchedule.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      topic: PropTypes.string,
      bookingTime: PropTypes.shape({
        toDate: PropTypes.func,
      }),
    })
  ),
}

export default UpcomingSchedule
