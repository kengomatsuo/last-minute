import PropTypes from "prop-types";

/**
 * CustomButton component
 *
 * This component renders a button with two types: primary and secondary.
 *
 * - `primary`: Filled with the primary color (e.g., background brown, text white).
 * - `secondary`: Transparent with the primary text color (e.g., text brown).
 *
 * @param {Object} props - Component props
 * @param {boolean} props.filled - Whether the button is filled with the primary color
 * @param {Function} props.onClick - Click handler function
 * @param {string} props.text - Button text
 */
const CustomButton = ({ filled = false, onClick = () => {}, text = "" }) => {
  return (
    <div
      className={`px-2.5 py-1 ${
        filled
          ? "bg-primary text-secondary-text"
          : "bg-transparent text-primary"
      } border-primary border-2 text-center box-border rounded-md font-semibold text-lg cursor-pointer `}
      onClick={onClick}
    >
      <p style={{ margin: 0 }}>
        {text}
      </p>
    </div>
  );
};

CustomButton.propTypes = {
  /**
   * Button type
   * @type {'primary' | 'secondary'}
   */
  filled: PropTypes.bool,
  /**
   * Click handler function
   * @type {Function}
   */
  onClick: PropTypes.func,
  /**
   * Button text
   * @type {string}
   */
  text: PropTypes.string,
};

export default CustomButton;
