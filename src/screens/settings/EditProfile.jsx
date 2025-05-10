import { useContext, useState } from 'react'
import { CustomButton, CustomInput } from '../../components'
import { ScreenContext } from '../../contexts/ScreenContext'
import placeholder from '../../assets/placeholders/image.png'

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
    <div className='bg-card-background rounded-xl box-border border-2 border-card-outline shadow p-6 flex flex-col gap-6 min-w-fit'>
      <h2 className='text-2xl font-bold text-primary-text mb-6'>Edit Profile</h2>

      {/* Profile picture */}
      <div className='flex flex-col items-center'>
        <div className='w-32 h-32 rounded-full bg-white overflow-hidden mb-2 relative'>
          {profile.profilePicture ? (
            <img
              src={profile.profilePicture}
              alt='Profile'
              className='w-full h-full object-cover'
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center'>
              {/*TODO: TOLONG INI ERROR ZZZZZZ */}
              <img src={placeholder} alt="👤" />
              {/* <span className='text-4xl text-primary-text'>👤</span> */}
            </div>
          )}
        </div>

        <div className='inline-block px-4 py-2'>
          <CustomButton>Change</CustomButton>
        </div>
      </div>

      {/* User Name*/}
      <div className='flex gap-3 flex-row'>
          <CustomInput
            name='firstName'
            label='First Name'
            value={profile.firstName}
            placeholder='First Name'
            className='flex-1'
          />
          <CustomInput
            name='lastName'
            label='Last Name'
            value={profile.lastName}
            placeholder='Last Name'
            className='flex-1'
          />
      </div>

      {/* User Email and Phone No */}
      <div className=''>
        <CustomInput
          name='email'
          label='Email'
          value={profile.email}
          placeholder='Email'
          type='email'
        />
      </div>

      <div className=''>
        <CustomInput
          name='phoneNumber'
          label='Phone Number'
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
