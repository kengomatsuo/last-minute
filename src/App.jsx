import ket from "./assets/ket.png";
import CustomButton from "./components/CustomButton";

function App() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center p-4 bg-background text-primary-text">
      <div className="flex flex-col items-center justify-center">
        {/* Import image of ket.png from assets */}
        <img src={ket} width={100} alt="Ket" style={{ filter: "invert(1)" }} />
        <h1>Last Minute</h1>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p>Your courses. At your demand.</p>
        <CustomButton text="click me" onClick={null} />
      </div>
    </div>
  );
}

export default App;
