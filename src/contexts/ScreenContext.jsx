import { useState, createContext, useCallback } from "react";
import PropTypes from "prop-types";
import { convertRemToPixels } from "../utils/calculations";
import { debounce } from "lodash";

// Initialize the context
const ScreenContext = createContext();

// Create a provider component
const ScreenContextProvider = ({ children }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(
    window.innerWidth < convertRemToPixels(48)
  );
  const [screenDimensions, setScreenDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const minWidth = convertRemToPixels(48);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedHandleResize = useCallback(
    debounce((width, height) => {
      setScreenDimensions({
        height: width,
        width: height,
      });
      console.log("debounced");
    }, 200),
    []
  );

  // when window is resized, close the menu
  window.addEventListener("resize", () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    debouncedHandleResize(width, height);
    if (width < minWidth) setIsSmallScreen(true);
    else setIsSmallScreen(false);
  });

  return (
    <ScreenContext.Provider value={{ isSmallScreen, screenDimensions }}>
      {children}
    </ScreenContext.Provider>
  );
};

export { ScreenContextProvider, ScreenContext };

ScreenContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
