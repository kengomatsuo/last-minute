import { use, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CustomButton, CustomInput, CustomInput2 } from '../components'
import { UserContext } from '../contexts/UserContext'
import { ScreenContext } from '../contexts/ScreenContext'
import { navBarHeight } from '../constants/visualConstants'

import SignInDecoration from '../assets/icons/signInDecoration'
import ArrowLeft from '../assets/icons/arrowLeft'
import User from '../assets/icons/user.svg?react'
import Email from '../assets/icons/email'
import Password from '../assets/icons/password.svg?react'
import Logo from '../assets/icons/logo.svg?react'
import { isEmpty, set } from 'lodash'
import { AnimatePresence, motion } from 'framer-motion'
import Popup from '../components/PopUp'

const Auth = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { isSmallScreen, dimensions } = use(ScreenContext)
  const { width, height } = dimensions
  const { user, signIn, signUp } = use(UserContext)

  const [hover, setHover] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [retypePassword, setRetypePassword] = useState('')
  const [errorMessage, setErrorMessage] = useState({
    name: '',
    email: '',
    retypePassword: '',
  })
  const [requirementsPassword, setRequirementsPassword] = useState([
    { text: 'Least 8 characters', complete: false },
    { text: 'Least one number (0–9) or a symbol', complete: false },
    { text: 'Lowercase (a–z) and uppercase (A–Z)', complete: false },
  ])

  const passwordSuccess = useMemo(() => requirementsPassword.filter(item => item.complete === true).length === 3, [requirementsPassword, password])
  const hasError = useMemo(() => !isEmpty(errorMessage?.name) || !isEmpty(errorMessage?.email) || !isEmpty(errorMessage?.retypePassword) ? true : false, [errorMessage])

  // location state is used to determine the action (signin or register)
  const [action, setAction] = useState(location.state?.action || 'signin')

  useEffect(() => {
    setErrorMessage({
      name: '',
      email: '',
      retypePassword: '',
    })
    setName('')
    setEmail('')
    setPassword('')
    setRetypePassword('')
    handleInputChange(password)
  }, [action])

  useEffect(() => {
    if (!isEmpty(user)) {
      if (!user?.emailVerified) {
        setShowPopup(true)
        setAction('signin')
      } else {
        navigate('/')
      }
    }
  }, [user])
  
  const handleSignUp = async () => {
    let validated = passwordSuccess
    const newErrors = { name: '', email: '', retypePassword: '' }

    if (isEmpty(name)) {
      newErrors.name = 'Name is required'
      validated = false
    } else if (name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
      validated = false
    } else {
      newErrors.name = ''
    }

    if (isEmpty(email)) {
      newErrors.email = 'Email is required'
      validated = false
    } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) === false) {
      newErrors.email = 'Email is invalid'
      validated = false
    } else {
      newErrors.email = ''
    }

    if (retypePassword !== password && passwordSuccess) {
      newErrors.retypePassword = 'Passwords do not match'
      validated = false
    } else {
      newErrors.retypePassword = ''
    }
    setErrorMessage(newErrors)

    if (validated) {
      await signUp({ username: name, email: email, password: password })
    }

    return
  }

  const handleSignIn = async () => {
    await signIn({ email: email, password: password })
  }

  const handleInputChange = (value) => {
    const updatedRequirements = [
      {
        text: 'Least 8 characters',
        complete: value.length >= 8
      },
      {
        text: 'Least one number (0–9) or a symbol',
        complete: /[\d\W]/.test(value)
      },
      {
        text: 'Lowercase (a–z) and uppercase (A–Z)',
        complete: /[a-z]/.test(value) && /[A-Z]/.test(value)
      }
    ]
    setPassword(value)
    setRequirementsPassword(updatedRequirements)
  }

  return (
    <div className={`flex flex-col flex-1 items-center justify-center`} style={{ paddingTop: navBarHeight }}>

      {showPopup && (
        <Popup onClose={() => setShowPopup(false)}>
          <div className='flex flex-col items-center justify-center pt-4'>
            <Email width={100} height={100} color={'rgba(173, 169, 145)'} />
            <h2 className='font-semibold text-center text-lg text-primary mt-6'>Email Verification has been sent to {isEmpty(user?.email) ? 'your email' : user?.email}!</h2>
            <p className='font-extralight text-sm mt-3'>Please verify your email before signing in...</p>
          </div>
        </Popup>
      )}

      <AnimatePresence mode='wait'>
        <motion.div
          key={action}
          initial={{ opacity: 0, x: action === 'signin' ? -100 : 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: action === 'signin' ? 100 : -100 }}
          transition={{ duration: 0.5 }}
          style={{ width: width * 0.85, height: width >= 1050 ? 750 : 'auto', background: 'white' }}
          className='flex flex-row rounded-[30px] max-w-[1200px] justify-between'
        >
          {action === 'register' ? (
            <>
              <div className={`${width < 500 ? 'px-[2rem] py-[1rem]' : 'px-[6rem] py-[3rem]'} justify-between flex flex-col w-[40rem] flex-6`}>
                <div className={`flex-1`}>
                  <div className={`flex items-center justify-between ${hasError ? 'pb-[3rem]' : 'pb-[4rem]'}`}>
                    <button onClick={() => navigate('/')}><ArrowLeft /></button>
                    {/* {width >= 500 && ( */}
                      <p>Already a member?<button onClick={() => setAction('signin')} className='ml-2 font-semibold' style={{ color: 'var(--color-primary)' }}>Sign In</button></p>
                    {/* )} */}
                  </div>
                  
                  <div className='flex justify-between items-center'>
                    <div>
                      <h1 className='pb-1'>Sign Up</h1>
                      <h3 className='text-gray-400'>Secure your grades with <b className='italic'>Last Minute</b></h3>
                    </div>
                  </div>

                  <div className={`${passwordSuccess ? 'mt-6' : 'mt-12'} flex flex-col gap-5`}
                  >
                      <CustomInput2 
                        image={<User width={24} height={24} />} 
                        placeholder='Name'
                        onChange={e => setName(e.target.value)} 
                        errorMessage={errorMessage?.name}
                      />
                      <CustomInput2 
                        image={<Email width={24} height={24} />} 
                        placeholder='Email' 
                        onChange={e => setEmail(e.target.value)}
                        errorMessage={errorMessage?.email}
                      />
                      <CustomInput2 
                        image={<Password width={24} height={24} />} 
                        placeholder='Password' 
                        type='password'
                        requirements={requirementsPassword}
                        onChange={e => handleInputChange(e.target.value)}
                      />
                      {passwordSuccess && (
                        <CustomInput2 
                          image={<Password width={24} height={24} />} 
                          placeholder='Re-Type Password' 
                          type='password'
                          onChange={e => setRetypePassword(e.target.value)}
                          errorMessage={errorMessage?.retypePassword}
                        />
                      )}
                  </div>
                </div>

                <CustomButton 
                  onClick={() => handleSignUp()}
                  filled={true}
                  className='w-[14rem]'
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                >
                  <div className='flex items-center gap-4'>
                    <p>Sign Up</p>
                    <div className='p-2 rounded-full' style={{ backgroundColor: hover ? 'transparent' : 'var(--color-primary-low-opacity)'}}>
                      <ArrowLeft style={{ transform: 'rotate(180deg)', width: 20, height: 20 }} color='white' />
                    </div>
                  </div>
                </CustomButton>
              </div>
              {width >= 1050 && 
                <div style={{ flex: 4 }}>
                  <SignInDecoration />
                </div>
              } 
            </>
            ) : (
              <>
                {width >= 1050 && 
                  <div style={{ flex: 4 }}>
                    <SignInDecoration style={{ transform: 'scaleX(-1)' }} />
                  </div>
                }
                <div className={`flex-6 py-[4rem] ${width < 500 ? 'px-[2rem]' : width < 1200 ? 'px-[4rem]' : 'px-[8rem]'}`}>
                  <div className={`flex items-center justify-between ${hasError ? 'pb-[3rem]' : passwordSuccess ? 'pb-[4rem]' : 'pb-[5rem]'}`}>
                    <button onClick={() => navigate('/')}><ArrowLeft /></button>
                    {width >= 700 && (
                      <p>Don't have an account?<button onClick={() => setAction('register')} className='ml-2 font-semibold' style={{ color: 'var(--color-primary)' }}>Sign Up</button></p>
                    )}
                  </div>
                  
                  <div className='flex justify-between items-center'>
                    <div>
                      <h1 className='pb-1'>Sign In</h1>
                      <h3 className='text-gray-400'>Secure your grades with <b className='italic'>Last Minute</b></h3>
                    </div>
                    <Logo width={80} height={80} />
                  </div>

                  <div className={`mt-12 mb-24 flex flex-col gap-6`}
                  >
                      <CustomInput2 
                        image={<Email width={24} height={24} />} 
                        placeholder='Email' 
                        onChange={e => setEmail(e.target.value)}
                      />
                      <CustomInput2 
                        image={<Password width={24} height={24} />} 
                        placeholder='Password' 
                        type='password'
                        onChange={e => handleInputChange(e.target.value)}
                      />

                      {width < 700 && (
                        <p style={{ textAlign: width < 450 ? 'center' : '' }}>Don't have an account?<button onClick={() => setAction('register')} className='ml-2 font-semibold' style={{ color: 'var(--color-primary)' }}>Sign Up</button></p>
                      )}
                  </div>

                  <CustomButton 
                    onClick={() => handleSignIn()}
                    filled={true}
                    className='w-[14rem]'
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                  >
                    <div className='flex items-center gap-4'>
                      <p>Sign In</p>
                      <div className='p-2 rounded-full' style={{ backgroundColor: hover ? 'transparent' : 'var(--color-primary-low-opacity)'}}>
                        <ArrowLeft style={{ transform: 'rotate(180deg)', width: 20, height: 20 }} color='white' />
                      </div>
                    </div>
                  </CustomButton>
                </div>
              </>
            ) 
          }
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default Auth
