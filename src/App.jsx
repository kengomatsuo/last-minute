import { Route, Routes, useLocation, Outlet } from 'react-router-dom'
import Landing from './screens/Landing'
import CustomNavBar from './components/CustomNavBar'
import Auth from './screens/Auth'
import Error404 from './screens/Error404'
import { ScreenContextProvider } from './contexts/ScreenContext'
import { useContext, useRef } from 'react'
import { UserContext } from './contexts/UserContext'
import { AnimatePresence, motion } from 'framer-motion'
import Dashboard from './screens/Dashboard'
import Booking from './screens/Booking'
import Session from './screens/Session'
import Settings from './screens/Settings'
import MainLoading from './screens/MainLoading'
import Contact from './screens/Contact'
import History from './screens/History'
import { CourseContextProvider } from './contexts/CourseContext'
import Requests from './screens/Requests'
import { MOVEMENT_TRANSITION } from './constants/visualConstants'
import { useConsoleLog } from './hooks'

/**
 * Layout component that wraps authenticated routes with CourseContextProvider
 *
 * @returns {JSX.Element} The authenticated route layout with course context
 */
const AuthenticatedLayout = () => (
  <CourseContextProvider>
    <Outlet />
  </CourseContextProvider>
)

/**
 * Main application component that handles routing and authentication state.
 *
 * @returns {JSX.Element} The rendered application
 */
function App() {
  const { user } = useContext(UserContext)
  const location = useLocation()
  const scrollContainerRef = useRef(null)

  return (
    <AnimatePresence mode='wait'>
      {user === undefined ? (
        <motion.div
          key='loading'
          className='w-screen h-screen flex justify-center items-center text-primary-text'
          initial={{ opacity: 0, scale: 1.2, transition: { duration: 0.10 } }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
          transition={MOVEMENT_TRANSITION}
        >
          <MainLoading />
        </motion.div>
      ) : (
        <motion.div
          key='loaded'
          className='w-screen h-screen overflow-hidden flex-col flex text-primary-text'
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={MOVEMENT_TRANSITION}
        >
          <ScreenContextProvider>
            <CustomNavBar scrollContainerRef={scrollContainerRef} />
            <AnimatePresence mode='wait'>
              <motion.div
                key={location.pathname + (user ? '-auth' : '-guest')}
                variants={{
                  initial: { opacity: 0, scale: 1.2 },
                  animate: {
                    opacity: 1,
                    scale: 1,
                    // transition: { duration: 0.3 },
                  },
                  exit: {
                    opacity: 0,
                    scale: 0.8,
                    transition: { duration: 0.15 },
                  },
                }}
                transition={MOVEMENT_TRANSITION}
                ref={scrollContainerRef}
                initial='initial'
                animate='animate'
                exit='exit'
                className='w-full overflow-y-auto h-screen flex'
              >
                <Routes location={location} key={location.pathname}>
                  <Route
                    path='/'
                    element={
                      user ? (
                        <CourseContextProvider>
                          <Dashboard />
                        </CourseContextProvider>
                      ) : (
                        <Landing />
                      )
                    }
                  />

                  {user ? (
                    <Route element={<AuthenticatedLayout />}>
                      {user.claims?.isTutor ? (
                        <Route path='/requests' element={<Requests />}/>
                      ) : (
                        <Route path='/booking' element={<Booking />} />
                      )}
                      <Route path='/session' element={<Session />} />
                      <Route path='/history' element={<History />} />
                      <Route path='/settings' element={<Settings />} />
                      <Route path='/landing' element={<Landing />} />
                      <Route path='/contact' element={<Contact />} />
                    </Route>
                  ) : (
                    <>
                      {/* <Route path='/auth' element={<Auth />} /> */}
                      <Route path='/contact' element={<Contact />} />
                    </>
                  )}

                  <Route path='*' element={<Error404 />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </ScreenContextProvider>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default App
