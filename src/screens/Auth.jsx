import { useContext, useRef, useState, useEffect } from 'react'
import { CustomButton, CustomInput, CustomInteractive } from '../components'
import { UserContext } from '../contexts/UserContext'
import { AnimatePresence, motion } from 'framer-motion'
import ArrowRightIcon from '../assets/icons/arrow-small-right.svg?react'
import EmailIcon from '../assets/icons/mailbox.svg?react'
import EmailUpIcon from '../assets/icons/mailbox-flag-up.svg?react'
import UserIcon from '../assets/icons/user.svg?react'
import PasswordIcon from '../assets/icons/lock.svg?react'
import Logo from '../assets/icons/logo.svg?react'
import SignInDecoration from '../assets/icons/signInDecoration.svg?react'
import { MOVEMENT_TRANSITION } from '../constants/visualConstants'
import PropTypes from 'prop-types'
import { useConsoleLog } from '../hooks'
import { ScreenContext } from '../contexts/ScreenContext'

/**
 * Authentication component that handles sign in and registration
 *
 * @returns {JSX.Element} The rendered authentication modal
 */
const Auth = ({ initialAction }) => {
  const { user, signIn, signUp, signOut, closeAuthModal, isCheckingEmailVerification, isAuthLoading } =
    useContext(UserContext)
  const { isSmallScreen } = useContext(ScreenContext)
  useConsoleLog('issmall', isSmallScreen)
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [isModalMounted, setIsModalMounted] = useState(false)
  const [action, setAction] = useState(initialAction || 'register')

  // Track modal mount state to prevent child animations on modal entry/exit
  useEffect(() => {
    setIsModalMounted(true)
    return () => setIsModalMounted(false)
  }, [])

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
    try {
      const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
      if (!emailRegEx.test(email)) {
        throw new Error('Invalid email')
      }
    } catch (error) {
      console.error('Invalid email:', error.message)
    }
  }

  const handleSignin = async e => {
    e?.preventDefault()

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

      await signIn(data)
    } catch (error) {
      alert(error.message)
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

      await signUp(data)
    } catch (error) {
      alert(error.message)
      console.error('Error signing up:', error.message)
    }
  }

  // Determine if children should animate based on modal state
  const shouldAnimateChildren = isModalMounted

  if (user?.emailVerified) closeAuthModal()

  return (
    <div className='fixed overflow-y-scroll scrollbar-hide py-4 z-20 flex w-screen h-screen text-primary-text justify-center items-center'>
      <motion.div
        className='fixed z-20 top-0 left-0 w-screen h-screen bg-background-secondary/30'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, backdropFilter: 'blur(4px)' }}
        onClick={() => closeAuthModal()}
        exit={{
          opacity: 0,
          transition: { delay: 0.3, duration: 0.3 },
        }}
      />
      <motion.div
        key={'auth-modal'}
        initial={{ y: '150%' }}
        animate={{ y: 0 }}
        exit={{ y: '150%' }}
        transition={MOVEMENT_TRANSITION}
        className={`flex z-30 w-[min(75rem,11/12*100%)] bg-white ${
          action === 'register' ? 'flex-row' : 'flex-row-reverse'
        } my-auto rounded-4xl max-w-[75rem] h-[45rem] overflow-clip justify-between`}
      >
        <AnimatePresence>
          {user && isCheckingEmailVerification ? (
            <motion.div
              initial={shouldAnimateChildren ? { scale: '150%' } : false}
              animate={{ scale: '100%' }}
              transition={MOVEMENT_TRANSITION}
              className='p-[min(3rem,6%)] w-full flex flex-col h-full'
            >
              <CustomInteractive
                className='!p-1 !size-min mr-auto aspect-square items-center flex'
                onClick={() => signOut()}
              >
                <ArrowRightIcon width={36} height={36} className='rotate-180' />
              </CustomInteractive>
              <div className='flex flex-1 h-full flex-col justify-center items-center'>
                <div className='flex flex-col items-center justify-center gap-4 text-center max-w-md'>
                  <motion.div
                    animate={{
                      rotate: [0, -7, 7, -7, 7, 0], // Wiggle pattern
                    }}
                    transition={{
                      duration: 2.5,
                      times: [0, 0.05, 0.1, 0.15, 0.2, 0.25],
                      ease: 'easeInOut',
                      repeat: Infinity,
                      repeatDelay: 0.75, // 1 second pause between animations
                    }}
                  >
                    <EmailUpIcon
                      width={160}
                      height={160}
                      className='fill-primary'
                    />
                  </motion.div>
                  <motion.div className='flex flex-col gap-2'>
                    <h2 className='text-primary font-semibold gap-4 flex w-full text-xl'>
                      A verification email has been sent to {user.email}.
                    </h2>
                    <p>Please verify your email address to continue.</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : action === 'register' ? (
            <>
              <motion.div
                key={'register'}
                initial={shouldAnimateChildren ? { x: '100%' } : false}
                animate={{ x: 0 }}
                exit={shouldAnimateChildren ? { x: '100%' } : false}
                transition={MOVEMENT_TRANSITION}
                className={
                  'p-[min(3rem,6%)] justify-between min-w-fit flex flex-col flex-6'
                }
              >
                <div className={'flex items-center justify-between'}>
                  <CustomInteractive
                    className='!p-1 !size-min aspect-square items-center flex'
                    onClick={() => closeAuthModal()}
                  >
                    <ArrowRightIcon
                      width={36}
                      height={36}
                      className='rotate-180'
                    />
                  </CustomInteractive>
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
                <div className='flex flex-col justify-center flex-1'>
                  <div className='flex justify-between items-center'>
                    <div>
                      <h1 className='pb-1 text-primary-text'>Sign Up</h1>
                      <h3 className='text-gray-400 text-nowrap'>
                        Secure your grades with{' '}
                        <b className='italic'>Last Minute</b>
                      </h3>
                    </div>
                    <Logo width={80} height={80} />
                  </div>

                  <form
                    ref={formRef}
                    onSubmit={e => handleSignup(e)}
                    className={'mt-10 flex flex-col gap-5'}
                  >
                    <CustomInput
                      name='displayName'
                      inputClassName={inputClassName}
                      image={<UserIcon width={24} height={24} />}
                      placeholder='Name'
                      disabled={isAuthLoading}
                      validateFunction={e => {
                        if (e.length < 3)
                          throw new Error('Name must be at least 3 characters')
                      }}
                      required
                      ref={nameRef}
                    />
                    <CustomInput
                      name='email'
                      inputClassName={inputClassName}
                      image={<EmailIcon width={24} height={24} />}
                      placeholder='Email'
                      disabled={isAuthLoading}
                      validateFunction={e => validateEmail(e)}
                      required
                      ref={emailRef}
                    />
                    <CustomInput
                      name='password'
                      inputClassName={inputClassName}
                      image={<PasswordIcon width={24} height={24} />}
                      placeholder='Password'
                      disabled={isAuthLoading}
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
                        disabled={isAuthLoading}
                        validateFunction={e => validateRetypePassword(e)}
                        type='password'
                        required
                        ref={retypePasswordRef}
                      />
                    )}
                    <CustomButton
                      type='submit'
                      loading={isAuthLoading}
                      filled={true}
                      className='w-[14rem] mt-4'
                    >
                      <div className='flex items-center gap-4'>
                        <p>Sign Up</p>
                        <div className='p-2 rounded-full'>
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
              </motion.div>
              {!isSmallScreen && (
                <motion.div
                  key={'register-decoration'}
                  initial={
                    shouldAnimateChildren ? { x: '100%', scale: '150%' } : false
                  }
                  animate={{ x: 0, scale: '100%' }}
                  transition={MOVEMENT_TRANSITION}
                  className='flex-4'
                >
                  <SignInDecoration />
                </motion.div>
              )}
            </>
          ) : (
            <>
              <motion.div
                key={'signin'}
                initial={shouldAnimateChildren ? { x: '-100%' } : false}
                animate={{ x: 0 }}
                exit={shouldAnimateChildren ? { x: '-100%' } : false}
                transition={MOVEMENT_TRANSITION}
                className='w-full flex flex-col min-w-fit p-[min(3rem,6%)]'
              >
                <div className={'flex items-center justify-between'}>
                  <CustomInteractive
                    className='!p-1 !size-min aspect-square items-center flex'
                    onClick={() => closeAuthModal()}
                  >
                    <ArrowRightIcon
                      width={36}
                      height={36}
                      className='rotate-180'
                    />
                  </CustomInteractive>
                  {!isSmallScreen && (
                    <div className='inline-flex items-center text-nowrap'>
                      Don&apos;t have an account?
                      <CustomInteractive
                        onClick={() => setAction('register')}
                        className='font-semibold !p-1 !size-min ml-2 w-min !text-primary'
                      >
                        Sign Up
                      </CustomInteractive>
                    </div>
                  )}
                </div>
                <div className='flex flex-col justify-center flex-1'>
                  <div className='flex justify-between items-center text-nowrap'>
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
                    className={'mt-10 flex flex-col gap-6'}
                  >
                    <CustomInput
                      name='email'
                      inputClassName={inputClassName}
                      image={<EmailIcon width={24} height={24} />}
                      placeholder='Email'
                      disabled={isAuthLoading}
                      validateFunction={e => validateEmail(e)}
                      required
                      ref={emailRef}
                    />
                    <CustomInput
                      name='password'
                      inputClassName={inputClassName}
                      image={<PasswordIcon width={24} height={24} />}
                      placeholder='Password'
                      disabled={isAuthLoading}
                      type='password'
                      required
                      ref={passwordRef}
                    />

                    {isSmallScreen && (
                      <div className='inline-flex items-center text-nowrap'>
                        Don&apos;t have an account?
                        <CustomInteractive
                          onClick={() => setAction('register')}
                          className='font-semibold !p-1 ml-2 w-min !text-primary'
                        >
                          Sign Up
                        </CustomInteractive>
                      </div>
                    )}
                    <CustomButton
                      type='submit'
                      filled={true}
                      loading={isAuthLoading}
                      className='w-[14rem] mt-12'
                    >
                      <div className='flex items-center gap-4'>
                        <p>Sign In</p>
                        <div className='p-2 rounded-full'>
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
              </motion.div>
              {!isSmallScreen && (
                <motion.div
                  key={'signin-decoration'}
                  initial={
                    shouldAnimateChildren
                      ? { x: '-100%', scale: '150%' }
                      : false
                  }
                  animate={{ x: 0, scale: '100%' }}
                  transition={MOVEMENT_TRANSITION}
                  className='flex-4'
                >
                  <SignInDecoration style={{ transform: 'scaleX(-1)' }} />
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
Auth.propTypes = {
  initialAction: PropTypes.oneOf(['register', 'signin']),
}

export default Auth
