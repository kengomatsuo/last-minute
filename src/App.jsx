import { Route, Routes } from "react-router-dom";
import Landing from "./screens/Landing";
import CustomNavBar from "./components/CustomNavBar";
import Auth from "./screens/auth";
import Error404 from "./screens/Error404";
import { ScreenContextProvider } from "./contexts/ScreenContext";
import { useContext, useRef } from "react";
import { UserContext } from "./contexts/UserContext";

function App() {
  const { user } = useContext(UserContext);
  const scrollContainerRef = useRef(null);

  return (
    <div className="w-screen h-screen overflow-hidden flex-col flex text-primary-text">
      <ScreenContextProvider>
        <CustomNavBar scrollContainerRef={scrollContainerRef} />
        <div ref={scrollContainerRef} className="overflow-y-scroll">
          <Routes>
            <Route path="/" element={<Landing />} />
            {user ? (
              <Route path="/dashboard" element={<div>Dashboard</div>} />
            ) : (
              <Route path="/auth" element={<Auth />} />
            )}
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      </ScreenContextProvider>
    </div>
  );
}

export default App;
