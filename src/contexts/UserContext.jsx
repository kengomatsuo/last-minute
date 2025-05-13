import { createContext, useState, useEffect, useRef, useContext } from 'react'
import PropTypes from 'prop-types'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onIdTokenChanged,
  sendEmailVerification,
  reload,
  updateProfile,
} from 'firebase/auth'
import { auth, db, functions } from '../../firebaseConfig'
import { httpsCallable } from 'firebase/functions'
import { doc, getDoc, updateDoc, setDoc, serverTimestamp, increment } from 'firebase/firestore'
import Auth from '../screens/Auth'
import { AnimatePresence } from 'framer-motion'
import { ScreenContext, ScreenContextProvider } from './ScreenContext'
import { useConsoleLog } from '../hooks'

/**
 * @typedef {Object} UserContextType
 * @property {Object | undefined} user - The current authenticated user
 * @property {Object} user.claims - Custom claims for the user
 * @property {boolean} user.claims.isTutor - Whether the user is a tutor
 * @property {boolean} user.claims.isAdmin - Whether the user is an admin
 * @property {boolean} isCheckingEmailVerification - Whether the system is checking for email verification
 * @property {(userDetails: { email: string; password: string }) => Promise<void>} signUp - Function to sign up a new user
 * @property {(credentials: { email: string; password: string }) => Promise<void>} signIn - Function to sign in an existing user
 * @property {() => Promise<void>} signOut - Function to sign out the current user
 * @property {() => Promise<void>} applyTutor - Function to apply to become a tutor
 * @property {(email: string) => Promise<void>} addTutor - Function to add a user as a tutor
 * @property {(email: string) => Promise<void>} addAdmin - Function to add a user as an admin
 * @property {() => Promise<void>} checkEmailVerification - Function to manually check email verification
 */

/** @type {UserContextType} */
const defaultContext = {
  user: undefined,
  isCheckingEmailVerification: false,
  signUp: async () => Promise.resolve(),
  signIn: async () => Promise.resolve(),
  signOut: async () => Promise.resolve(),
  applyTutor: async () => Promise.resolve(),
  addTutor: async () => Promise.resolve(),
  addAdmin: async () => Promise.resolve(),
  checkEmailVerification: async () => Promise.resolve(),
}

/** @type {import("react").Context<UserContextType>} */
const UserContext = createContext(defaultContext)

