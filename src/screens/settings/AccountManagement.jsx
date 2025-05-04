import { useContext, useState } from 'react'
import { CustomButton, CustomInput } from '../../components'
import { ScreenContext } from '../../contexts/ScreenContext'

const AccountManagement = () => {
  const { addAlert } = useContext(ScreenContext)
  // State for account management
  const [account, setAccount] = useState({
    password: '',
    birthDay: '01',
    birthMonth: '01',
    birthYear: '2000',
  })

  return (
    <div className='bg-white rounded-lg shadow p-6'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>
        Personal Information
      </h2>

      {/* Password */}
      <div className='mb-6'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
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

          <CustomButton className='ml-2'>Change</CustomButton>
        </div>
      </div>

      {/* DOB */}
      <div className='mb-6'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Date of Birth
        </label>
        <div className='flex space-x-2'>
          <CustomInput
            name='birthDate'
            value={account.birthDay}
            placeholder='DD'
            type='date'
            className='mb-2'
          />

          <CustomInput
            name='birthMonth'
            value={account.birthMonth}
            placeholder='MM'
            type='date'
            className='mb-2'
          />

          <CustomInput
            name='birthYear'
            value={account.birthYear}
            placeholder='YYYY'
            type='date'
            className='mb-2'
          />
        </div>
      </div>

      {/* Deactivate & Delete Account */}
      <div className='mb-6'>
        <h3 className='text-lg font-bold text-gray-800 mb-4'>
          Deactivation & Deletion
        </h3>

        <div className='mb-4'>
          <p className='tsxt-sm text-gray-600 mb-2'>
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

        <div>
          <p className='text-sm text-gray-600 mb-2'>
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
