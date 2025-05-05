import { useContext, useState } from 'react'
import { CustomButton, CustomInput } from '../../components'
import { ScreenContext } from '../../contexts/ScreenContext'

const AccountManagement = () => {
  const { addAlert } = useContext(ScreenContext)
  // State for account management
  const [account, setAccount] = useState({
    password: '',
    dob: '',
  })
  
  return (
    <div className='p-4 bg-card-background rounded-xl box-border border-2 border-card-outline'>
      <h2 className='text-2xl font-bold text-primary-text mb-6'>
        Personal Information
      </h2>

      {/* Password */}
      <div className='mb-6'>
        <label className='block text-sm font-medium text-primary-text mb-1'>
          Password
        </label>
        <div className='flex items-center'>
          <CustomInput
            name='password'
            value={account.password}
            placeholder='Enter Password'
            type='password'
            disabled
          />

          <CustomButton className='ml-2 bg-primary'>Change</CustomButton>
        </div>
      </div>

      {/* DOB */}
      <div className='mb-6'>
        <label className='block text-sm font-medium text-primary-text mb-1'>
          Date of Birth
        </label>
        <div className='flex space-x-2'>
          <CustomInput
            name='dob'
            value={account.dob}
            type='date'
            className='mb-2'
          />
        </div>
      </div>


      <h2 className='text-2xl font-bold text-primary-text mb-6'>
        Account Management
      </h2>

      {/* Sign Out */}
      <div className='mb-6'>
        <h3 className='text-lg font-bold text-primary-text mb-4'>
          Sign Out
        </h3>

        <div className='mb-4'>
          <p className='text-sm text-primary-text mb-2'>
            Sign out of your current account
          </p>
          <CustomButton
            onClick={() =>handleSignOut() }>
            Sign Out
          </CustomButton>
        </div>
      </div>

      {/* Deactivate Account */}
      <div className='mb-6'>
        <h3 className='text-lg font-bold text-primary-text mb-4'>
          Deactivate Account
        </h3>

        <div className='mb-4'>
          <p className='text-sm text-primary-text mb-2'>
            Temporary disable your account
          </p>
          <CustomButton
            onClick={() =>
              addAlert({ message: 'Account has been deactivated' })
            }
          >
            Deactivate
          </CustomButton>
        </div>
      </div>
      
      {/* Delete Account */}
      <div>
        <h3 className='text-lg font-bold text-primary-text mb-4'>
          Delete Account
        </h3>

        <div>
          <p className='text-sm text-primary-text mb-2'>
            Permanently delete your account and all its data
          </p>
          <CustomButton
            onClick={() => addAlert({ message: 'Account has been deleted' })}
          >
            Delete
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default AccountManagement
