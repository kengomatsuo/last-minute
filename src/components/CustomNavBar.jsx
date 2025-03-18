import { useContext, useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import CustomButton from './CustomButton'
import { NavLink, useNavigate } from 'react-router-dom'
import { ScreenContext } from '../contexts/ScreenContext'
import CustomInteractive from './CustomInteractive'
import RightArrow from '../assets/icons/angle-small-right.svg?react'
import SideBar from '../assets/icons/sidebar.svg?react'
import { UserContext } from '../contexts/UserContext'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebaseConfig'

const CustomNavBar = ({ scrollContainerRef = { current: null } }) => {
  const { user } = useContext(UserContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { isSmallScreen, setNavBarHeight } = useContext(ScreenContext)
  const navBarRef = useRef(null)

  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut(auth)
      .then(() => {
        console.log('Signed out successfully!')
        navigate('/auth')
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
    if (navBarRef.current) {
      setNavBarHeight(navBarRef.current.offsetHeight)
    }
  }, [setNavBarHeight])

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
        { name: 'Book', path: '/booking' },
        { name: 'History', path: '/history' },
        { name: 'Settings', path: '/settings' },
      ]
    : [
        { name: 'Home', path: '/' },
        { name: 'Contact', path: '/contact' },
        { name: 'FAQ', path: '/faq' },
      ]

  return (
    <div
      ref={navBarRef}
      className={`sticky top-0 flex justify-between w-full py-4 px-6
        border-b border-transparent transition-colors  duration-300 ${
          isScrolled ? '!border-background-secondary/30' : ''
        }`}
    >
      <div className='flex items-center text-2xl justify-start max-md:flex-1'>
        <NavLink to={'/'} className='font-semibold text-nowrap'>
          Last Minute
        </NavLink>
      </div>

      {isSmallScreen ? (
        <>
          <CustomInteractive
            className='w-min aspect-square flex !p-1.5 items-center justify-center'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <SideBar width={28} height={28} />
          </CustomInteractive>

          {/* Animate Presence for smooth entry and exit */}
          <AnimatePresence>
            {isMenuOpen && (
              <>
                <motion.div
                  className='absolute top-0 left-0 w-screen h-screen bg-background-secondary/25'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, backdropFilter: 'blur(3px)' }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMenuOpen(false)}
                />

                <motion.div
                  className='w-72 max-w-4/5 fixed top-0 text-end flex flex-col px-6 py-4 right-0 h-screen bg-background'
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
                    boxShadow: '0px 0px 0px 0px rgba(0, 0, 0, 0)',
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 20,
                    mass: 0.5,
                  }}
                >
                  <CustomInteractive
                    className='w-min aspect-square flex !p-1 items-center mb-2 justify-center ml-auto'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <RightArrow width={32} height={32} />
                  </CustomInteractive>

                  <NavLink to={'/auth'} className='flex'>
                    <CustomButton
                      filled
                      className='flex-1'
                      onClick={() => {
                        setIsMenuOpen(false)
                        handleSignOut()
                      }}
                    >
                      {user ? 'Sign out' : 'Sign in / Register'}
                    </CustomButton>
                  </NavLink>

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
                        className='py-2 flex justify-end'
                      >
                        {navPath.name}
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
          <div className='inline-flex gap-2'>
            {navigationPaths.map(navPath => (
              <NavLink
                key={navPath.name}
                to={navPath.path}
                className={({ isActive }) =>
                  isActive
                    ? 'underline underline-offset-4 underline-primary pointer-events-none'
                    : undefined
                }
              >
                <CustomInteractive>{navPath.name}</CustomInteractive>
              </NavLink>
            ))}
          </div>

          {user ? (
            <div className='flex gap-2 flex-row'>
              <CustomButton onClick={() => handleSignOut()}>
                Sign out
              </CustomButton>
            </div>
          ) : (
            <div className='flex gap-2 flex-row'>
              <NavLink
                to={{ pathname: '/auth' }}
                state={{ action: 'register' }}
                className={({ isActive }) =>
                  `flex-1 flex transition-opacity ${
                    isActive ? 'pointer-events-none opacity-50' : ''
                  }`
                }
              >
                <CustomButton>Register</CustomButton>
              </NavLink>
              <NavLink
                to={{ pathname: '/auth' }}
                state={{ action: 'signin' }}
                className={({ isActive }) =>
                  `flex-1 flex transition-opacity ${
                    isActive ? 'pointer-events-none opacity-50' : ''
                  }`
                }
              >
                <CustomButton filled>Sign in</CustomButton>
              </NavLink>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CustomNavBar

// Props validation
CustomNavBar.propTypes = {
  scrollContainerRef: PropTypes.object.isRequired,
}
