import { useContext } from 'react'
import { ScreenContext } from '../../contexts/ScreenContext'

/**
 * Theme switcher for the app.
 *
 * @returns {JSX.Element} The rendered theme switcher component
 */
const Theme = () => {
  const { selectedTheme, setSelectedTheme } = useContext(ScreenContext)
  const THEMES = [
    {
      key: 'default',
      label: 'Default',
      colorClass: 'bg-yellow-50',
      border: 'border-card-outline',
      checkColor: 'text-card-outline',
    },
    {
      key: 'dark',
      label: 'Dark',
      colorClass: 'bg-neutral-700',
      border: 'border-white',
      checkColor: 'text-white',
    },
  ]

  return (
    <div className='bg-card rounded-xl box-border border-2 border-card-outline shadow p-6 min-w-fit'>
      <p className='text-sm text-primary-text mb-2'>
        Customize the color of your interface to your liking
      </p>
      <div className='flex items-center space-x-4'>
        {THEMES.map((theme) => (
          <div
            key={theme.key}
            onClick={() => setSelectedTheme(theme.key)}
            className={`w-12 h-12 rounded-full flex items-center justify-center ${theme.colorClass} border-2 ${
              selectedTheme === theme.key ? theme.border : 'border-transparent'
            } cursor-pointer transition-all duration-200`}
          >
            {selectedTheme === theme.key && (
              <span className={`${theme.checkColor} text-lg`}>✓</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Theme
