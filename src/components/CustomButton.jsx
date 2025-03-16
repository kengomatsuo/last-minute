import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { ScreenContext } from "../contexts/ScreenContext";

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
const CustomButton = ({ filled = false, onClick = () => {}, children }) => {
  const { isSmallScreen } = useContext(ScreenContext);
  const [isPressed, setIsPressed] = useState(false);
  return (
    <div
      className={`px-2.5 w-full py-1 truncate ${
        filled
          ? "bg-primary text-secondary-text"
          : "bg-transparent text-primary"
      }  border-primary border-2 text-center box-border rounded-md font-semibold text-lg cursor-pointer `}
      onClick={onClick}
      onPointerDown={() => setIsPressed(true)}
      onPointerCancel={() => setIsPressed(false)}
      onPointerUp={() => setIsPressed(false)}
    >
      <div
        className={`duration-150 ${
          isSmallScreen ? "transition-all" : "transition-transform"
        } ${isPressed ? "scale-[97%] opacity-75" : ""}`}
      >
        {children}
      </div>
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
  children: PropTypes.node.isRequired,
};

export default CustomButton;
