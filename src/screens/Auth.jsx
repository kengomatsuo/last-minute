import { use, useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CustomButton, CustomInput, CustomInteractive } from '../components'
import { UserContext } from '../contexts/UserContext'
import { AnimatePresence, motion } from 'framer-motion'
import { ScreenContext } from '../contexts/ScreenContext'
import ArrowRightIcon from '../assets/icons/arrow-small-right.svg?react'
import EmailIcon from '../assets/icons/mailbox.svg?react'
import UserIcon from '../assets/icons/user.svg?react'
import PasswordIcon from '../assets/icons/lock.svg?react'
import Logo from '../assets/icons/logo.svg?react'
import SignInDecoration from '../assets/icons/signInDecoration.svg?react'
import { NAVBAR_HEIGHT } from '../constants/visualConstants'

const Auth = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { signIn, signUp } = use(UserContext)
  const { dimensions } = useContext(ScreenContext)
  const { width } = dimensions

  const inputClassName =
    'border-x-0 pl-0 gap-2 border-t-0 !border-b-2 rounded-none font-medium'

  const hasError = false
  const [hover, setHover] = useState(false)
  const [passwordSuccess, setPasswordSuccess] = useState(false)

  // location state is used to determine the action (signin or register)
  const [action, setAction] = useState(location.state?.action || 'signin')

  const [passwordRequirements, setPasswordRequirements] = useState([
    {complete: false, text: 'At least 8 characters'},
    {complete: false, text: 'At least 1 uppercase letter'},
    {complete: false, text: 'At least 1 lowercase letter'},
    {complete: false, text: 'At least 1 number'},
  ])

  const handleInputChange = password => {
    if (RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})').test(password)) {
      setPasswordSuccess(true)
    } else
      throw new Error(
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number'
      )
  }

  const handleSignin = async () => {
    await signIn({ email: 'admin@admin.com', password: 'admin123' }).then(
      () => {
        navigate('/')
      }
    )
  }

  const handleSignup = async () => {
    await signUp({ username: '', email: '', password: '' }).then(() => {
      navigate('/')
    })
  }

  return (
    <div
      className='flex flex-col flex-1 items-center justify-center'
      style={{ paddingTop: NAVBAR_HEIGHT }}
    >
      <AnimatePresence mode='wait'>
        <motion.div
          key={action}
          initial={{ opacity: 0, x: action === 'signin' ? -100 : 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: action === 'signin' ? 100 : -100 }}
          transition={{ duration: 0.5 }}
          style={{
            width: width * 0.85,
            height: width >= 1050 ? 750 : 'auto',
            background: 'white',
          }}
          className='flex flex-row rounded-[30px] max-w-[1200px] justify-between'
        >
          {action === 'register' ? (
            <>
              <div
                className={`${
                  width < 500 ? 'px-[2rem] py-[1rem]' : 'px-[6rem] py-[3rem]'
                } justify-between flex flex-col w-[40rem] flex-6`}
              >
                <div className='flex-1'>
                  <div
                    className={`flex items-center justify-between ${
                      hasError ? 'pb-[3rem]' : 'pb-[4rem]'
                    }`}
                  >
                    <Link to='/'>
                      <CustomInteractive className='!p-1 aspect-square items-center flex'>
                        <ArrowRightIcon
                          width={36}
                          height={36}
                          className='rotate-180'
                        />
                      </CustomInteractive>
                    </Link>
                    {/* {width >= 500 && ( */}
                    <p className='inline-flex items-center'>
                      {'Already a member?'}
                      <CustomInteractive
                        onClick={() => setAction('signin')}
                        className='font-semibold !p-1 ml-2 w-min !text-primary'
                      >
                        Sign In
                      </CustomInteractive>
                    </p>
                    {/* )} */}
                  </div>

                  <div className='flex justify-between items-center'>
                    <div>
                      <h1 className='pb-1'>Sign Up</h1>
                      <h3 className='text-gray-400'>
                        Secure your grades with{' '}
                        <b className='italic'>Last Minute</b>
                      </h3>
                    </div>
                  </div>

                  <div
                    className={`${
                      passwordSuccess ? 'mt-6' : 'mt-12'
                    } flex flex-col gap-5`}
                  >
                    <CustomInput
                      inputClassName={inputClassName}
                      image={<UserIcon width={24} height={24} />}
                      placeholder='Name'
                      required
                    />
                    <CustomInput
                      inputClassName={inputClassName}
                      image={<EmailIcon width={24} height={24} />}
                      placeholder='Email'
                      required
                    />
                    <CustomInput
                      inputClassName={inputClassName}
                      image={<PasswordIcon width={24} height={24} />}
                      placeholder='Password'
                      validateFunction={e => handleInputChange(e)}
                      type='password'
                      requirements={passwordRequirements}
                      required
                    />
                    {passwordSuccess && (
                      <CustomInput
                        inputClassName={inputClassName}
                        image={<PasswordIcon width={24} height={24} />}
                        placeholder='Re-Type Password'
                        type='password'
                        required
                      />
                    )}
                  </div>
                </div>

                <CustomButton
                  onClick={() => handleSignup()}
                  filled={true}
                  className='w-[14rem]'
                >
                  <div className='flex items-center gap-4'>
                    <p>Sign Up</p>
                    <div
                      className='p-2 rounded-full'
                      style={{
                        backgroundColor: hover
                          ? 'transparent'
                          : 'var(--color-primary-low-opacity)',
                      }}
                    >
                      <ArrowRightIcon
                        style={{
                          width: 24,
                          height: 24,
                        }}
                        fill='white'
                      />
                    </div>
                  </div>
                </CustomButton>
              </div>
              {width >= 1050 && (
                <div style={{ flex: 4 }}>
                  <SignInDecoration />
                </div>
              )}
            </>
          ) : (
            <>
              {width >= 1050 && (
                <div style={{ flex: 4 }}>
                  <SignInDecoration style={{ transform: 'scaleX(-1)' }} />
                </div>
              )}
              <div
                className={`flex-6 py-[4rem] ${
                  width < 500
                    ? 'px-[2rem]'
                    : width < 1200
                    ? 'px-[4rem]'
                    : 'px-[8rem]'
                }`}
              >
                <div
                  className={`flex items-center justify-between ${
                    hasError
                      ? 'pb-[3rem]'
                      : passwordSuccess
                      ? 'pb-[4rem]'
                      : 'pb-[5rem]'
                  }`}
                >
                  <Link to='/'>
                    <CustomInteractive className='!p-1 aspect-square items-center flex'>
                      <ArrowRightIcon
                        width={36}
                        height={36}
                        className='rotate-180'
                      />
                    </CustomInteractive>
                  </Link>
                  {width >= 700 && (
                    <p className='inline-flex items-center'>
                      {"Don't have an account?"}
                      <CustomInteractive
                        onClick={() => setAction('register')}
                        className='font-semibold !p-1 ml-2 w-min !text-primary'
                      >
                        Sign Up
                      </CustomInteractive>
                    </p>
                  )}
                </div>

                <div className='flex justify-between items-center'>
                  <div>
                    <h1 className='pb-1'>Sign In</h1>
                    <h3 className='text-gray-400'>
                      Secure your grades with{' '}
                      <b className='italic'>Last Minute</b>
                    </h3>
                  </div>
                  <Logo width={80} height={80} />
                </div>

                <div className={'mt-12 mb-24 flex flex-col gap-6'}>
                  <CustomInput
                    inputClassName={inputClassName}
                    image={<EmailIcon width={24} height={24} />}
                    placeholder='Email'
                    required
                  />
                  <CustomInput
                    inputClassName={inputClassName}
                    image={<PasswordIcon width={24} height={24} />}
                    placeholder='Password'
                    type='password'
                    required
                  />

                  {width < 700 && (
                    <p style={{ textAlign: width < 450 ? 'center' : '' }}>
                      {"Don't have an account?"}
                      <button
                        onClick={() => setAction('register')}
                        className='ml-2 font-semibold'
                        style={{ color: 'var(--color-primary)' }}
                      >
                        Sign Up
                      </button>
                    </p>
                  )}
                </div>

                <CustomButton
                  onClick={() => handleSignin()}
                  filled={true}
                  className='w-[14rem]'
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                >
                  <div className='flex items-center gap-4'>
                    <p>Sign In</p>
                    <div
                      className='p-2 rounded-full'
                      style={{
                        backgroundColor: hover
                          ? 'transparent'
                          : 'var(--color-primary-low-opacity)',
                      }}
                    >
                      <ArrowRightIcon
                        style={{
                          width: 24,
                          height: 24,
                        }}
                        fill='white'
                      />
                    </div>
                  </div>
                </CustomButton>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default Auth
