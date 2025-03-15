import ket from "../assets/ket.png";
import CustomButton from "../components/CustomButton";

const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center text-primary-text">
      <div className="flex flex-col items-center justify-center">
        <img src={ket} width={100} alt="Ket" style={{ filter: "invert(1)" }} />
        <h1>Last Minute</h1>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p>Your courses. At your demand.</p>
        <CustomButton text="click me" onClick={null} />
      </div>
    </div>
  )
}

export default Landing
