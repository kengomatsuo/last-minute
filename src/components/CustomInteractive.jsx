import PropTypes from 'prop-types'
import { useState } from 'react'

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
}) => {
  const [isPressed, setIsPressed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    await onClick()
    setIsLoading(false)
  }

  return (
    <div
      className={`${
        isLoading ? 'pointer-events-none opacity-50' : ''
      } ${className} px-3 py-1 w-full rounded-md hover:bg-interactive-hover
        active:bg-interactive-active active:ring-background-secondary active:ring truncate text-primary-text text-center font-medium text-lg cursor-pointer`}
      onClick={handleClick}
      onPointerDown={() => setIsPressed(true)}
      onPointerCancel={() => setIsPressed(false)}
      onPointerUp={() => setIsPressed(false)}
      onPointerLeave={() => setIsPressed(false)}
    >
      <div
        className={`transition-transform w-min ${
          isPressed ? 'scale-[97%]' : ''
        }`}
      >
        {children}
      </div>
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
