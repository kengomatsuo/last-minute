import ket from "../assets/ket.png";
import CustomButton from "../components/CustomButton";

const Landing = () => {
  return (
    // Clear everything between these comments to start fresh

    <div className="flex flex-col items-center justify-center text-primary-text h-screen">
      <div className="flex flex-col items-center justify-center">
        <img src={ket} width={100} alt="Ket" />
        <h1>Last Minute</h1>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p>Your courses. At your demand.</p>
        <CustomButton text="click me" onClick={null} />
      </div>
    </div>
    
    // Clear everything between these comments to start fresh
  )
}

export default Landing
