import PropTypes from 'prop-types';

const CustomHyperlink = ({className = '', children, onClick = () => {}}) => {
  return (
    <div
      className={`px-3 py-1 w-full rounded-md hover:bg-background-secondary/25 truncate text-primary-text ${className
      } text-center font-medium text-lg cursor-pointer `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default CustomHyperlink;

CustomHyperlink.propTypes = {
  /**
   * Custom class name
   * @
   * @type {string}
   */
  className: PropTypes.string,
  /**
   * Click handler function
   * @type {Function}
   */
  onClick: PropTypes.func,
  /**
   * Button text
   * @type {string}
   */
  children: PropTypes.node,
};