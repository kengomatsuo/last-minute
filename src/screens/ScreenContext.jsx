import { createContext, useState, useEffect } from 'react'

/**
 * Screen context for global UI state.
 *
 * @typedef {Object} ScreenContextValue
 * @property {'default' | 'dark'} selectedTheme - The current theme
 * @property {function} setSelectedTheme - Setter for theme
 */

/**
 * @type {import('react').Context<ScreenContextValue>}
 */
export const ScreenContext = createContext({
  selectedTheme: 'default',
  setSelectedTheme: () => {}
})

/**
 * Provides screen-wide UI state, including theme.
 *
 * @param {Object} props - Provider props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} The context provider
 */
export const ScreenProvider = ({ children }) => {
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

  return (
    <ScreenContext.Provider value={{ selectedTheme, setSelectedTheme }}>
      {children}
    </ScreenContext.Provider>
  )
}
