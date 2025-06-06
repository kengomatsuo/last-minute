import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import Theme from './Theme'
import CustomInput from '../../components/CustomInput'

/**
 * General settings screen for configuring language, notifications, timezone, and theme.
 *
 * @returns {JSX.Element} The rendered general settings component
 */
const GeneralSettings = () => {
  const { t, i18n } = useTranslation()
  const [language, setLanguage] = useState(i18n.language || 'en')
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [timezone, setTimezone] = useState('UTC')

  const languageOptions = [
    { label: t('thisLanguage', { lng: 'en' }), value: 'en' },
    { label: t('thisLanguage', { lng: 'id' }), value: 'id' }
  ]

  const timezoneOptions = [
    { label: 'UTC', value: 'UTC' },
    { label: 'Asia/Jakarta', value: 'Asia/Jakarta' },
    { label: 'America/New_York', value: 'America/New_York' }
  ]

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language, i18n])

  const handleLanguageChange = e => {
    setLanguage(e.target.value)
  }

  const handleTimezoneChange = e => {
    setTimezone(e.target.value)
  }

  const handleNotificationToggle = () => {
    setNotificationsEnabled(v => !v)
  }

  return (
    <div className='space-y-6'>
      <div>
        <label className='block font-medium mb-1'>{t('label.language')}</label>
        <CustomInput
          name='language'
          type='suggest'
          selectOnFocus
          options={languageOptions}
          onChange={e => handleLanguageChange({ target: { value: e.target.value } })}
          onOptionSelect={val => setLanguage(val)}
          forceSuggestions={true}
          placeholder={t('placeholder.language')}
          value={language}
        />
      </div>
      <div>
        <label className='block font-medium mb-1'>{t('label.timezone')}</label>
        <CustomInput
          name='timezone'
          type='suggest'
          selectOnFocus
          options={timezoneOptions}
          onChange={e => handleTimezoneChange({ target: { value: e.target.value } })}
          onOptionSelect={val => setTimezone(val)}
          forceSuggestions={true}
          placeholder={t('placeholder.timezone')}
          value={timezone}
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
          {t('Enable notifications')}
        </label>
      </div>
      <div>
        <label className='block font-medium mb-1'>{t('label.theme')}</label>
        <Theme />
      </div>
      <div>
        <label className='block font-medium mb-1'>{t('label.appVersion')}</label>
        <div className='text-gray-500'>1.0.0</div>
      </div>
    </div>
  )
}

export default GeneralSettings
