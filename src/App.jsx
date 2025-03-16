import { Route, Routes } from "react-router-dom";
import Landing from "./screens/Landing";
import CustomNavBar from "./components/CustomNavBar";
import Auth from "./screens/auth";
import Error404 from "./screens/Error404";

function App() {
  return (
    <div className="w-screen h-screen overflow-hidden flex-col flex text-primary-text">
      <CustomNavBar />
      <div className="overflow-y-scroll">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
