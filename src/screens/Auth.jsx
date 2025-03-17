import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom"
import CustomButton from "../components/CustomButton";
import { signInAnonymously, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebaseConfig"

const Auth = () => {
  const location = useLocation();

  const navigate = useNavigate();

  // location state is used to determine the action (signin or register)
  const [action, setAction] = useState(location.state?.action || "signin");

  const handleAuth = async () => {
    // login as guest user using firebase
    console.log("Signing in anonymously...");
    await signInWithEmailAndPassword(auth, "admin@admin.com", "admin123")
      .then(() => {
        // redirect to home page
        console.log("Signed in anonymously successfully!");
        navigate("/");
      })
      .catch((error) => {
        // handle error
        console.error("Error signing in anonymously:", error);
      });
  }

  return (
    <motion.div
      className="flex flex-col flex-1 items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0 }}
    >

      {/* Semangt je :D */}
      auth
      <CustomButton onClick={() => handleAuth()}>Login</CustomButton>

    </motion.div>
  );
};

export default Auth;
