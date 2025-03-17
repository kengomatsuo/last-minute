import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { ScreenContext } from "../contexts/ScreenContext";

const CustomInteractive = ({ className = "", children, onClick = () => {} }) => {
  const { isSmallScreen } = useContext(ScreenContext);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div
      className={`${className} px-3 py-1 w-full ${
        isSmallScreen ? "transition-all" : ""
      } rounded-md hover:bg-interactive-hover
        active:bg-interactive-active active:ring-background-secondary active:ring truncate text-primary-text text-center font-medium text-lg cursor-pointer `}
      onClick={onClick}
      onPointerDown={() => setIsPressed(true)}
      onPointerCancel={() => setIsPressed(false)}
      onPointerUp={() => setIsPressed(false)}
      onPointerLeave={() => setIsPressed(false)}
    >
      <div
        className={`transition-transform w-min ${
          isPressed ? "scale-[97%]" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default CustomInteractive;

CustomInteractive.propTypes = {
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
  children: PropTypes.node.isRequired,
};
