import { useState } from 'react'
import Theme from './Theme'

/**
 * General settings screen for configuring language, notifications, timezone, and theme.
 *
 * @returns {JSX.Element} The rendered general settings component
 */
const GeneralSettings = () => {
  const [language, setLanguage] = useState('en')
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [timezone, setTimezone] = useState('UTC')

  const handleLanguageChange = e => {
    setLanguage(e.target.value)
    // TODO: persist language preference
  }

  const handleTimezoneChange = e => {
    setTimezone(e.target.value)
    // TODO: persist timezone preference
  }

  const handleNotificationToggle = () => {
    setNotificationsEnabled(v => !v)
    // TODO: persist notification preference
  }

  return (
    <div className='space-y-6'>
      <div>
        <label className='block font-medium mb-1'>Language</label>
        <select
          value={language}
          onChange={handleLanguageChange}
          className='border rounded p-2 w-full'
        >
          <option value='en'>English</option>
          <option value='id'>Bahasa Indonesia</option>
        </select>
      </div>
      <div>
        <label className='block font-medium mb-1'>Timezone</label>
        <select
          value={timezone}
          onChange={handleTimezoneChange}
          className='border rounded p-2 w-full'
        >
          <option value='UTC'>UTC</option>
          <option value='Asia/Jakarta'>Asia/Jakarta</option>
          <option value='America/New_York'>America/New_York</option>
        </select>
      </div>
      <div className='flex items-center'>
        <input
          id='notifications'
          type='checkbox'
          checked={notificationsEnabled}
          onChange={handleNotificationToggle}
          className='mr-2'
        />
        <label htmlFor='notifications' className='font-medium'>
          Enable notifications
        </label>
      </div>
      <div>
        <label className='block font-medium mb-1'>Theme</label>
        <Theme />
      </div>
      <div>
        <label className='block font-medium mb-1'>App Version</label>
        <div className='text-gray-500'>1.0.0</div>
      </div>
    </div>
  )
}

export default GeneralSettings