const UserContextProvider = ({ children }) => {
  const { addAlert } = useContext(ScreenContext)
  const [user, setUser] = useState(auth.currentUser || undefined)
  useConsoleLog('UserContextProvider', user)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const initialActionRef = useRef(null)
  const [isCheckingEmailVerification, setIsCheckingEmailVerification] =
    useState(false)
  const [isAuthLoading, setIsAuthLoading] = useState(false)
  const verificationIntervalRef = useRef(null)

  // Clear any existing verification interval
  const clearVerificationInterval = () => {
    if (verificationIntervalRef.current) {
      clearInterval(verificationIntervalRef.current)
      verificationIntervalRef.current = null
      setIsCheckingEmailVerification(false)
    }
  }

  // Start verification interval checking
  const startVerificationChecking = () => {
    // Clear any existing interval first
    clearVerificationInterval()

    // Only start checking if user exists and isn't verified
    if (user && !user.emailVerified) {
      setIsCheckingEmailVerification(true)
      verificationIntervalRef.current = setInterval(
        // clear interval if user is verified
        async () => {
          const isVerified = await checkEmailVerification()
          if (isVerified) {
            clearVerificationInterval()
          }
          // console.log('Checking email verification status...')
        },
        2000
      )
    }
  }

  /**
   * Checks if the user's email has been verified and updates the React state.
   *
   * @returns {Promise<boolean>} Whether the email has been verified
   */
  const checkEmailVerification = async () => {
    try {
      if (auth.currentUser) {
        await reload(auth.currentUser)
        // console.log('User after reload:', auth.currentUser)

        // Force a state update with a new reference
        if (auth.currentUser.emailVerified) {
          setUser(prevUser => {
            // Only update if the verification status changed
            if (prevUser && !prevUser.emailVerified) {
              // console.log('Updating user state with new verification status')
              return { ...prevUser, emailVerified: true }
            }
            return prevUser
          })
        }

        return auth.currentUser.emailVerified
      }
      return false
    } catch (error) {
      console.error('Error checking email verification:', error)
      return false
    }
  }

  useEffect(() => {
    // better listener to get custom claims
    const unsubscribe = onIdTokenChanged(auth, async firebaseUser => {
      // console.log('User claims updated! New ID token:', user)
      // get custom claims
      if (firebaseUser) {
        const token = await firebaseUser.getIdTokenResult(true)
        firebaseUser.claims = token.claims
      }
      if (firebaseUser !== user) setIsAuthLoading(false)
      setUser(firebaseUser)
      // if user is not signed in, delete all the data from the local storage
      if (!firebaseUser) {
        localStorage.clear()
      }
    })

    return () => {
      unsubscribe()
      clearVerificationInterval()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // console.log('User changed:', user)

    if (user && !user.emailVerified) {
      console.log('User is not verified. Starting verification interval.')
      setIsAuthModalOpen(true)
      startVerificationChecking()
    }

    // console.log('User:', user)
    // console.log('Verified:', user && user.emailVerified)

    // Clean up the interval when component unmounts
    return () => clearVerificationInterval()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  /**
   * Signs up a new user.
   * @param {{ email: string; password: string }} userDetails
   * @returns {Promise<void>}
   */
  const signUp = async ({ displayName, email, password }) => {
    setIsAuthLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(userCredential.user, { displayName })
      // setUser({ ...userCredential.user, displayName })
      console.log('Signed up successfully!')
      await sendEmailVerification(auth.currentUser)
    } catch (error) {
      setIsAuthLoading(false)
      throw error
    }
  }

  /**
   * Signs in an existing user.
   * @param {{ email: string; password: string }} credentials
   * @returns {Promise<void>}
   */
  const signIn = async ({ email, password }) => {
    setIsAuthLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      console.log('Signed in successfully!')
      if (auth.currentUser.emailVerified === false) {
        await sendEmailVerification(auth.currentUser)
      }
    } catch (error) {
      setIsAuthLoading(false)
      throw error
    }
  }

  /**
   * Signs out the current user.
   * @returns {Promise<void>}
   */
  const signOut = async () => {
    setIsAuthLoading(true)
    try {
      clearVerificationInterval()
      await firebaseSignOut(auth)
    } catch (error) {
      setIsAuthLoading(false)
      throw error
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
        addAlert({
          type: 'info',
          title: 'Already a Tutor',
          message: 'You are already a tutor!',
        })
        return
      }

      const docRef = doc(db, 'tutorApplications', user.uid)
      const docSnap = await docRef.get()
      if (docSnap.exists()) {
        addAlert({
          type: 'info',
          title: 'Already Applied',
          message: 'You have already applied to be a tutor!',
        })
        return
      }
      await setDoc(doc(db, 'tutorApplications', user.uid), {
        email: user.email,
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      })
      addAlert({
        type: 'info',
        title: 'Application Sent',
        message: 'Your application to be a tutor has been sent!',
      })
    } catch (error) {
      addAlert({
        type: 'info',
        title: 'Error',
        message: 'There was an error applying to be a tutor.',
      })
      console.error('Error applying to be a tutor:', error)
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
      addAlert({
        type: 'info',
        title: 'Tutor Added',
        message: `The user ${email} has been added as a tutor.`,
      })
    } catch (error) {
      addAlert({
        type: 'error',
        title: 'Error',
        message: `There was an error adding the user ${email} as a tutor.`,
      })
    }
  }

  const setAdminClaim = httpsCallable(functions, 'setAdminClaim')
  /**
   * Function to apply to be an admin.
   * @returns {Promise<void>}
   */
  const addAdmin = async email => {
    try {
      const result = await setAdminClaim({ email, isAdmin: true })
      addAlert({
        type: 'info',
        title: 'Admin Added',
        message: `The user ${email} has been added as an admin.`,
      })
    } catch (error) {
      addAlert({
        type: 'error',
        title: 'Error',
        message: `There was an error adding the user ${email} as an admin.`,
      })
      console.error('Error adding admin:', error)
    }
  }

  /**
   * Opens the authentication modal with the specified initial action.
   *
   * @param {string} action - The initial action for the auth modal
   */
  const openAuthModal = action => {
    if (!user || (user && !user.emailVerified)) {
      initialActionRef.current = action
      setIsAuthModalOpen(true)
    }
  }

  const closeAuthModal = () => {
    // if (!user || (user && user.emailVerified))
    setIsAuthModalOpen(false)
  }

  const addBalanceDoc = async () => {
    if (!user) {
      console.error('No authenticated user found.')
      return
    }
    try {
      await setDoc(doc(db, 'balance', user.uid), { last_updated: serverTimestamp(), money: 0 })
      console.log('Balance document created successfully.')
    } catch (error) {
      console.error('Error initializing balance document:', error)
    }
  }

  const updateBalance = async (addedBalance) => {
    if (!user) {
      console.error('No authenticated user found.')
      return
    }
    try {
      const balanceRef = doc(db, 'balance', user.uid)
      await updateDoc(balanceRef, {
        money: increment(addedBalance),
        last_updated: serverTimestamp(),
      })
      const action = amount >= 0 ? 'increased' : 'decreased'
      addAlert({ type: 'success', title: 'Balance Updated', message: `Balance ${action} by $${parseFloat(addedBalance, 2)}.` })
    } catch (error) {
      addAlert({ type: 'error', title: 'Error', message: 'Error updating balance.' })
      console.error('Error updating balance:', error)
    }
  }

  const getBalance = async () => {
    if (!user) {
      console.error('No authenticated user found.')
      return null
    }
    try {
      const snap = await getDoc(doc(db, 'balance', user.uid))
      if (snap.exists()) {
        return /** @type {BalanceData} */ (snap.data())
      } else {
        return null
      }
    } catch (error) {
      addAlert({ type: 'error', title: 'Error', message: 'Failed to fetch balance.' })
      console.error(error)
      return null
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthLoading,
        isCheckingEmailVerification,
        signUp,
        signIn,
        signOut,
        applyTutor,
        addTutor,
        addAdmin,
        openAuthModal,
        closeAuthModal,
        addBalanceDoc,
        updateBalance,
        getBalance,
      }}
    >
      <AnimatePresence>
        {isAuthModalOpen && (
            <Auth initialAction={initialActionRef.current} />
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
