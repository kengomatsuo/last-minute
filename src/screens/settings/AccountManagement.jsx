import { useCallback, useContext, useState } from 'react'
import { CustomButton, CustomInput } from '../../components'
import { UserContext } from '../../contexts/UserContext'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../../firebaseConfig'

const AccountManagement = () => {
  const navigate = useNavigate()
  const { deleteAccount } = useContext(UserContext)
  // Remove unused addAlert and setAccount
  const [account] = useState({
    password: '',
    dob: '',
  })

  const handleSignOut = useCallback(async () => {
    try {
      await signOut(auth)
      console.log('Signed out successfully!')
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }, [navigate])

  /**
   * Handles account deletion for the current user.
   *
   * Attempts to delete the user from Firebase Auth. Handles errors,
   * provides UI feedback, and signs out/navigates on success.
   */
  const handleDeleteAccount = useCallback(async () => {
    const result = await deleteAccount()
    if (result === 'success') {
      navigate('/')
    } else if (result === 'reauth-required') {
      await signOut(auth)
      navigate('/auth')
    }
    // All alerts are handled in context
  }, [deleteAccount, navigate])

  return (
    <div className='p-4 bg-card-background rounded-xl box-border border-2 border-card-outline flex flex-col gap-6 min-w-fit'>
      <h2 className='text-2xl font-bold text-primary-text'>
        Personal Information
      </h2>

      {/* Password */}
      <div className=''>
        <div className='flex items-end'>
          <CustomInput
            name='password'
            label='Password'
            value={account.password}
            placeholder='Enter Password'
            type='password'
          />

          <CustomButton className='ml-2 bg-primary'>Change</CustomButton>
        </div>
      </div>

      {/* DOB */}
      {/* <div className=''>
        <div className='flex space-x-2'>
          <CustomInput
            label='Date of Birth'
            name='dob'
            value={account.dob}
            type='date'
            className='mb-2'
          />
        </div>
      </div> */}

      <h2 className='text-2xl font-bold text-primary-text'>
        Account Management
      </h2>

      {/* Sign Out */}
      <div className=''>
        <h3 className='text-lg font-bold text-primary-text mb-4'>Sign Out</h3>

        <div className='mb-4'>
          <p className='text-sm text-primary-text mb-2'>
            Sign out of your current account
          </p>
          <CustomButton onClick={() => handleSignOut()}>Sign Out</CustomButton>
        </div>
      </div>

      {/* Deactivate Account */}
      {/* <div className=''>
        <h3 className='text-lg font-bold text-primary-text mb-4'>
          Deactivate Account
        </h3>

        <div className=''>
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
      </div> */}

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
            onClick={() => handleDeleteAccount()}
          >
            Delete
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default AccountManagement
