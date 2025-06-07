import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import CustomCard from './CustomCard'
import CustomButton from './CustomButton'

/**
 * QuickRebook component
 *
 * Displays a card with a list of recently booked topics for quick rebooking.
 * 
 * Note: Stores booking draft values as JSON strings in localStorage.
 *
 * @param {Object} props - Component props
 * @param {Array<Object>} props.courses - List of course objects
 * @returns {JSX.Element|null} The rendered component or null if no recent topics
 */
const QuickRebook = ({ courses }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const recentTopics = useMemo(() => {
    if (!courses) return []
    const pastCourses = courses.filter(
      course =>
        course.bookingTime?.toDate && course.bookingTime.toDate() < new Date()
    )
    const uniqueTopics = new Map()
    pastCourses
      .sort((a, b) => b.bookingTime.toDate() - a.bookingTime.toDate())
      .forEach(course => {
        const key = `${course.subject}-${course.topic}`
        if (!uniqueTopics.has(key)) {
          uniqueTopics.set(key, course)
        }
      })
    return Array.from(uniqueTopics.values()).slice(0, 3)
  }, [courses])

  const handleRebook = course => {
    try {
      console.log('Rebooking course:', course)
      localStorage.setItem(
        'BookingDraft_Subject',
        JSON.stringify(course.subject)
      )
      localStorage.setItem(
        'BookingDraft_Topic',
        JSON.stringify(course.topic)
      )
      localStorage.setItem(
        'BookingDraft_Details',
        JSON.stringify(course.details || '')
      )
      localStorage.setItem('BookingDraft_Instant', JSON.stringify(true))
      navigate('/booking')
    } catch (error) {
      // Log error with meaningful message
      console.error(
        'Failed to save booking draft to localStorage:',
        error
      )
    }
  }

  if (!recentTopics || recentTopics.length === 0) {
    return null
  }
  return (
    <CustomCard
      className='w-full px-6 py-6 shadow-sm'
      header={t('quickRebook.header')}
      footer={null}
      scrolling={false}
    >
      <ul className='space-y-3'>
        {recentTopics.map(course => (
          <li
            key={`rebook-${course.id}`}
            className='flex items-center justify-between gap-4 p-3 bg-background-secondary/50 rounded-md'
          >
            <div className='flex items-center gap-4 min-w-0'>
              <div className='min-w-0'>
                <p
                  className='font-semibold text-base text-primary-text truncate'
                  title={course.topic}
                >
                  {course.topic}
                </p>
                <p
                  className='text-sm text-primary-text truncate'
                  title={course.subject}
                >
                  {course.subject}
                </p>
              </div>
            </div>
            <CustomButton filled onClick={() => handleRebook(course)}>
              {t('quickRebook.rebookButton')}
            </CustomButton>
          </li>
        ))}
      </ul>
    </CustomCard>
  )
}

QuickRebook.propTypes = {
  /**
   * List of course objects to display for quick rebooking.
   * Each course should have the following shape:
   * {
   *   id: string | number,
   *   subject: string,
   *   topic: string,
   *   details?: string,
   *   bookingTime: { toDate: function }
   * }
   * @type {Array<Object>}
   */
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      subject: PropTypes.string.isRequired,
      topic: PropTypes.string.isRequired,
      details: PropTypes.string,
      bookingTime: PropTypes.shape({
        toDate: PropTypes.func.isRequired,
      }).isRequired,
    })
  ).isRequired,
}

export default QuickRebook
