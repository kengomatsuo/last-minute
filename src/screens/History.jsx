import { useContext } from 'react'
import { CourseContext } from '../contexts/CourseContext'
import { CustomCard } from '../components'
import { firestampToString } from '../utils/conversions'
import { useTranslation } from 'react-i18next'
import { NAVBAR_HEIGHT } from '../constants/visualConstants'

/**
 * History component that displays a list of completed courses.
 *
 * @returns {JSX.Element} The rendered History component
 */
const History = () => {
  const { t } = useTranslation()
  const { courses } = useContext(CourseContext)

  /**
   * Get the translated subject name.
   *
   * @param {string} subject - The subject key
   * @returns {string} The translated subject name
   */
  const getSubjectLabel = subject => {
    return t(`subject.${subject}`, { defaultValue: subject })
  }

  const completedCourses = courses.filter(course => course.done === true)

  return (
    <div
      className='w-screen flex flex-col items-center justify-center'
      style={{ paddingTop: NAVBAR_HEIGHT }}
    >
      <CustomCard
        scrolling
        header={t('history.header', { defaultValue: 'History' })}
        className='w-[min(48rem,11/12*100%)] flex max-h-2/3 p-[min(3rem,4%)]'
      >
        <div className='divide-y flex-1 flex-col divide-primary'>
          {completedCourses.length === 0 && (
            <div className='py-8 text-center text-lg opacity-70'>
              {t('history.noHistory', { defaultValue: 'No completed courses yet.' })}
            </div>
          )}
          {completedCourses.map(course => (
            <div
              key={course.id}
              className='flex w-full gap-2 items-center py-2 px-4'
            >
              <div className='flex-1 text-left'>
                <p className='font-bold text-xl'>{getSubjectLabel(course.subject)}</p>
                <p className='font-semibold'>{course.topic}</p>
                <p
                  className={`${
                    !course.details ? 'italic opacity-75' : ''
                  } truncate`}
                >
                  {course.details ||
                    t('history.noDescription', { defaultValue: 'No description' })}
                </p>
                <p>
                  {course.bookingTime
                    ? firestampToString(course.bookingTime)
                    : t('history.completedAt', { date: firestampToString(course.createdAt) })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CustomCard>
    </div>
  )
}

export default History
