import { useState } from 'react'
import Theme from './Theme'
import CustomInput from '../../components/CustomInput'

/**
 * General settings screen for configuring language, notifications, timezone, and theme.
 *
 * @returns {JSX.Element} The rendered general settings component
 */
const GeneralSettings = () => {
  const [language, setLanguage] = useState('en')
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [timezone, setTimezone] = useState('UTC')

  const languageOptions = [
    { label: 'English', value: 'en' },
    { label: 'Bahasa Indonesia', value: 'id' }
  ]

  const timezoneOptions = [
    { label: 'UTC', value: 'UTC' },
    { label: 'Asia/Jakarta', value: 'Asia/Jakarta' },
    { label: 'America/New_York', value: 'America/New_York' }
  ]

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
        <CustomInput
          name='language'
          type='suggest'
          selectOnFocus
          options={languageOptions}
          onChange={e => handleLanguageChange({ target: { value: e.target.value } })}
          onOptionSelect={val => setLanguage(val)}
          forceSuggestions={true}
          placeholder='Select language'
        />
      </div>
      <div>
        <label className='block font-medium mb-1'>Timezone</label>
        <CustomInput
          name='timezone'
          type='suggest'
          selectOnFocus
          options={timezoneOptions}
          onChange={e => handleTimezoneChange({ target: { value: e.target.value } })}
          onOptionSelect={val => setTimezone(val)}
          forceSuggestions={true}
          placeholder='Select timezone'
        />
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
