import { Route, Routes, useLocation } from "react-router-dom";
import Landing from "./screens/Landing";
import CustomNavBar from "./components/CustomNavBar";
import Auth from "./screens/auth";
import Error404 from "./screens/Error404";
import { ScreenContextProvider } from "./contexts/ScreenContext";
import { useContext, useRef } from "react";
import { UserContext } from "./contexts/UserContext";
import { AnimatePresence } from "framer-motion";

function App() {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const scrollContainerRef = useRef(null);

  return (
    <div className="w-screen h-screen overflow-hidden flex-col flex text-primary-text">
      <ScreenContextProvider>
        <CustomNavBar scrollContainerRef={scrollContainerRef} />
        <div ref={scrollContainerRef} className="overflow-y-auto h-screen flex">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Landing />} />
              {user ? (
                <Route path="/dashboard" element={<div>Dashboard</div>} />
              ) : (
                <Route path="/auth" element={<Auth />} />
              )}
              <Route path="*" element={<Error404 />} />
            </Routes>
          </AnimatePresence>
        </div>
      </ScreenContextProvider>
    </div>
  );
}

export default App;
