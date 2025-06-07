import { useContext, useState, useRef, useEffect } from 'react'
import { CustomButton, CustomInput } from '../../components'
import { ScreenContext } from '../../contexts/ScreenContext'
import { UserContext } from '../../contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../../firebaseConfig'
import placeholder from '../../assets/placeholders/image.png'

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

/**
 * EditProfile component for editing user profile information.
 *
 * @returns {JSX.Element} The rendered EditProfile component
 */
const EditProfile = () => {
  const { addAlert } = useContext(ScreenContext)
  const { user, updateUserProfile, isAuthLoading, changePassword, sendResetPassword } = useContext(UserContext)
  const navigate = useNavigate()

  // Form refs for validation
  const firstNameRef = useRef(null)
  const lastNameRef = useRef(null)
  const emailRef = useRef(null)
  const phoneNumberRef = useRef(null)

  // State for user profile
  const [profile, setProfile] = useState({
    firstName: user?.displayName?.split(' ')[0] || '',
    lastName: user?.displayName?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    profilePicture: user?.photoURL || null,
    profilePictureFile: null, // Ensure this is always present in state
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Password change state
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  useEffect(() => {
    setProfile({
      firstName: user?.displayName?.split(' ')[0] || '',
      lastName: user?.displayName?.split(' ').slice(1).join(' ') || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || '',
      profilePicture: user?.photoURL || null,
      profilePictureFile: null, // Reset file on user change
    })
  }, [user])

  /**
   * Handles input changes for the profile form.
   *
   * @param {Object} e - The input change event
   */
  const handleChange = e => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  /**
   * Handles form submission for updating the user profile.
   *
   * @param {Event} e - The form submit event
   * @returns {Promise<void>}
   */
  const handleSubmit = async e => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      let isValid = true
      if (firstNameRef.current) {
        isValid = (await firstNameRef.current.validate()) && isValid
      }
      if (lastNameRef.current) {
        isValid = (await lastNameRef.current.validate()) && isValid
      }
      if (emailRef.current) {
        isValid = (await emailRef.current.validate()) && isValid
      }
      if (phoneNumberRef.current) {
        isValid = (await phoneNumberRef.current.validate()) && isValid
      }
      if (!isValid) {
        addAlert({
          type: 'error',
          title: 'Invalid Input',
          message: 'Please check your input fields.',
        })
        setIsSubmitting(false)
        return
      }
      const displayName = `${profile.firstName} ${profile.lastName}`.trim()

      await updateUserProfile({
        displayName,
        email: profile.email,
        phoneNumber: profile.phoneNumber,
        profilePictureFile: profile.profilePictureFile,
      })
      addAlert({
        type: 'success',
        title: 'Profile Updated',
        message: 'Your profile has been updated.',
      })
    } catch (error) {
      addAlert({
        type: 'error',
        title: 'Update Failed',
        message: error.message || 'Failed to update profile.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  /**
   * Resets the form to the user's current profile values.
   */
  const handleReset = () => {
    setProfile({
      firstName: user?.displayName?.split(' ')[0] || '',
      lastName: user?.displayName?.split(' ').slice(1).join(' ') || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || '',
      profilePicture: user?.photoURL || null,
      profilePictureFile: null, // Reset file on user change
    })
  }

  // Handle file input change with validation and compression
  const handleProfilePictureChange = e => {
    const file = e.target.files[0]
    if (file) {
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        addAlert({
          type: 'error',
          title: 'Invalid File',
          message: 'Only JPG, PNG, or WEBP images are allowed.',
        })
        return
      }
      // Compress to 150x150 before upload
      const reader = new window.FileReader()
      reader.onload = ev => {
        const img = new window.Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          canvas.width = 150
          canvas.height = 150
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, 150, 150)
          canvas.toBlob(blob => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: file.type,
              })
              // Use functional update to avoid race condition
              setProfile(prev => {
                // Always keep previous fields, but update both preview and file
                return {
                  ...prev,
                  profilePicture: URL.createObjectURL(blob),
                  profilePictureFile: compressedFile,
                }
              })
            }
          }, file.type)
        }
        img.src = ev.target.result
      }
      reader.readAsDataURL(file)
      // Set the file immediately in case the user submits before compression finishes
      setProfile(prev => ({ ...prev, profilePictureFile: file }))
    }
  }

  // Password change handlers
  const handlePasswordChangeInput = e => {
    const { name, value } = e.target
    setPasswords(prev => ({ ...prev, [name]: value }))
  }
  const handleChangePassword = async e => {
    e.preventDefault()
    setIsChangingPassword(true)
    try {
      if (!passwords.currentPassword || !passwords.newPassword) {
        addAlert({
          type: 'error',
          title: 'Missing Fields',
          message: 'Please fill in all password fields.',
        })
        setIsChangingPassword(false)
        return
      }
      if (passwords.newPassword !== passwords.confirmPassword) {
        addAlert({
          type: 'error',
          title: 'Password Mismatch',
          message: 'New passwords do not match.',
        })
        setIsChangingPassword(false)
        return
      }
      const result = await changePassword(
        passwords.currentPassword,
        passwords.newPassword
      )
      if (result === 'success') {
        setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' })
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
    <form
      className='bg-card-background rounded-xl box-border border-2 border-card-outline shadow p-6 flex flex-col gap-6 min-w-fit'
      onSubmit={handleSubmit}
    >
      <h2 className='text-2xl font-bold text-primary-text mb-6'>
        Edit Profile
      </h2>

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
              <img src={placeholder} alt='👤' />
            </div>
          )}
        </div>
        <div className='inline-block px-4 py-2'>
          <input
            id='profilePicture'
            type='file'
            accept='image/jpeg,image/png,image/webp'
            style={{ display: 'none' }}
            onChange={handleProfilePictureChange}
          />
          <CustomButton
            type='button'
            onClick={() => document.getElementById('profilePicture').click()}
            disabled={isSubmitting || isAuthLoading}
          >
            Change
          </CustomButton>
        </div>
      </div>

      {/* User Name*/}
      <div className='flex gap-3 flex-row'>
        <CustomInput
          name='firstName'
          label='First Name'
          value={profile.firstName}
          placeholder='First Name'
          type='text'
          className='flex-1'
          onChange={handleChange}
          ref={firstNameRef}
          required
          autoComplete='given-name'
        />
        <CustomInput
          name='lastName'
          label='Last Name'
          value={profile.lastName}
          placeholder='Last Name'
          type='text'
          className='flex-1'
          onChange={handleChange}
          ref={lastNameRef}
          required
          autoComplete='family-name'
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
          onChange={handleChange}
          ref={emailRef}
          required
          autoComplete='email'
        />
      </div>

      {/* <div className=''>
        <CustomInput
          name='phoneNumber'
          label='Phone Number'
          value={profile.phoneNumber}
          placeholder='Phone Number'
          type='tel'
          onChange={handleChange}
          ref={phoneNumberRef}
          required={false}
          autoComplete='tel'
        />
      </div> */}

      {/* Password Change */}
      <div className='mb-6'>
        <h3 className='text-lg font-bold text-primary-text mb-2'>Change Password</h3>
        <form className='flex flex-col gap-3' onSubmit={handleChangePassword}>
          <CustomInput
            name='currentPassword'
            label='Current Password'
            type='password'
            value={passwords.currentPassword}
            onChange={handlePasswordChangeInput}
            required
            autoComplete='current-password'
          />
          <CustomInput
            name='newPassword'
            label='New Password'
            type='password'
            value={passwords.newPassword}
            onChange={handlePasswordChangeInput}
            required
            autoComplete='new-password'
          />
          <CustomInput
            name='confirmPassword'
            label='Confirm New Password'
            type='password'
            value={passwords.confirmPassword}
            onChange={handlePasswordChangeInput}
            required
            autoComplete='new-password'
          />
          <div className='flex gap-2 justify-end'>
            <CustomButton
              type='button'
              onClick={handleResetPassword}
              disabled={isChangingPassword || isAuthLoading}
            >
              Reset Password
            </CustomButton>
            <CustomButton
              type='submit'
              filled
              loading={isChangingPassword || isAuthLoading}
            >
              Change Password
            </CustomButton>
          </div>
        </form>
      </div>

      {/* Reset-Save Button */}
      <div className='flex justify-end space-x-4'>
        <CustomButton
          type='button'
          onClick={handleReset}
          disabled={isSubmitting || isAuthLoading}
        >
          Reset
        </CustomButton>
        <CustomButton
          type='submit'
          filled
          loading={isSubmitting || isAuthLoading}
        >
          Save
        </CustomButton>
      </div>
    </form>
  )
}

export default EditProfile
