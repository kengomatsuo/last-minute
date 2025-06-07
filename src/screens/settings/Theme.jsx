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
    {
      key: 'blue',
      label: 'Blue',
      colorClass: 'bg-blue-400',
      border: 'border-blue-700',
      checkColor: 'text-blue-700',
    },
    {
      key: 'green',
      label: 'Green',
      colorClass: 'bg-green-300',
      border: 'border-green-700',
      checkColor: 'text-green-700',
    },
    {
      key: 'pink',
      label: 'Pink',
      colorClass: 'bg-pink-200',
      border: 'border-pink-600',
      checkColor: 'text-pink-600',
    },
    {
      key: 'purple',
      label: 'Purple',
      colorClass: 'bg-purple-300',
      border: 'border-purple-700',
      checkColor: 'text-purple-700',
    },
    {
      key: 'orange',
      label: 'Orange',
      colorClass: 'bg-orange-300',
      border: 'border-orange-700',
      checkColor: 'text-orange-700',
    },
  ]

  return (
    <div className='bg-card rounded-xl box-border border-2 border-card-outline shadow p-6 min-w-fit'>
      <p className='text-sm text-primary-text mb-2'>
        Customize the color of your interface to your liking
      </p>
      <div className='flex items-center space-x-4 flex-wrap'>
        {THEMES.map((theme) => (
          <div
            key={theme.key}
            onClick={() => setSelectedTheme(theme.key)}
            className={`w-12 h-12 rounded-full flex items-center justify-center ${theme.colorClass} border-2 ${
              selectedTheme === theme.key ? theme.border : 'border-transparent'
            } cursor-pointer transition-all duration-200 mb-2`}
          >
            {selectedTheme === theme.key && (
              <span className={`${theme.checkColor} text-lg`}>✓</span>
            )}
            <span className='sr-only'>{theme.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Theme
