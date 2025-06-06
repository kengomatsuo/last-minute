import React from 'react'
import CustomCard from './CustomCard'
import PropTypes from 'prop-types'

/**
 * Displays the user's upcoming scheduled sessions.
 *
 * @param {Object} props - Component props
 * @param {Array} props.courses - List of course objects
 * @returns {JSX.Element} The upcoming schedule card
 */
const formatDate = date => {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  if (date.toDateString() === today.toDateString()) {
    return 'Today'
  }
  if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow'
  }
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const UpcomingSchedule = ({ courses }) => {
  const upcomingCourses =
    courses &&
    courses
      .filter(course => course.bookingTime?.toDate)
      .sort((a, b) => a.bookingTime.toDate() - b.bookingTime.toDate())
      .slice(0, 3)

  return (
    <CustomCard className='w-full px-6 py-6'>
      <h3 className='text-xl font-bold mb-4 text-[var(--color-primary-text)]'>
        Upcoming Sessions
      </h3>
      {upcomingCourses && upcomingCourses.length > 0 ? (
        <ul className='space-y-4'>
          {upcomingCourses.map(course => (
            <li
              key={course.id}
              className='flex items-center gap-4 p-3 bg-[var(--color-background-secondary)] rounded-md'
            >
              <div className='flex-shrink-0 text-center bg-[var(--color-card-outline)] p-2 rounded-md w-16'>
                <p className='font-bold text-sm text-[var(--color-primary-text)]'>
                  {formatDate(course.bookingTime.toDate())}
                </p>
              </div>
              <div className='min-w-0'>
                <p
                  className='font-semibold text-base text-[var(--color-primary-text)] truncate max-w-xs'
                  title={course.topic}
                >
                  {course.topic}
                </p>
                <p className='text-sm text-[var(--color-primary)]'>
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
        <p className='text-sm text-center text-[var(--color-primary)] py-4'>
          No sessions scheduled.
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
