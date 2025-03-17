import ket from "../assets/ket.png";
import CustomButton from "../components/CustomButton";
import { motion } from "framer-motion";
import FAQ from "./FAQ"

const Landing = () => {

  return (
    <motion.div
    className="flex flex-col flex-1 items-center w-screen justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0 }}
    >


      {/* Clear everything between these comments to start fresh */}
        <div className="flex flex-col items-center justify-center">
          <img src={ket} width={100} alt="Ket" />
          <h1>Last Minute</h1>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p>Your courses. At your demand.</p>
          <CustomButton onClick={null}>I am a button</CustomButton>
        </div>
      {/* Clear everything between these comments to start fresh */}

      {/* bagian FAQ kerjain di file FAQ.jsx */}
      <FAQ />

    </motion.div>
  );
};

export default Landing;
