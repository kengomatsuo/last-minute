import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { ScreenContext } from "../contexts/ScreenContext";

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
 * @param {string} props.className - Custom class name for additional styling
 * @param {React.ReactNode} props.children - Button content, typically text or an icon
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
};

export default CustomButton;
