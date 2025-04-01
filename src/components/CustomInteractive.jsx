import PropTypes from 'prop-types'
import { useState, useCallback } from 'react'
import LoadingDots from './LoadingDots'

/**
 * CustomInteractive component
 *
 * This component renders an interactive div that changes style when pressed.
 *
 * @param {Object} props - Component props
 * @param {string} props.className - Custom class name for additional styling
 * @param {Function} props.onClick - Click handler function
 * @param {React.ReactNode} props.children - Content of the interactive element, typically text or an icon
 */
const CustomInteractive = ({
  className = '',
  children,
  onClick = () => {},
  loading = false,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = useCallback(async () => {
    try {
      setIsLoading(true)
      await onClick()
    } catch (err) {
      console.error('CustomInteractive click error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [onClick])

  return (
    <div
      className={`${
        loading || isLoading ? 'pointer-events-none' : ''
      } ${isLoading ? 'opacity-50' : ''} ${className} px-3 py-1 w-full rounded-md hover:bg-interactive-hover
        active:bg-interactive-active active:scale-[97%] active:ring-background-secondary active:ring text-ellipsis relative text-primary-text text-center font-medium text-lg cursor-pointer`}
      onClick={handleClick}
    >
      <div
        className={`${loading ? 'opacity-0' :''} transition-transform justify-center flex w-full`}
      >
        {children}
      </div>
      {(loading || isLoading) && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <LoadingDots dotsClassName='h-2 w-2 bg-primary' />
        </div>
      )}
    </div>
  )
}

CustomInteractive.propTypes = {
  /**
   * Custom class name for additional styling.
   * This allows for custom styles to be applied to the interactive element.
   * @type {string}
   */
  className: PropTypes.string,
  /**
   * Function to handle click events.
   * This function will be called when the interactive element is clicked.
   * @type {Function}
   */
  onClick: PropTypes.func,
  /**
   * The content of the interactive element.
   * This can be text, an icon, or any other React node.
   * This prop is required.
   * @type {React.ReactNode}
   */
  children: PropTypes.node.isRequired,
}

export default CustomInteractive
