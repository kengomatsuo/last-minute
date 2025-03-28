import PropTypes from 'prop-types'

/**
 * A loading indicator component that displays animated bouncing dots.
 *
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.dotsClassName - Additional CSS classes for the dots
 * @returns {JSX.Element} The loading dots component
 */
const LoadingDots = ({ className = '', dotsClassName = '' }) => {
  const appliedDotsClassName = dotsClassName ? dotsClassName : 'h-2 w-2 bg-primary'

  return (
    <div className={`${className} flex items-center justify-center`}>
      <div className={'flex space-x-1'}>
        <span
          className={`${appliedDotsClassName} rounded-full animate-bounce [animation-delay:0s]`}
        ></span>
        <span
          className={`${appliedDotsClassName} rounded-full animate-bounce [animation-delay:0.2s]`}
        ></span>
        <span
          className={`${appliedDotsClassName} rounded-full animate-bounce [animation-delay:0.4s]`}
        ></span>
      </div>
    </div>
  )
}

LoadingDots.propTypes = {
  /**
   * Additional CSS classes.
   * @type {string}
   */
  className: PropTypes.string,
	/**
	 * Additional CSS classes for the dots.
	 * @type {string}
	 */
	dotsClassName: PropTypes.string,
}

export default LoadingDots
