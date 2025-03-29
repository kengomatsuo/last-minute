import { use, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import CustomButton from './CustomButton'
import { NavLink, useNavigate } from 'react-router-dom'
import { ScreenContext } from '../contexts/ScreenContext'
import CustomInteractive from './CustomInteractive'
import RightArrowIcon from '../assets/icons/angle-small-right.svg?react'
import SideBarIcon from '../assets/icons/sidebar.svg?react'
import { UserContext } from '../contexts/UserContext'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebaseConfig'
import { MOVEMENT_TRANSITION } from '../constants/visualConstants'

/**
 * Custom navigation bar component with responsive design and animations.
 *
 * @param {Object} props - Component props
 * @param {Object} props.scrollContainerRef - Reference to the scroll container
 * @returns {JSX.Element} The rendered navigation bar
 */
const CustomNavBar = ({ scrollContainerRef = { current: null } }) => {
  const { user, openAuthModal } = use(UserContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { isSmallScreen } = use(ScreenContext)
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut(auth)
      .then(() => {
        console.log('Signed out successfully!')
        navigate('/')
      })
      .catch(error => {
        console.error('Error signing out:', error)
      })
  }

  useEffect(() => {
    if (isSmallScreen) {
      setIsMenuOpen(false)
    }
  }, [isSmallScreen])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(scrollContainerRef.current.scrollTop > 0)
    }

    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll)
      }
    }
  }, [scrollContainerRef])

  const navigationPaths = user
    ? [
        { name: 'Dashboard', path: '/' },
        user.claims?.isAdmin
          ? { name: 'Requests', path: '/requests' }
          : { name: 'Booking', path: '/booking' },
        { name: 'History', path: '/history' },
        { name: 'Settings', path: '/settings' },
      ]
    : [
        { name: 'Home', path: '/' },
        { name: 'Contact', path: '/contact' },
        { name: 'FAQ', path: '/faq' },
      ]

  // Animation variants for nav items
  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: 10,
      transition: { delay: user ? 0.1 : 0.15, duration: 0.2 },
    },
  }

  // Animation variants for the auth buttons container
  const authContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        duration: 0.3,
      },
    },
  }

  // Animation variants for individual auth buttons
  const authButtonVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
    exit: { opacity: 0, y: 10, transition: { duration: 0.2 } },
  }

  return (
    <>
      <nav
        className={`fixed h-[4.5rem] z-10 top-0 flex justify-between w-full py-4 px-6
        border-b border-transparent transition-colors bg-background duration-300 ${
          isScrolled ? '!border-background-secondary/30' : ''
        }`}
      >
        <motion.div
          className='flex items-center text-2xl justify-start max-md:flex-1'
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={MOVEMENT_TRANSITION}
        >
          <NavLink
            to={'/'}
            className='font-semibold text-nowrap focus:ring-offset-2'
          >
            Last Minute
          </NavLink>
        </motion.div>

        {isSmallScreen ? (
          <>
            <CustomInteractive
              className='w-min aspect-square flex !p-1.5 items-center justify-center'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <SideBarIcon width={28} height={28} />
            </CustomInteractive>

            {/* Animate Presence for smooth entry and exit */}
            <AnimatePresence mode='wait'>
              {isMenuOpen && (
                <>
                  <motion.div
                    className='absolute z-20 top-0 left-0 w-screen h-screen bg-background-secondary/30'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, backdropFilter: 'blur(4px)' }}
                    exit={{
                      opacity: 0,
                      transition: { delay: 0.3, duration: 0.3 },
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  />

                  <motion.div
                    className='w-72 max-w-4/5 fixed z-30 top-0 text-end flex flex-col px-6 py-4 right-0 h-screen bg-background'
                    initial={{
                      x: '100%',
                      boxShadow: '0px 0px 0px 0px rgba(0, 0, 0, 0)',
                    }}
                    animate={{
                      x: 0,
                      boxShadow: '3px 0px 10px 2px rgba(0, 0, 0, 0.1)',
                    }}
                    exit={{
                      x: '100%',
                      boxShadow: '0px 0px 0px 0px rgba(0, 0, 0, 0.1)',
                    }}
                    transition={MOVEMENT_TRANSITION}
                  >
                    <CustomInteractive
                      className='w-min aspect-square flex !p-1 items-center mb-2 justify-center ml-auto'
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <RightArrowIcon width={32} height={32} />
                    </CustomInteractive>

                      <CustomButton
                        filled
                        onClick={() => {
                          setIsMenuOpen(false)
                          user ? handleSignOut() : openAuthModal()
                        }}
                      >
                        {user ? 'Sign out' : 'Sign in / Register'}
                      </CustomButton>


                    <p className='text-lg font-semibold mr-3 mt-6 mb-2'>
                      Navigation
                    </p>

                    {navigationPaths.map(navPath => (
                      <NavLink
                        key={navPath.name}
                        to={navPath.path}
                        className={({ isActive }) =>
                          isActive
                            ? ' bg-background-secondary/50 rounded-md pointer-events-none'
                            : undefined
                        }
                      >
                        <CustomInteractive
                          onClick={() => setIsMenuOpen(false)}
                          className='py-2 flex justify-end text-right'
                        >
                          <p className='w-full'>{navPath.name}</p>
                        </CustomInteractive>
                      </NavLink>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </>
        ) : (
          <div className='text-lg font-medium items-center justify-end inline-flex top-0 py-0 gap-4'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={user ? 'user-nav' : 'guest-nav'}
                className='inline-flex gap-2'
                initial='hidden'
                animate='visible'
                exit='exit'
                variants={authContainerVariants}
              >
                {navigationPaths.map((navPath, index) => (
                  <motion.div
                    key={navPath.name}
                    custom={index}
                    variants={navItemVariants}
                  >
                    <NavLink
                      to={navPath.path}
                      className={({ isActive }) =>
                        isActive
                          ? 'underline underline-offset-4 underline-primary pointer-events-none'
                          : undefined
                      }
                    >
                      <CustomInteractive>{navPath.name}</CustomInteractive>
                    </NavLink>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode='wait'>
              {user ? (
                <motion.div
                  key='user-auth'
                  className='flex gap-2 flex-row'
                  initial='hidden'
                  animate='visible'
                  exit='exit'
                  variants={authContainerVariants}
                >
                  <motion.div variants={authButtonVariants}>
                    <CustomButton onClick={() => handleSignOut()}>
                      Sign out
                    </CustomButton>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key='guest-auth'
                  className='flex gap-2 flex-row'
                  initial='hidden'
                  animate='visible'
                  exit='exit'
                  variants={authContainerVariants}
                >
                  <motion.div variants={authButtonVariants}>
                      <CustomButton onClick={() => openAuthModal('register')}>Register</CustomButton>
                  </motion.div>
                  <motion.div variants={authButtonVariants}>
                      <CustomButton onClick={() => openAuthModal('signin')} filled>Sign in</CustomButton>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </nav>
    </>
  )
}

export default CustomNavBar

// Props validation
CustomNavBar.propTypes = {
  scrollContainerRef: PropTypes.object.isRequired,
}
