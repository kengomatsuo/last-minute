import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth"; // Import Firebase auth functions
import { app, auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

/**
 * @typedef {Object} UserContextType
 * @property {import("firebase/auth").User | null} user - The current authenticated user.
 * @property {(userDetails: { email: string; password: string }) => Promise<void>} signUp - Function to sign up a new user.
 * @property {(credentials: { email: string; password: string }) => Promise<void>} signIn - Function to sign in an existing user.
 * @property {() => Promise<void>} signOut - Function to sign out the current user.
 */

/** @type {UserContextType} */
const defaultContext = {
  user: null,
  signUp: async () => Promise.resolve(),
  signIn: async () => Promise.resolve(),
  signOut: async () => Promise.resolve(),
};

/** @type {import("react").Context<UserContextType>} */
const UserContext = createContext(defaultContext);

const UserContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  /**
   * Signs up a new user.
   * @param {{ email: string; password: string }} userDetails
   * @returns {Promise<void>}
   */
  const signUp = async ({ email, password }) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Signed up successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  /**
   * Signs in an existing user.
   * @param {{ email: string; password: string }} credentials
   * @returns {Promise<void>}
   */
  const signIn = async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Signed in successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  /**
   * Signs out the current user.
   * @returns {Promise<void>}
   */
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      console.log("Signed out successfully!");
      navigate("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    const authInstance = getAuth(app);
    const unsubscribe = onAuthStateChanged(authInstance, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, signUp, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserContextProvider, UserContext };
