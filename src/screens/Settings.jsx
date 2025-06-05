// Profile icon masi error
// Reset button leads to nothing
// Change button leads to nothing
// Re-check buttonnya SEMUA

import { useState, useEffect } from 'react'
import { NAVBAR_HEIGHT } from '../constants/visualConstants'
// import { UserContext } from '../contexts/UserContext'
// import { useConsoleLog } from '../hooks'
import { ScreenContext } from '../contexts/ScreenContext'
import EditProfile from './Settings/EditProfile'
import AccountManagement from './Settings/AccountManagement'
import Theme from './settings/Theme'
import PaymentManagement from './settings/PaymentManagement'
import GeneralSettings from './settings/GeneralSettings'
import { useLocation, useNavigate } from 'react-router-dom'

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
      id: 'general',
      name: 'General Settings',
      component: <GeneralSettings />,
    },
    {
      id: 'profile',
      name: 'Edit Profile',
      component: <EditProfile />,
    },
    {
      id: 'account',
      name: 'Account Management',
      component: <AccountManagement />,
    },
    {
      id: 'payment',
      name: 'Payment Management',
      component: <PaymentManagement />,
    },
    // Remove the themes tab
    // {
    //   id: 'themes',
    //   name: 'Theme',
    //   component: <Theme />,
    // },
  ]

  const location = useLocation()
  const navigate = useNavigate()

  // State for active tab
  const [activeTab, setActiveTab] = useState(() => {
    const hash = window.location.hash.replace('#', '')
    const foundTab = tabs.find(
      tab => tab.id.toLowerCase() === hash.toLowerCase()
    )
    return foundTab || tabs[0]
  })

  // Sync tab with hash in URL using react-router
  useEffect(() => {
    const hash = location.hash.replace('#', '')
    if (hash) {
      const foundTab = tabs.find(
        tab => tab.id.toLowerCase() === hash.toLowerCase()
      )
      if (foundTab && foundTab.id !== activeTab.id) {
        setActiveTab(foundTab)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.hash, tabs])

  // Update hash when tab changes
  const handleTabClick = tab => {
    setActiveTab(tab)
    navigate(`#${tab.id}`, { replace: true })
  }

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
            onClick={() => handleTabClick(tab)}
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
