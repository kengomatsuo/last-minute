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

const Settings = () => {
  // const { user, addTutor, addAdmin } = useContext(UserContext)
  const { addAlert } = useContext(ScreenContext)
  // const [textInput, setTextInput] = useState('')
  // useConsoleLog('textInput', textInput)

  // State for active tab
  const [activeTab, setActiveTab] = useState('editProfile')

  // State for user profile
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    profilePicture: null
  })

  // State for account management
  const [account, setAccount] = useState({
    password: '',
    birthDay: '01',
    birthMonth: '01',
    birthYear: '2000',
  })

  // State for theme selection
  const [selectedTheme, setSelectedTheme] = useState('theme1')
  
  return (
    <div
      style={{ paddingTop: NAVBAR_HEIGHT }}
      className='flex w-screen flex-col'
    >
      <div className='flex flex-1'>

        {/* Sidebar */}
        <div className='w-64 border-r border-gray-200 bg-white'>
          <div
            className={`p-4 cursor-pointer border-l-4 ${activeTab === 'editProfile' ? 'border-brown-500 bg-red-50' : 'border-transparent'}`}
            onClick={() => setActiveTab('editProfile')}
          >
            <span className='font-medium'>Edit Profile</span>
          </div>

          <div
            className={`p-4 cursor-pointer border-l-4 ${activeTab === 'accManagement' ? 'border-brown-500 bg-red-50' : 'border-transparent'}`}
            onClick={() => setActiveTab('accManagement')}
          >
            <span className='font-medium'>Account Management</span>
          </div>

          <div
            className={`p-4 cursor-pointer border-l-4 ${activeTab === 'themeSelect' ? 'border-brown-500 bg-red-50' : 'border-transparent'}`}
            onClick={() => setActiveTab('themeSelect')}
          >
            <span className='font-medium'>Theme</span>
          </div>
        </div>

        {/* Main content */}
        <div className='flex-1 p-6'>

          {/* Edit Profile Part */}
          {activeTab === 'editProfile' && (
            <div className='bg-white rounded-lg shadow p-6'>
              <h2 className='text-2xl font-bold text-gray-800 mb-6'>Edit Profile</h2>

              {/* Profile picture */}
              <div className='mb-6 flex flex-col items-center'>
                <div className='w-32 h-32 rounded-full bg-gray-200 overflow-hidden mb-2 relative'>
                  {profile.profilePicture ? (
                    <img
                    src={profile.profilePicture}
                    alt="Profile"
                    className='w-full h-full object-cover'
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      {/* TOLONG INI ERROR ZZZZZZ */}
                      {/* <img src={require('../assets/images/image-name.jpg')} alt="👤" /> */}
                      <span className="text-4xl text-gray-400">👤</span>
                    </div>
                  )}
                </div>

                <div className='inline-block px-4 py-2'>
                  <CustomButton>Change</CustomButton>
                </div>
              </div>

              {/* User Name*/}
              <div className='grid grid-cols-2 gap-6 mb-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>First Name</label>
                  <CustomInput>
                    name='firstName'
                    value={profile.firstName}
                    placeholder='First Name'
                  </CustomInput>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Last Name</label>
                  <CustomInput>
                    name='lastName'
                    value={profile.lastName}
                    placeholder='Last Name'
                  </CustomInput>
                </div>
              </div>

              {/* User Email and Phone No */}
              <div className='mb-6'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                <CustomInput>
                  name='email'
                  value={profile.email}
                  placeholder='Email'
                  type='email'
                </CustomInput>
              </div>

              <div className='mb-6'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Phone Number</label>
                <CustomInput>
                  name='phoneNumber'
                  value={profile.phoneNumber}
                  placeholder='Phone Number'
                  type='tel'
                </CustomInput>
              </div>
              
              {/* Reset-Save Button */}
              <div className='flex justify-end space-x-4'>
                <CustomButton>Reset</CustomButton>
                <CustomButton
                  onClick={() => addAlert({message: 'Profile has been updated'})}
                >
                  Save
                </CustomButton>
              </div>
            </div>
          )}


          {/* Account Management Part */}
          {activeTab === 'accManagement' && (
            <div className='bg-white rounded-lg shadow p-6'>
              <h2 className='text-2xl font-bold text-gray-800 mb-6'>Personal Information</h2>

              {/* Password */}
              <div className='mb-6'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
                <div className='flex items-center'>
                  <CustomInput>
                    name='password'
                    value={account.password}
                    placeholder='Enter Password'
                    type="password"
                    disabled
                  </CustomInput>

                  <CustomButton
                    className='ml-2'
                  >
                    Change
                  </CustomButton>
                </div>
              </div>

              {/* DOB */}
              <div className='mb-6'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Date of Birth</label>
                <div className='flex space-x-2'>
                  <CustomInput>
                    name='birthDate'
                    value={account.birthDay}
                    placeholder='DD'
                    type='date'
                    className='mb-2'
                  </CustomInput>

                  <CustomInput>
                    name='birthMonth'
                    value={account.birthMonth}
                    placeholder='MM'
                    type='date'
                    className='mb-2'
                  </CustomInput>

                  <CustomInput>
                    name='birthYear'
                    value={account.birthYear}
                    placeholder='YYYY'
                    type='date'
                    className='mb-2'
                  </CustomInput>
                </div>
              </div>

              {/* Deactivate & Delete Account */}
              <div className='mb-6'>
                <h3 className='text-lg font-bold text-gray-800 mb-4'>Deactivation & Deletion</h3>

                <div className='mb-4'>
                  <p className='tsxt-sm text-gray-600 mb-2'>Temporary disable your account</p>
                  <CustomButton
                    onClick={() => addAlert({message: 'Account has been deactivated'})}
                  >
                    Deactivate
                  </CustomButton>
                </div>

                <div>
                  <p className='text-sm text-gray-600 mb-2'>Permanently delete your account and all its data</p>
                  <CustomButton
                    onClick={() => addAlert({message: 'Account has been deleted'})}
                  >
                    Delete
                  </CustomButton>
                </div>
              </div>
            </div>
          )}

          {/* Theme Part */}
          {activeTab === 'themeSelect' && (
            <div className='bg-white rounded-lg shadow p-6'>
              <h2 className='text-2xl font-bold text-gray-800 mb-6'>Theme</h2>
              <p className='text-sm text-gray-600 mb-2'>Customize the color of your interface to your liking</p>

              <div className="flex items-center space-x-4">
                {/* Theme 1 */}
                <div
                  onClick={() => setSelectedTheme('theme1')}
                  className={`w-12 h-12 rounded-full flex items-center justify-center bg-yellow-50 border-2
                    ${selectedTheme === 'theme1' ? 'border-gray-500' : 'border-transparent'
                  } cursor-pointer transition-all duration-200`}
                >
                  {selectedTheme === 'theme1' && (
                    <span className="text-gray-500 text-lg">✓</span>
                  )}
                </div>

                {/* Theme 2 */}
                <div
                  onClick={() => setSelectedTheme('theme2')}
                  className={`w-12 h-12 rounded-full flex items-center justify-center bg-red-200 border-2
                    ${selectedTheme === 'theme2' ? 'border-gray-500' : 'border-transparent'
                  } cursor-pointer transition-all duration-200`}
                >
                  {selectedTheme === 'theme2' && (
                    <span className="text-gray-500 text-lg">✓</span>
                  )}
                </div>

                {/* Theme 3 */}
                <div
                  onClick={() => setSelectedTheme('theme3')}
                  className={`w-12 h-12 rounded-full flex items-center justify-center bg-green-700 border-2
                    ${selectedTheme === 'theme3' ? 'border-white' : 'border-transparent'
                  } cursor-pointer transition-all duration-200`}
                >
                  {selectedTheme === 'theme3' && (
                    <span className="text-white text-lg">✓</span>
                  )}
                </div>

                {/* Theme 4 */}
                <div
                  onClick={() => setSelectedTheme('theme4')}
                  className={`w-12 h-12 rounded-full flex items-center justify-center bg-blue-900 border-2
                    ${selectedTheme === 'theme4' ? 'border-white' : 'border-transparent'
                  } cursor-pointer transition-all duration-200`}
                >
                  {selectedTheme === 'theme4' && (
                    <span className="text-white text-lg">✓</span>
                  )}
                </div>

                {/* Theme 5 */}
                <div
                  onClick={() => setSelectedTheme('theme5')}
                  className={`w-12 h-12 rounded-full flex items-center justify-center bg-gray-900 border-2
                    ${selectedTheme === 'theme5' ? 'border-white' : 'border-transparent'
                  } cursor-pointer transition-all duration-200`}
                >
                  {selectedTheme === 'theme5' && (
                    <span className="text-white text-lg">✓</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings
