import { useContext, useState } from 'react'
import { CustomButton, CustomInput } from '../../components'
import { ScreenContext } from '../../contexts/ScreenContext'

const EditProfile = () => {
  const { addAlert } = useContext(ScreenContext)

  // State for user profile
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    profilePicture: null,
  })
  return (
    <div className='bg-white rounded-lg shadow p-6'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>Edit Profile</h2>

      {/* Profile picture */}
      <div className='mb-6 flex flex-col items-center'>
        <div className='w-32 h-32 rounded-full bg-gray-200 overflow-hidden mb-2 relative'>
          {profile.profilePicture ? (
            <img
              src={profile.profilePicture}
              alt='Profile'
              className='w-full h-full object-cover'
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center'>
              {/* TOLONG INI ERROR ZZZZZZ */}
              {/* <img src={require('../assets/images/image-name.jpg')} alt="👤" /> */}
              <span className='text-4xl text-gray-400'>👤</span>
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
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            First Name
          </label>
          <CustomInput
            name='firstName'
            value={profile.firstName}
            placeholder='First Name'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Last Name
          </label>
          <CustomInput
            name='lastName'
            value={profile.lastName}
            placeholder='Last Name'
          />
        </div>
      </div>

      {/* User Email and Phone No */}
      <div className='mb-6'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Email
        </label>
        <CustomInput
          name='email'
          value={profile.email}
          placeholder='Email'
          type='email'
        />
      </div>

      <div className='mb-6'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Phone Number
        </label>
        <CustomInput
          name='phoneNumber'
          value={profile.phoneNumber}
          placeholder='Phone Number'
          type='tel'
        />
      </div>

      {/* Reset-Save Button */}
      <div className='flex justify-end space-x-4'>
        <CustomButton>Reset</CustomButton>
        <CustomButton
          onClick={() => addAlert({ message: 'Profile has been updated' })}
        >
          Save
        </CustomButton>
      </div>
    </div>
  )
}

export default EditProfile
