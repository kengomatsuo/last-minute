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
const CustomButton = ({ filled = false, onClick = () => {}, className, children }) => {
  const { isSmallScreen } = useContext(ScreenContext);
  const [isPressed, setIsPressed] = useState(false);
  return (
    <div
      className={`${className} px-2.5 py-1 truncate  transition-all ${
        filled
          ? "bg-primary hover:bg-filled-button-hover active:bg-filled-button-active text-secondary-text"
          : "bg-transparent hover:bg-interactive-hover active:bg-interactive-active  text-primary"
      }  border-2 border-primary hover:border-filled-button-hover active:border-filled-button-active text-center box-border rounded-md font-semibold text-lg cursor-pointer `}
      onClick={onClick}
      onPointerDown={() => setIsPressed(true)}
      onPointerCancel={() => setIsPressed(false)}
      onPointerUp={() => setIsPressed(false)}
      onPointerLeave={() => setIsPressed(false)}
    >
      <div
        className={`${
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
  /**
   * Custom class name
   * @
   * @type {string}
   */
  className: PropTypes.string,
};

export default CustomButton;
