import PropTypes from "prop-types";
import { useContext, useState } from "react"
import { ScreenContext } from "../contexts/ScreenContext"

const CustomHyperlink = ({ className = "", children, onClick = () => {} }) => {
  const { isSmallScreen } = useContext(ScreenContext);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div
      className={`${className} px-3 py-1 w-full ${isSmallScreen ? 'transition-colors duration-150' : ''} rounded-md hover:bg-background-secondary/20 
        active:bg-background-secondary/25 truncate text-primary-text text-center font-medium text-lg cursor-pointer `}
      onClick={onClick}
      onPointerDown={() => setIsPressed(true)}
      onPointerCancel={() => setIsPressed(false)}
      onPointerUp={() => setIsPressed(false)}
    >
      <div className={`transition-transform w-min duration-300 ${isPressed ? 'scale-[97%]' : ''}`}>
      {children}
      </div>
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
  children: PropTypes.node.isRequired,
};
