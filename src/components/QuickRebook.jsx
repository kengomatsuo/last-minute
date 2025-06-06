import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

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
    localStorage.setItem('BookingDraft_Subject', course.subject)
    localStorage.setItem('BookingDraft_Topic', course.topic)
    localStorage.setItem('BookingDraft_Details', course.details || '')
    localStorage.setItem('BookingDraft_Instant', 'true')
    navigate('/booking')
  }

  if (!recentTopics || recentTopics.length === 0) {
    return null
  }
  return (
    <div className='w-full bg-white border border-card-outline rounded-lg px-6 py-6 shadow-sm'>
      <h3 className='text-xl font-bold mb-4'>{t('quickRebook.header')}</h3>
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
                  className='text-sm text-secondary-text truncate'
                  title={course.subject}
                >
                  {course.subject}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleRebook(course)}
              className='py-2 px-4 rounded font-semibold bg-card-outline text-white hover:bg-card-outline/80 transition text-sm flex-shrink-0'
            >
              {t('quickRebook.rebookButton')}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default QuickRebook
