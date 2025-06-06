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
  sendPasswordResetEmail,
  updateEmail,
  updatePhoneNumber,
} from 'firebase/auth'
import { auth, db, functions } from '../../firebaseConfig'
import { httpsCallable } from 'firebase/functions'
import { doc, updateDoc, setDoc, increment, onSnapshot } from 'firebase/firestore'
import Auth from '../screens/Auth'
import { AnimatePresence } from 'framer-motion'
import { ScreenContext } from './ScreenContext'
import { useConsoleLog } from '../hooks'
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'

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
  balance: undefined,
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
  const { addAlert, setSelectedTheme } = useContext(ScreenContext)
  const [user, setUser] = useState(auth.currentUser || undefined)
  useConsoleLog('UserContextProvider', user)
  const [balance, setBalance] = useState(0)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const initialActionRef = useRef(null)
  const [isCheckingEmailVerification, setIsCheckingEmailVerification] =
    useState(false)
  const [isAuthLoading, setIsAuthLoading] = useState(false)
  const verificationIntervalRef = useRef(null)
  const storage = getStorage()

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
      setSelectedTheme('default')
      await firebaseSignOut(auth)
      console.log('Signed out successfully!')
    } catch (error) {
      setIsAuthLoading(false)
      throw error
    }
  }

  const setTutorClaim = httpsCallable(functions, 'setTutorClaim')
  /**
   * Function to add a tutor.
   * @returns {Promise<void>}
   */
  const addTutor = async email => {
    try {
      await setTutorClaim({ email, isTutor: true })
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
      await setAdminClaim({ email, isAdmin: true })
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
      await setDoc(doc(db, 'balance', user.uid), { money: 0 })
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
      })
      const action = addedBalance >= 0 ? 'increased' : 'decreased'
      addAlert({
        type: 'success',
        title: 'Balance Updated',
        message: `Balance ${action} by $${parseFloat(addedBalance, 2)}.`
      })
    } catch (error) {
      addAlert({
        type: 'error',
        title: 'Error',
        message: 'Error updating balance.'
      })
      console.error('Error updating balance:', error)
    }
  }

  useEffect(() => {
    if (!user) {
      setBalance(0)
      return
    }
    const balanceRef = doc(db, 'balance', user.uid)
    const unsubscribe = onSnapshot(
      balanceRef,
      snapshot => {
        if (snapshot.exists()) {
          setBalance(snapshot.data().money || 0)
        } else {
          setBalance(0)
        }
      },
      error => {
        console.error('Error listening to balance updates:', error)
        setBalance(0)
      }
    )
    return () => unsubscribe()
  }, [user])

  /**
   * Sends a password reset email to the specified address.
   *
   * @param {string} email - The email address to send the reset link to
   * @returns {Promise<void>}
   */
  const resetPassword = async email => {
    try {
      await sendPasswordResetEmail(auth, email)
      if (typeof addAlert === 'function') {
        addAlert({
          type: 'success',
          title: 'Reset Email Sent',
          message: `A password reset email has been sent to ${email}.`
        })
      }
    } catch (error) {
      if (typeof addAlert === 'function') {
        addAlert({
          type: 'error',
          title: 'Reset Failed',
          message: error.message || 'Failed to send reset email.'
        })
      }
      console.error('Error sending password reset email:', error)
      throw error
    }
  }

  /**
   * Handles the forgot password action by validating the email and
   * calling resetPassword from context.
   *
   * @param {string} email - The email address to reset password for
   * @returns {Promise<void>}
   */
  const handleForgotPassword = async email => {
    console.log
    try {
      await resetPassword(email)
    } catch (error) {
      if (typeof addAlert === 'function') {
        addAlert({
          type: 'error',
          title: 'Reset Failed',
          message: error.message || 'Failed to send reset email.'
        })
      }
      console.error('Error in handleForgotPassword:', error)
      throw error
    }
  }

  /**
   * Uploads a file to Firebase Storage and returns the download URL.
   *
   * @param {File} file - The file to upload
   * @param {string} userId - The user's UID
   * @returns {Promise<string>} The download URL
   */
  const uploadProfilePicture = async (file, userId) => {
    if (!file || !userId) {
      throw new Error('File and userId are required for upload')
    }
    const fileRef = storageRef(storage, `profilePictures/${userId}/${file.name}`)
    await uploadBytes(fileRef, file)
    console.log('File uploaded successfully:', getDownloadURL(fileRef))
    console.log(getDownloadURL(fileRef))
    return await getDownloadURL(fileRef)
  }

  /**
   * Updates the user's profile in Firebase Auth only (not Firestore).
   *
   * @param {Object} updates - The profile fields to update
   * @param {string} [updates.displayName] - The new display name
   * @param {string} [updates.email] - The new email address
   * @param {string} [updates.phoneNumber] - The new phone number (ignored)
   * @param {string} [updates.photoURL] - The new profile picture URL
   * @param {File} [updates.profilePictureFile] - The new profile picture file
   * @returns {Promise<void>} Resolves when the update is complete
   */
  const updateUserProfile = async updates => {
    setIsAuthLoading(true)
    try {
      if (!auth.currentUser) {
        throw new Error('No authenticated user found.')
      }
      let photoURL = updates.photoURL
      if (updates.profilePictureFile) {
        console.log('Uploading profile picture...')
        photoURL = await uploadProfilePicture(updates.profilePictureFile, auth.currentUser.uid)
      }
      const { displayName, email, phoneNumber } = updates
      if (displayName || photoURL) {
        await updateProfile(auth.currentUser, {
          displayName,
          photoURL,
        })
      }
      if (email && email !== auth.currentUser.email) {
        await updateEmail(auth.currentUser, email)
      }
      if (phoneNumber && phoneNumber !== auth.currentUser.phoneNumber) {
        await updatePhoneNumber(auth.currentUser, phoneNumber)
      }
      await reload(auth.currentUser)
      setUser({ ...auth.currentUser })
    } catch (error) {
      console.error('Error updating user profile:', error)
      throw new Error('Error updating user profile')
    } finally {
      setIsAuthLoading(false)
    }
  }

  const applyTutor = async () => {
    try {
      // check custom claims to see if user.claims?.isTutor
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
    } catch {
      addAlert({
        type: 'info',
        title: 'Error',
        message: 'There was an error applying to be a tutor.',
      })
    }
  }

  /**
   * Deletes the current user's account from Firebase Auth.
   * Handles errors, including re-authentication requirements.
   *
   * @returns {Promise<'success' | 'reauth-required' | 'error'>} Result status
   */
  const deleteAccount = async () => {
    try {
      if (!auth.currentUser) {
        if (typeof addAlert === 'function') {
          addAlert({
            message: 'No user is currently signed in',
            type: 'error',
          })
        }
        return 'error'
      }
      await auth.currentUser.delete()
      if (typeof addAlert === 'function') {
        addAlert({
          message: 'Account deleted successfully',
          type: 'success',
        })
      }
      return 'success'
    } catch (error) {
      if (
        error.code === 'auth/requires-recent-login' ||
        error.message?.includes('recent')
      ) {
        if (typeof addAlert === 'function') {
          addAlert({
            message:
              'Please sign in again to delete your account for security reasons.',
            type: 'error',
          })
        }
        return 'reauth-required'
      } else {
        if (typeof addAlert === 'function') {
          addAlert({
            message: 'Failed to delete account: ' + error.message,
            type: 'error',
          })
        }
        console.error('Error deleting account:', error)
        return 'error'
      }
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthLoading,
        isCheckingEmailVerification,
        balance,
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
        resetPassword,
        handleForgotPassword,
        updateUserProfile,
        deleteAccount,
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
