import { Route, Routes, useLocation } from "react-router-dom";
import Landing from "./screens/Landing";
import CustomNavBar from "./components/CustomNavBar";
import Auth from "./screens/auth";
import Error404 from "./screens/Error404";
import { ScreenContextProvider } from "./contexts/ScreenContext";
import { useContext, useRef } from "react";
import { UserContext } from "./contexts/UserContext";
import { AnimatePresence } from "framer-motion";
import Dashboard from "./screens/Dashboard";
import Booking from "./screens/Booking";
import Session from "./screens/Session";
import Settings from "./screens/Settings";

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
              <Route path="/" element={user ? <Dashboard /> : <Landing />} />

              {user ? (
                <>
                  <Route path="/booking" element={<Booking />} />
                  <Route path="/session" element={<Session />} />
                  <Route path="/settings" element={<Settings />} />
                </>
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
