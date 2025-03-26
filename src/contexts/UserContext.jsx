import { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendEmailVerification,
} from 'firebase/auth' // Import Firebase auth functions
import { auth } from '../../firebaseConfig'

/**
 * @typedef {Object} UserContextType
 * @property {import("firebase/auth").User | undefined} user - The current authenticated user.
 * @property {(userDetails: { email: string; password: string }) => Promise<void>} signUp - Function to sign up a new user.
 * @property {(credentials: { email: string; password: string }) => Promise<void>} signIn - Function to sign in an existing user.
 * @property {() => Promise<void>} signOut - Function to sign out the current user.
 */

/** @type {UserContextType} */
const defaultContext = {
  user: undefined,
  signUp: async () => Promise.resolve(),
  signIn: async () => Promise.resolve(),
  signOut: async () => Promise.resolve(),
}

/** @type {import("react").Context<UserContextType>} */
const UserContext = createContext(defaultContext)

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
      setUser(firebaseUser)
    })

    return () => unsubscribe()
  }, [])
  /**
   * Signs up a new user.
   * @param {{ email: string; password: string }} userDetails
   * @returns {Promise<void>}
   */
  const sendEmail = async (targetUser) => {
    try {
      // Send email verification
      await sendEmailVerification(targetUser)
      console.log('Verification email sent to:', targetUser?.email)
  
    } catch (error) {
      console.error('Sign up error:', error)
    }
  }

  const signUp = async ({ email, password }) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredentials.user

      if (user?.emailVerified === false) {
        sendEmail(user)
      }

      await waitForUserUpdate()
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
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      if (!user?.emailVerified) {
        sendEmail(user)
        await auth.signOut()
        return
      }

      await waitForUserUpdate()
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
      await waitForUserUpdate()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  /**
   * Waits for the user state to update.
   * @returns {Promise<import("firebase/auth").User | null>}
   */
  const waitForUserUpdate = () => {
    return new Promise(resolve => {
      const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
        setUser(firebaseUser)
        unsubscribe()
        resolve(firebaseUser)
      })
    })
  }

  return (
    <UserContext.Provider value={{ user, signUp, signIn, signOut }}>
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
