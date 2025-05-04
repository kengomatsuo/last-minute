import { useState } from 'react'

const Theme = () => {
  // State for theme selection
  const [selectedTheme, setSelectedTheme] = useState('theme1')

  return (
    <div className='bg-white rounded-lg shadow p-6'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>Theme</h2>
      <p className='text-sm text-gray-600 mb-2'>
        Customize the color of your interface to your liking
      </p>

      <div className='flex items-center space-x-4'>
        {/* Theme 1 */}
        <div
          onClick={() => setSelectedTheme('theme1')}
          className={`w-12 h-12 rounded-full flex items-center justify-center bg-yellow-50 border-2
                    ${
                      selectedTheme === 'theme1'
                        ? 'border-gray-500'
                        : 'border-transparent'
                    } cursor-pointer transition-all duration-200`}
        >
          {selectedTheme === 'theme1' && (
            <span className='text-gray-500 text-lg'>✓</span>
          )}
        </div>

        {/* Theme 2 */}
        <div
          onClick={() => setSelectedTheme('theme2')}
          className={`w-12 h-12 rounded-full flex items-center justify-center bg-red-200 border-2
                    ${
                      selectedTheme === 'theme2'
                        ? 'border-gray-500'
                        : 'border-transparent'
                    } cursor-pointer transition-all duration-200`}
        >
          {selectedTheme === 'theme2' && (
            <span className='text-gray-500 text-lg'>✓</span>
          )}
        </div>

        {/* Theme 3 */}
        <div
          onClick={() => setSelectedTheme('theme3')}
          className={`w-12 h-12 rounded-full flex items-center justify-center bg-green-700 border-2
                    ${
                      selectedTheme === 'theme3'
                        ? 'border-white'
                        : 'border-transparent'
                    } cursor-pointer transition-all duration-200`}
        >
          {selectedTheme === 'theme3' && (
            <span className='text-white text-lg'>✓</span>
          )}
        </div>

        {/* Theme 4 */}
        <div
          onClick={() => setSelectedTheme('theme4')}
          className={`w-12 h-12 rounded-full flex items-center justify-center bg-blue-900 border-2
                    ${
                      selectedTheme === 'theme4'
                        ? 'border-white'
                        : 'border-transparent'
                    } cursor-pointer transition-all duration-200`}
        >
          {selectedTheme === 'theme4' && (
            <span className='text-white text-lg'>✓</span>
          )}
        </div>

        {/* Theme 5 */}
        <div
          onClick={() => setSelectedTheme('theme5')}
          className={`w-12 h-12 rounded-full flex items-center justify-center bg-gray-900 border-2
                    ${
                      selectedTheme === 'theme5'
                        ? 'border-white'
                        : 'border-transparent'
                    } cursor-pointer transition-all duration-200`}
        >
          {selectedTheme === 'theme5' && (
            <span className='text-white text-lg'>✓</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default Theme
