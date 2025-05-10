// Profile icon masi error
// Reset button leads to nothing
// Change button leads to nothing
// Re-check buttonnya SEMUA

import { useContext, useState } from 'react'
import { CustomButton, CustomInput } from '../components'
import { NAVBAR_HEIGHT } from '../constants/visualConstants'
// import { UserContext } from '../contexts/UserContext'
// import { useConsoleLog } from '../hooks'
import { ScreenContext } from '../contexts/ScreenContext'
import EditProfile from './Settings/EditProfile'
import AccountManagement from './Settings/AccountManagement'
import Theme from './settings/Theme'

/**
 * Settings screen component with tabbed navigation
 *
 * @returns {JSX.Element} The Settings screen component
 */
const Settings = () => {
  // const { user, addTutor, addAdmin } = useContext(UserContext)
  // const { addAlert } = useContext(ScreenContext)
  // const [textInput, setTextInput] = useState('')
  // useConsoleLog('textInput', textInput)

  // Define tabs array with id, name, and component
  const tabs = [
    {
      id: 'editProfile',
      name: 'Edit Profile',
      component: <EditProfile />,
    },
    {
      id: 'accManagement',
      name: 'Account Management',
      component: <AccountManagement />,
    },
    {
      id: 'themeSelect',
      name: 'Theme',
      component: <Theme />,
    },
  ]

  // State for active tab
  const [activeTab, setActiveTab] = useState(tabs[0])

  return (
    <div
      style={{ paddingTop: NAVBAR_HEIGHT }}
      className='flex w-screen h-full'
    >
      {/* Sidebar */}
      <div className='min-w-fit h-full mb-2 relative border-r-2 border-card-outline bg-card-background'>
        {tabs.map(tab => (
          <div
            key={tab.id}
            className={`p-4 cursor-pointer border-l-4 ${
              activeTab.id === tab.id
                ? 'border-card-outline bg-white'
                : 'border-transparent'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            <span className='font-medium'>{tab.name}</span>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className='p-6 flex-1 overflow-y-scroll'>{activeTab?.component}</div>
    </div>
  )
}

export default Settings
