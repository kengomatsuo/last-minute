import { useCallback, useContext, useRef, useState } from 'react'
import { CustomButton, CustomInput } from '../../components'
import { UserContext } from '../../contexts/UserContext'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../../firebaseConfig'

const AccountManagement = () => {
  const navigate = useNavigate()
  const { deleteAccount, changePassword, sendResetPassword } =
    useContext(UserContext)
  // Remove unused addAlert and setAccount
  const [account] = useState({
    password: '',
    dob: '',
  })

  // Password change state and refs for validation
  const currentPasswordRef = useRef(null)
  const newPasswordRef = useRef(null)
  const confirmPasswordRef = useRef(null)
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  // Password requirements for validation (same as Auth.jsx)
  const passwordRequirements = [
    { complete: false, text: 'At least 8 characters', regEx: '.{8,}' },
    { complete: false, text: 'At least one uppercase letter', regEx: '(?=.*[A-Z])' },
    { complete: false, text: 'At least one lowercase letter', regEx: '(?=.*[a-z])' },
    { complete: false, text: 'At least one number', regEx: '(?=.*[0-9])' },
  ]
  const [passwordRequirementsFiltered, setPasswordRequirementsFiltered] = useState([])

  // Password validation function (same logic as Auth.jsx)
  const validatePassword = password => {
    let requirements = [...passwordRequirements]
    requirements.forEach(req => {
      req.complete = new RegExp(req.regEx).test(password)
    })
    setPasswordRequirementsFiltered(requirements)
    if (!requirements.every(req => req.complete)) {
      throw new Error('Password does not meet all requirements')
    }
  }

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

  // Password change handlers
  const handlePasswordChangeInput = e => {
    const { name, value } = e.target
    setPasswords(prev => ({ ...prev, [name]: value }))
  }
  const handleChangePassword = async e => {
    e.preventDefault()
    setIsChangingPassword(true)
    try {
      let isValid = true
      if (currentPasswordRef.current) {
        isValid = (await currentPasswordRef.current.validate()) && isValid
      }
      if (newPasswordRef.current) {
        isValid = (await newPasswordRef.current.validate()) && isValid
      }
      if (confirmPasswordRef.current) {
        isValid = (await confirmPasswordRef.current.validate()) && isValid
      }
      if (!isValid) {
        window.alert('Please check your password fields.')
        setIsChangingPassword(false)
        return
      }
      if (passwords.newPassword !== passwords.confirmPassword) {
        window.alert('New passwords do not match.')
        setIsChangingPassword(false)
        return
      }
      const result = await changePassword(
        passwords.currentPassword,
        passwords.newPassword
      )
      if (result === 'success') {
        setPasswords({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        })
      } else if (result === 'reauth-required') {
        await signOut(auth)
        navigate('/auth')
      }
    } finally {
      setIsChangingPassword(false)
    }
  }
  const handleResetPassword = async () => {
    await sendResetPassword()
  }

  return (
    <div className='p-4 bg-card-background rounded-xl box-border border-2 border-card-outline flex flex-col gap-6 min-w-fit'>
      <h2 className='text-2xl font-bold text-primary-text'>
        Personal Information
      </h2>

      {/* Password Change */}
      <div className='mb-6'>
        <h3 className='text-lg font-bold text-primary-text mb-2'>
          Change Password
        </h3>
        <form className='flex flex-col gap-5' onSubmit={handleChangePassword}>
          <CustomInput
            name='currentPassword'
            label='Current Password'
            type='password'
            value={passwords.currentPassword}
            onChange={handlePasswordChangeInput}
            ref={currentPasswordRef}
            required
            autoComplete='current-password'
            placeholder='Enter your current password'
          />
          <CustomInput
            name='newPassword'
            label='New Password'
            type='password'
            value={passwords.newPassword}
            onChange={handlePasswordChangeInput}
            ref={newPasswordRef}
            required
            autoComplete='new-password'
            placeholder='Enter a new password'
            validateFunction={validatePassword}
            requirements={passwordRequirementsFiltered}
          />
          <CustomInput
            name='confirmPassword'
            label='Confirm New Password'
            type='password'
            value={passwords.confirmPassword}
            onChange={handlePasswordChangeInput}
            ref={confirmPasswordRef}
            required
            autoComplete='new-password'
            placeholder='Re-enter new password'
            validateFunction={val => {
              if (val !== passwords.newPassword) {
                throw new Error('Passwords do not match')
              }
            }}
          />
          <div className='flex gap-2 justify-end'>
            <CustomButton
              type='button'
              onClick={handleResetPassword}
              disabled={isChangingPassword}
            >
              Reset Password
            </CustomButton>
            <CustomButton type='submit' filled loading={isChangingPassword}>
              Change Password
            </CustomButton>
          </div>
        </form>
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
          <CustomButton onClick={() => handleDeleteAccount()}>
            Delete
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default AccountManagement
