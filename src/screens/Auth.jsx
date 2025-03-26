import { useContext, useRef, useState } from 'react'
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
  const { signIn, signUp } = useContext(UserContext)
  const { dimensions } = useContext(ScreenContext)
  const hasError = false
  const [hover, setHover] = useState(false)
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [action, setAction] = useState(location.state?.action || 'signin')
  const passwordRequirements = [
    { complete: false, text: 'At least 8 characters', regEx: '.{8,}' },
    {
      complete: false,
      text: 'At least 1 uppercase letter',
      regEx: '(?=.*[A-Z])',
    },
    {
      complete: false,
      text: 'At least 1 lowercase letter',
      regEx: '(?=.*[a-z])',
    },
    { complete: false, text: 'At least 1 number', regEx: '(?=.*[0-9])' },
  ]
  const [passwordRequirementsFiltered, setPasswordRequirementsFiltered] =
    useState([
      { complete: false, text: 'At least 8 characters', regEx: '.{8,}' },
      {
        complete: false,
        text: 'At least 1 uppercase letter',
        regEx: '(?=.*[A-Z])',
      },
      {
        complete: false,
        text: 'At least 1 lowercase letter',
        regEx: '(?=.*[a-z])',
      },
      { complete: false, text: 'At least 1 number', regEx: '(?=.*[0-9])' },
    ])

  const formRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const nameRef = useRef(null)
  const retypePasswordRef = useRef(null)

  const inputClassName =
    'border-x-0 pl-0 gap-2 border-t-0 !border-b-2 rounded-none font-medium'
  const { width } = dimensions

  const validatePassword = password => {
    let requirements = [...passwordRequirements]
    requirements.forEach(req => {
      req.complete = new RegExp(req.regEx).test(password)
    })
    setPasswordRequirementsFiltered(requirements)
    if (requirements.every(req => req.complete)) {
      setPasswordSuccess(true)
      setPasswordRequirementsFiltered([])
    } else {
      setPasswordSuccess(false)
      throw new Error('Invalid password')
    }
  }

  const validateRetypePassword = passwordRetyped => {
    const formData = new FormData(formRef.current)
    const password = formData.get('password')

    if (passwordRetyped !== password) {
      throw new Error('Passwords do not match')
    }
  }

  const validateEmail = email => {
    const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    if (!emailRegEx.test(email)) {
      throw new Error('Invalid email')
    }
  }

  const handleSignin = async e => {
    e.preventDefault()

    try {
      let isValid = true
      isValid =
        emailRef.current && (await emailRef.current.validate()) && isValid
      isValid =
        passwordRef.current && (await passwordRef.current.validate()) && isValid

      if (!isValid) {
        console.error('Invalid form')
        return
      }

      const formData = new FormData(formRef.current)
      const data = Object.fromEntries(formData.entries())

      await signIn(data).then(() => {
        navigate('/')
      })
    } catch (error) {
      console.error('Error signing in:', error.message)
    }
  }

  const handleSignup = async e => {
    e.preventDefault()

    try {
      let isValid = true
      isValid = nameRef.current && (await nameRef.current.validate()) && isValid
      isValid =
        emailRef.current && (await emailRef.current.validate()) && isValid
      isValid =
        passwordRef.current && (await passwordRef.current.validate()) && isValid
      isValid =
        retypePasswordRef.current &&
        (await retypePasswordRef.current.validate()) &&
        isValid

      if (!isValid) {
        console.error('Invalid form')
        return
      }

      const formData = new FormData(formRef.current)
      const data = Object.fromEntries(formData.entries())

      console.log('Submitting:', data)

      await signUp(data).then(() => {
        navigate('/')
      })
    } catch (error) {
      console.error('Error signing up:', error.message)
    }
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
          className='flex flex-row rounded-[30px] max-w-[1200px] max-h-[95%] overflow-hidden justify-between'
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
                    <div className='inline-flex items-center'>
                      {'Already a member?'}
                      <CustomInteractive
                        onClick={() => setAction('signin')}
                        className='font-semibold !p-1 ml-2 w-min !text-primary'
                      >
                        Sign In
                      </CustomInteractive>
                    </div>
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

                  <form
                    ref={formRef}
                    onSubmit={e => handleSignup(e)}
                    className={`${
                      passwordSuccess ? 'mt-6' : 'mt-12'
                    } flex flex-col gap-5`}
                  >
                    <CustomInput
                      name='displayName'
                      inputClassName={inputClassName}
                      image={<UserIcon width={24} height={24} />}
                      placeholder='Name'
                      required
                      ref={nameRef}
                    />
                    <CustomInput
                      name='email'
                      inputClassName={inputClassName}
                      image={<EmailIcon width={24} height={24} />}
                      placeholder='Email'
                      validateFunction={e => validateEmail(e)}
                      required
                      ref={emailRef}
                    />
                    <CustomInput
                      name='password'
                      inputClassName={inputClassName}
                      image={<PasswordIcon width={24} height={24} />}
                      placeholder='Password'
                      validateFunction={e => validatePassword(e)}
                      type='password'
                      requirements={passwordRequirementsFiltered}
                      required
                      ref={passwordRef}
                    />
                    {passwordSuccess && (
                      <CustomInput
                        name='retypePassword'
                        inputClassName={inputClassName}
                        image={<PasswordIcon width={24} height={24} />}
                        placeholder='Re-Type Password'
                        validateFunction={e => validateRetypePassword(e)}
                        type='password'
                        required
                        ref={retypePasswordRef}
                      />
                    )}
                    <CustomButton
                      type='submit'
                      filled={true}
                      className='w-[14rem] mt-4'
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
                  </form>
                </div>
              </div>
              {width >= 1050 && (
                <div className='flex-4'>
                  <SignInDecoration />
                </div>
              )}
            </>
          ) : (
            <>
              {width >= 1050 && (
                <div className='flex-4'>
                  <SignInDecoration style={{ transform: 'scaleX(-1)' }} />
                </div>
              )}
              <div
                className={`w-full flex flex-col py-[4rem] ${
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
                    <div className='inline-flex items-center'>
                      Don&apos;t have an account?
                      <CustomInteractive
                        onClick={() => setAction('register')}
                        className='font-semibold !p-1 ml-2 w-min !text-primary'
                      >
                        Sign Up
                      </CustomInteractive>
                    </div>
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

                <form
                  ref={formRef}
                  onSubmit={e => handleSignin(e)}
                  className={'mt-12 flex flex-col gap-6'}
                >
                  <CustomInput
                    name='email'
                    inputClassName={inputClassName}
                    image={<EmailIcon width={24} height={24} />}
                    placeholder='Email'
                    validateFunction={e => validateEmail(e)}
                    required
                    ref={emailRef}
                  />
                  <CustomInput
                    name='password'
                    inputClassName={inputClassName}
                    image={<PasswordIcon width={24} height={24} />}
                    placeholder='Password'
                    type='password'
                    required
                    ref={passwordRef}
                  />

                  {width < 700 && (
                    <p style={{ textAlign: width < 450 ? 'center' : '' }}>
                      Don&apos;t have an account?
                      <button
                        onClick={() => setAction('register')}
                        className='ml-2 font-semibold'
                        style={{ color: 'var(--color-primary)' }}
                      >
                        Sign Up
                      </button>
                    </p>
                  )}
                  <CustomButton
                    type='submit'
                    onClick={() => handleSignin()}
                    filled={true}
                    className='w-[14rem] mt-12'
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
                </form>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default Auth
