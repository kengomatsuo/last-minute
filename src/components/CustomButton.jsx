import PropTypes from 'prop-types'
import { useState } from 'react'

/**
 * CustomButton component
 *
 * The style of the button is controlled by the `filled` prop:
 * - If `filled` is true, the button will have a background color and white text.
 * - If `filled` is false, the button will be transparent with primary colored text.
 *
 * @param {Object} props - Component props
 * @param {boolean} props.filled - Whether the button is filled with the primary color
 * @param {Function} props.onClick - Click handler function
 * @param {boolean} props.disabled - Whether the button is disabled
 * @param {string} props.className - Custom class name for additional styling
 * @param {React.ReactNode} props.children - Button content, typically text or an icon
 * @param {'button' | 'submit' | 'reset'} props.type - The type of the button (e.g., "button", "submit", "reset")
 */
const CustomButton = ({
  filled = false,
  onClick = () => {},
  disabled = false,
  className,
  children,
  loading = false,
  type = 'button',
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async event => {
    if (disabled || isLoading) return
    setIsLoading(true)
    await onClick(event)
    setIsLoading(false)
  }

  return (
    <button
      formNoValidate
      type={type}
      onClick={handleClick}
      className={`${
        isLoading ? 'pointer-events-none' : ''
      } ${className} px-2.5 py-1 truncate transition-all ${
        filled
          ? 'bg-primary text-secondary-text'
          : 'bg-transparent text-primary'
      } ${
        disabled || isLoading
          ? 'opacity-50 !cursor-not-allowed !hover:border-primary'
          : filled
          ? 'hover:bg-filled-button-hover hover:border-filled-button-hover active:bg-filled-button-active  active:ring-primary active:ring focus:!ring-background-secondary'
          : 'hover:bg-interactive-hover hover:border-filled-button-hover active:bg-interactive-active  active:ring-primary active:ring focus:ring-primary'
      } border-2 min-w-fit border-primary text-center box-border rounded-md font-semibold text-lg cursor-pointer
       focus:outline-none focus:ring-2 relative`}
    >
      <div
        className={`${disabled ? 'pointer-events-none' : ''} ${
          loading ? 'opacity-0' : ''
        } transition-transform active:scale-[97%] active:opacity-75 flex gap-2 justify-center items-center`}
      >
        {children}
      </div>
      {loading && (
        // TODO: make this into a separate component
        <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex space-x-1">
          <span className={`w-2 h-2 rounded-full animate-bounce [animation-delay:0s] ${filled ? 'bg-white' : 'bg-primary'}`}></span>
          <span className={`w-2 h-2 rounded-full animate-bounce [animation-delay:0.2s] ${filled ? 'bg-white' : 'bg-primary'}`}></span>
          <span className={`w-2 h-2 rounded-full animate-bounce [animation-delay:0.4s] ${filled ? 'bg-white' : 'bg-primary'}`}></span>
        </div>
      </div>
      )}
    </button>
  )
}

CustomButton.propTypes = {
  /**
   * Whether the button is filled with the primary color.
   * If true, the button will have a background color and white text.
   * If false, the button will be transparent with primary colored text.
   * @type {boolean}
   */
  filled: PropTypes.bool,
  /**
   * Function to handle click events.
   * This function will be called when the button is clicked.
   * @type {Function}
   */
  onClick: PropTypes.func,
  /**
   * Whether the button is disabled.
   * If true, the button will be disabled and unclickable.
   * @type {boolean}
   */
  disabled: PropTypes.bool,
  /**
   * Custom class name for additional styling.
   * This allows for custom styles to be applied to the button.
   * @type {string}
   */
  className: PropTypes.string,
  /**
   * The content of the button.
   * This can be text, an icon, or any other React node.
   * This prop is required.
   * @type {React.ReactNode}
   */
  children: PropTypes.node.isRequired,
  /**
   * The type of the button.
   * This can be "button", "submit", or "reset".
   * @type {string}
   */
  type: PropTypes.string,
}

export default CustomButton
