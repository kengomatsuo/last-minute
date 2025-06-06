import { useMemo } from 'react'
import CustomCard from './CustomCard'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useLocalStorage } from '../hooks'

/**
 * Displays the user's weekly progress and goal tracker.
 *
 * @param {Object} props - Component props
 * @param {Array} props.courses - List of course objects
 * @returns {JSX.Element} The progress tracker card
 */
const ProgressTracker = ({ courses }) => {
  const { t } = useTranslation()
  const [goal, setGoal] = useLocalStorage('weekly_goal', 3)

  const completedThisWeek = useMemo(() => {
    const today = new Date()
    const dayOfWeek = today.getDay()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(
      today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)
    )
    startOfWeek.setHours(0, 0, 0, 0)

    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)
    endOfWeek.setHours(23, 59, 59, 999)

    if (!courses) return 0

    return courses.filter(course => {
      if (!course.done) return false
      const courseDate = course.createdAt.toDate()
      return (
        courseDate >= startOfWeek &&
        courseDate <= endOfWeek &&
        courseDate < new Date()
      )
    }).length
  }, [courses])

  const progressPercentage =
    goal > 0 ? Math.min((completedThisWeek / goal) * 100, 100) : 0

  const incrementGoal = () => setGoal(g => g + 1)
  const decrementGoal = () => setGoal(g => Math.max(1, g - 1))

  return (
    <CustomCard className='w-full px-6 py-6'>
      <h3 className='text-xl font-bold mb-1 text-primary-text'>
        {t('progressTracker.weeklyGoal')}
      </h3>
      <p className='text-sm text-primary mb-4'>
        {t('progressTracker.completed', { completed: completedThisWeek, goal })}
      </p>

      <div className='w-full bg-background-secondary/30 rounded-full h-3 mb-4'>
        <div
          className='bg-primary h-3 rounded-full transition-all duration-500'
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      <div className='flex items-center justify-center gap-4'>
        <p className='text-sm font-semibold text-primary-text'>
          {t('progressTracker.setGoal')}
        </p>
        <div className='flex items-center gap-2 border border-card-outline rounded-md p-1 bg-input-background'>
          <button
            onClick={decrementGoal}
            className='p-1 rounded hover:bg-interactive-hover'
          >
            <span className='text-lg'>-</span>
          </button>
          <span className='font-bold text-lg text-primary-text w-6 text-center'>
            {goal}
          </span>
          <button
            onClick={incrementGoal}
            className='p-1 rounded hover:bg-interactive-hover'
          >
            <span className='text-lg'>+</span>
          </button>
        </div>
      </div>
    </CustomCard>
  )
}

ProgressTracker.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      bookingTime: PropTypes.shape({
        toDate: PropTypes.func,
      }),
    })
  ),
}

export default ProgressTracker
