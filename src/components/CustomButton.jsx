import PropTypes from 'prop-types'
import { useState, useEffect, useRef, useCallback } from 'react'
import LoadingDots from './LoadingDots'
import PopupIcon from '../assets/icons/angle-small-right.svg?react'

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
 * @param {boolean} props.loading - Whether the button is in a loading state
 * @param {React.ReactNode} props.popup - Popup content to be displayed when the button is clicked
 */
const CustomButton = ({
  filled = false,
  onClick = () => {},
  disabled = false,
  className,
  children,
  loading = false,
  type = 'button',
  popup = null,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const buttonRef = useRef(null)
  const popupRef = useRef(null)

  useEffect(() => {
    /**
     * Handle clicks outside of the popup to close it
     * 
     * @param {MouseEvent} event - The click event
     */
    const handleOutsideClick = (event) => {
      if (isPopupOpen && 
          buttonRef.current && 
          popupRef.current && 
          !buttonRef.current.contains(event.target) && 
          !popupRef.current.contains(event.target)) {
        setIsPopupOpen(false)
      }
    }

    if (isPopupOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isPopupOpen])

  const handleClick = useCallback(async event => {
    try {
      if (disabled || isLoading) {
        return
      }
      setIsLoading(true)
      await onClick(event)
    } catch (err) {
      console.error('CustomButton click error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [disabled, isLoading, onClick])

  return (
    <button
      ref={buttonRef}
      formNoValidate
      type={type}
      onClick={!popup ? handleClick : null}
      className={`${
        loading || isLoading ? 'pointer-events-none' : ''
      } ${className} ${
        popup ? '!p-0' : ''
      } ${isPopupOpen ? 'active:!ring-0' : ''} px-2.5 py-1 truncate transition-all ${
        filled
          ? 'bg-primary text-secondary-text'
          : 'bg-transparent text-primary'
      } ${
        disabled
          ? 'opacity-50 !cursor-not-allowed !hover:border-primary'
          : filled
          ? 'hover:bg-filled-button-hover hover:border-filled-button-hover active:bg-filled-button-active  active:ring-primary active:ring focus-visible:!ring-background-secondary'
          : 'hover:bg-interactive-hover hover:border-filled-button-hover active:bg-interactive-active  active:ring-primary active:ring focus-visible::ring-primary'
      } border-2 min-w-fit border-primary text-center box-border rounded-md font-semibold text-lg cursor-pointer
       focus:outline-none focus-visible:ring-2 relative overflow-visible flex justify-center`}
    >
      {isPopupOpen && (
        <div
          ref={popupRef}
          className={
            'absolute bottom-[calc(100%+0.5rem)] mb-2 self-center z-10'
          }
          onClick={e => {
            e.stopPropagation()
            e.preventDefault()
          }}
          onMouseDown={e => e.stopPropagation()}
          onMouseUp={e => e.stopPropagation()}
        >
          {popup}
        </div>
      )}
      <div
        className={`${disabled ? 'pointer-events-none' : ''} ${
          loading || isLoading ? 'opacity-0' : ''
        } ${
          popup
            ? 'p-2 hover:bg-interactive-hover active:bg-interactive-active !transition-all rounded-l-md'
            : 'active:opacity-75'
        } transition-transform active:scale-[97%]  flex gap-2 justify-center items-center`}
        onClick={popup && handleClick}
      >
        {children}
      </div>
      {popup && (
        <div
          className={`${
            loading || isLoading ? 'opacity-0' : ''
          } border-l-[1.5px] border-l-primary/40 h-full`}
        >
          <div
            className={`${
              loading || isLoading ? 'opacity-0' : ''
            } hover:bg-interactive-hover active:bg-interactive-active active:scale-[97%] transition-all rounded-r-md flex items-center justify-center h-full`}
            onClick={() => setIsPopupOpen(!isPopupOpen)}
          >
            <PopupIcon
              className={`${
                filled ? 'fill-background' : 'fill-primary'
              } ${isPopupOpen ? '-rotate-90' : 'rotate-90'} w-4 h-4`}
            />
          </div>
        </div>
      )}
      {(loading || isLoading) && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <LoadingDots
            dotsClassName={
              filled ? 'h-2 w-2 bg-background' : 'h-2 w-2 bg-primary'
            }
          />
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
  /**
   * Whether the button is in a loading state.
   * If true, the button will show a loading animation.
   * @type {boolean}
   */
  loading: PropTypes.bool,
  /**
   * The popup content to be displayed when the button is clicked.
   * This can be any React node.
   * @type {React.ReactNode}
   */
  popup: PropTypes.node,
}

export default CustomButton
