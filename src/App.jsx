import ket from "./assets/ket.png";
import "./App.css";

function App() {
  return (
    <>
      <div className="header">
        {/* Import image of ket.png from assets */}
        <img src={ket} width={100} alt="Ket" style={{ filter: "invert(1)" }} />
        <h1 style={{marginTop: -9}}>Last Minute</h1>
      </div>
      <div className="card">
        <p>Initialized main page for the Last Minute project.</p>
      </div>
    </>
  );
}

export default App;
