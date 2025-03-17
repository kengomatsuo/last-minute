import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import { UserContext } from "../contexts/UserContext";

const Auth = () => {
  const location = useLocation();
  const { signIn, signUp } = useContext(UserContext);

  // location state is used to determine the action (signin or register)
  const [action, setAction] = useState(location.state?.action || "signin");

  const handleSignin = async () => {
    await signIn({email: "admin@admin.com", password: "admin123"});
  };

  const handleSignup = async () => {
    await signUp({username: "", email: "", password: ""})
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
      <CustomButton onClick={() => handleSignin()}>Login</CustomButton>
    </motion.div>
  );
};

export default Auth;
