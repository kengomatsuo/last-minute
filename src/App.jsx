import { Route, Routes } from "react-router-dom"
import Landing from "./screens/Landing"
import CustomNavBar from "./components/CustomNavBar"
import Login from "./screens/Login"
import Error404 from "./screens/Error404"

function App() {
  return (
    <div className="w-screen min-h-screen flex-col flex text-primary-text">
      <CustomNavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
