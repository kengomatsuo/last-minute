import { useState, createContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { convertRemToPixels } from '../utils/calculations'
import { useConsoleLog, useDebounce } from '../hooks'
import AlertDialog from '../components/AlertDialog'

/**
 * @typedef {Object} ScreenContextType
 * @property {boolean} isSmallScreen - Whether the screen width is below the small screen threshold.
 * @property {{ width: number; height: number }} dimensions - The current screen dimensions.
 * @property {boolean} isOnline - Whether the user is currently online.
 * @property {function} refreshIsSmallScreen - Function to refresh the isSmallScreen state.
 */

const smallScreenThreshold = 52

/** @type {ScreenContextType} */
const defaultContext = {
  isSmallScreen: window.innerWidth < convertRemToPixels(smallScreenThreshold),
  dimensions: { width: window.innerWidth, height: window.innerHeight },
  isOnline: navigator.onLine,
}

// Create context with default values
/** @type {import("react").Context<ScreenContextType>} */
const ScreenContext = createContext(defaultContext)

// Transition configuration for motion components

// Create a provider component
const ScreenContextProvider = ({ children }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(
    defaultContext.isSmallScreen
  )
  const [dimensions, setDimensions] = useState(defaultContext.dimensions)
  const debouncedSetDimensions = useDebounce(
    ({ width, height }) => setDimensions({ width, height }),
    300
  )
  const [isOnline, setIsOnline] = useState(defaultContext.isOnline)

  const MIN_WIDTH = convertRemToPixels(smallScreenThreshold)

  // Alert management
  const [alertQueue, setAlertQueue] = useState([])

  useConsoleLog('alertQueue', alertQueue)
  const addAlert = (
    props = {
      type: '',
      title: '',
      message: '',
      onOkay: () => {},
      onCancel: () => {},
      onClose: () => {},
    }
  ) => {
    const alert = {
      id: Date.now(),
      ...props,
    }
    setAlertQueue(prevQueue => [...prevQueue, alert])
    return alert.id
  }

  const removeAlert = id => {
    setAlertQueue(prevQueue => prevQueue.filter(alert => alert.id !== id))
  }

  const popAlertHead = () => {
    setAlertQueue(prevQueue => prevQueue.slice(1))
  }

  const clearAlerts = () => {
    setAlertQueue([])
  }

  // Theme state and persistence
  /**
   * @type {['default' | 'dark', function]}
   */
  const [selectedTheme, setSelectedTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'default'
    } catch {
      return 'default'
    }
  })

  useEffect(() => {
    try {
      if (selectedTheme === 'default') {
        document.documentElement.removeAttribute('data-theme')
      } else {
        document.documentElement.setAttribute('data-theme', selectedTheme)
      }
      localStorage.setItem('theme', selectedTheme)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to set theme:', err)
    }
  }, [selectedTheme])

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      debouncedSetDimensions({ width, height })
      setIsSmallScreen(width < MIN_WIDTH)
    }

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('resize', handleResize)
    window.addEventListener('online', handleOnline)
    navigator.connection?.addEventListener('change', () => {
      setIsOnline(navigator.onLine)
    })

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [MIN_WIDTH, debouncedSetDimensions])

  const refreshIsSmallScreen = () => {
    const width = window.innerWidth
    setIsSmallScreen(width < MIN_WIDTH)
  }

  return (
    <ScreenContext.Provider
      value={{
        isSmallScreen,
        refreshIsSmallScreen,
        dimensions,
        isOnline,

        addAlert,
        removeAlert,
        popAlertHead,
        clearAlerts,

        selectedTheme,
        setSelectedTheme,
      }}
    >
      {children}
      <AlertDialog {...alertQueue[0]} />
    </ScreenContext.Provider>
  )
}

ScreenContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { ScreenContextProvider, ScreenContext }
