import { useState, createContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { convertRemToPixels } from '../utils/calculations'
import useDebounce from '../hooks/useDebounce'
import useConsoleLog from '../hooks/useConsoleLog'
// import { debounce } from 'lodash'

/**
 * @typedef {Object} ScreenContextType
 * @property {boolean} isSmallScreen - Whether the screen width is below the small screen threshold.
 * @property {{ width: number; height: number }} dimensions - The current screen dimensions.
 * @property {number} navBarHeight - The height of the navigation bar.
 * @property {(height: number) => void} setNavBarHeight - Function to update the navigation bar height.
 * @property {boolean} isOnline - Whether the user is currently online.
 */

const smallScreenThreshold = 52

/** @type {ScreenContextType} */
const defaultContext = {
  isSmallScreen: window.innerWidth < convertRemToPixels(smallScreenThreshold),
  dimensions: { width: window.innerWidth, height: window.innerHeight },
  navBarHeight: 0,
  setNavBarHeight: () => {},
  isOnline: navigator.onLine,
}

// Create context with default values
/** @type {import("react").Context<ScreenContextType>} */
const ScreenContext = createContext(defaultContext)

// Create a provider component
const ScreenContextProvider = ({ children }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(
    defaultContext.isSmallScreen
  )
  const [dimensions, setDimensions] = useState(defaultContext.dimensions)
  useConsoleLog('dimensions', dimensions)
  const debouncedSetDimensions = useDebounce(
    ({ width, height }) => setDimensions({ width, height }),
    300
  )
  const [navBarHeight, setNavBarHeight] = useState(defaultContext.navBarHeight)
  const [isOnline, setIsOnline] = useState(defaultContext.isOnline)

  const minWidth = convertRemToPixels(smallScreenThreshold)


  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      debouncedSetDimensions({ width, height })
      setIsSmallScreen(width < minWidth)
    }

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('resize', handleResize)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [minWidth, debouncedSetDimensions])

  return (
    <ScreenContext.Provider
      value={{
        isSmallScreen,
        dimensions,
        navBarHeight,
        setNavBarHeight,
        isOnline,
      }}
    >
      {children}
    </ScreenContext.Provider>
  )
}

ScreenContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { ScreenContextProvider, ScreenContext }
