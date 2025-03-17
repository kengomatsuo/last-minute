import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom"

const Auth = () => {
  const location = useLocation();

  // location state is used to determine the action (signin or register)
  const [action, setAction] = useState(location.state?.action || "signin");

  return (
    <motion.div
      className="flex flex-col flex-1 items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0 }}
    >

      {/* Semangt je :D */}

    </motion.div>
  );
};

export default Auth;
