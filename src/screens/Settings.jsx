// Profile icon masi error
// Reset button leads to nothing
// Change button leads to nothing
// Re-check buttonnya SEMUA

import { useState } from 'react'
import { NAVBAR_HEIGHT } from '../constants/visualConstants'
// import { UserContext } from '../contexts/UserContext'
// import { useConsoleLog } from '../hooks'
import { ScreenContext } from '../contexts/ScreenContext'
import EditProfile from './Settings/EditProfile'
import AccountManagement from './Settings/AccountManagement'
import Theme from './settings/Theme'
import PaymentManagement from './settings/PaymentManagement'

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
      id: 'paymentManagement',
      name: 'Payment Management',
      component: <PaymentManagement />,
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
    <div style={{ marginTop: NAVBAR_HEIGHT }} className='flex w-screen border-t border-card-outline/50'>
      {/* Sidebar */}
      <div className='min-w-fit h-full mb-2 relative border-r border-card-outline/50 bg-card-background'>
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
