import { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onIdTokenChanged,
  sendEmailVerification,
} from 'firebase/auth'
import { auth, db, functions } from '../../firebaseConfig'
import { useConsoleLog } from '../hooks'
import { httpsCallable } from 'firebase/functions'
import { doc, setDoc } from 'firebase/firestore'
import Auth from '../screens/Auth'
import { AnimatePresence } from 'framer-motion'
import { ScreenContextProvider } from './ScreenContext'

/**
 * @typedef {Object} UserContextType
 * @property {Object} user - The current authenticated user
 * @property {Object} user.claims - Custom claims for the user
 * @property {boolean} user.claims.isTutor - Whether the user is a tutor
 * @property {boolean} user.claims.isAdmin - Whether the user is an admin
 * @property {(userDetails: { email: string; password: string }) => Promise<void>} signUp - Function to sign up a new user
 * @property {(credentials: { email: string; password: string }) => Promise<void>} signIn - Function to sign in an existing user
 * @property {() => Promise<void>} signOut - Function to sign out the current user
 * @property {() => Promise<void>} applyTutor - Function to apply to become a tutor
 * @property {(email: string) => Promise<void>} addTutor - Function to add a user as a tutor
 * @property {(email: string) => Promise<void>} addAdmin - Function to add a user as an admin
 */

/** @type {UserContextType} */
const defaultContext = {
  user: undefined,
  signUp: async () => Promise.resolve(),
  signIn: async () => Promise.resolve(),
  signOut: async () => Promise.resolve(),
  applyTutor: async () => Promise.resolve(),
  addTutor: async () => Promise.resolve(),
  addAdmin: async () => Promise.resolve(),
}

/** @type {import("react").Context<UserContextType>} */
const UserContext = createContext(defaultContext)

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(undefined)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [initialAction, setInitialAction] = useState(null)
  useConsoleLog('user', user)

  useEffect(() => {
    // const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
    //   setUser(firebaseUser)
    //   // if user is not signed in, delete all the data from the local storage
    //   if (!firebaseUser) {
    //     localStorage.clear()
    //   }
    // })

    // better listener to get custom claims
    const unsubscribe = onIdTokenChanged(auth, async user => {
      console.log('User claims updated! New ID token:', user)
      // get custom claims
      if (user) {
        const token = await user.getIdTokenResult(true)
        user.claims = token.claims
      }
      setUser(user)
      // if user is not signed in, delete all the data from the local storage
      if (!user) {
        localStorage.clear()
      }
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (user && user.emailVerified === false) setIsAuthModalOpen(true)
    console.log('User:', user)
    console.log('Verified:', user && user.emailVerified)
  }, [user])

  /**
   * Signs up a new user.
   * @param {{ email: string; password: string }} userDetails
   * @returns {Promise<void>}
   */
  const signUp = async ({ email, password }) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      console.log('Signed up successfully!')
      sendEmailVerification(auth.currentUser)
    } catch (error) {
      console.error('Error signing up:', error)
    }
  }

  /**
   * Signs in an existing user.
   * @param {{ email: string; password: string }} credentials
   * @returns {Promise<void>}
   */
  const signIn = async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      console.log('Signed in successfully!')
      if (auth.currentUser.emailVerified === false) {
        sendEmailVerification(auth.currentUser)
      }
    } catch (error) {
      console.error('Error signing in:', error)
    }
  }

  /**
   * Signs out the current user.
   * @returns {Promise<void>}
   */
  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  /**
   * Function to apply to be a tutor.
   * @returns {Promise<void>}
   */
  const applyTutor = async () => {
    try {
      // check custom claims to see if user is already a tutor
      if (user.claims?.isTutor) {
        alert('You are already a tutor!')
        return
      }

      const docRef = doc(db, 'tutorApplications', user.uid)
      const docSnap = await docRef.get()
      if (docSnap.exists()) {
        alert('You have already applied to be a tutor!')
        return
      }
      await setDoc(doc(db, 'tutorApplications', user.uid), {
        email: user.email,
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      })
      alert('You have successfully applied to be a tutor!')
    } catch (error) {
      alert(error)
    }
  }

  const setTutorClaim = httpsCallable(functions, 'setTutorClaim')
  /**
   * Function to add a tutor.
   * @returns {Promise<void>}
   */
  const addTutor = async email => {
    try {
      const result = await setTutorClaim({ email, isTutor: true })
      alert(result)
    } catch (error) {
      alert(error)
    }
  }

  const setAdminClaim = httpsCallable(functions, 'setAdminClaim')
  /**
   * Function to apply to be an admin.
   * @returns {Promise<void>}
   */
  const addAdmin = async email => {
    try {
      console.log(email)
      const result = await setAdminClaim({ email, isAdmin: true })
      alert(result)
    } catch (error) {
      alert(error)
    }
  }

  const openAuthModal = initialAction => {
    setInitialAction(initialAction)
    setIsAuthModalOpen(true)
  }
  const closeAuthModal = () => {
    // if ((user && user.emailVerified) || !user)
    setIsAuthModalOpen(false)
  }

  return (
    <UserContext.Provider
      value={{
        user,
        signUp,
        signIn,
        signOut,
        applyTutor,
        addTutor,
        addAdmin,
        openAuthModal,
        closeAuthModal,
      }}
    >
      <AnimatePresence>
        {isAuthModalOpen && (
          <ScreenContextProvider>
            <Auth initialAction={initialAction} />
          </ScreenContextProvider>
        )}
      </AnimatePresence>
      {children}
    </UserContext.Provider>
  )
}

UserContextProvider.propTypes = {
  /**
   * The children elements to be rendered within the provider.
   * @type {React.ReactNode}
   */
  children: PropTypes.node.isRequired,
}

export { UserContextProvider, UserContext }
