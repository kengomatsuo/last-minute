import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomButton from "./CustomButton";
import { NavLink } from "react-router-dom";
import { ScreenContext } from "../contexts/ScreenContext";
import CustomHyperlink from "./CustomHyperlink";
import MenuBurger from "../assets/icons/menu-burger.svg?react";

const CustomNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSmallScreen } = useContext(ScreenContext);

  useEffect(() => {
    if (isSmallScreen) {
      setIsMenuOpen(false);
    }
  }, [isSmallScreen]);

  const navigationPaths = [
    { name: "Link", path: "/1" },
    { name: "Link", path: "/2" },
    { name: "Link", path: "/3" },
  ];

  return (
    <div className="sticky top-0 flex justify-between w-full py-4 px-6">
      <div className="flex items-center text-2xl justify-start max-md:flex-1">
        <NavLink to={"/"} className="font-semibold text-nowrap">
          Last Minute
        </NavLink>
      </div>

      {isSmallScreen ? (
        <>
          <CustomHyperlink
            className="w-min aspect-square flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <MenuBurger width={24} height={24} />
          </CustomHyperlink>

          {/* Animate Presence for smooth entry and exit */}
          <AnimatePresence>
            {isMenuOpen && (
              <>
                <motion.div
                  className="absolute top-0 left-0 w-screen h-screen bg-background-secondary/25"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMenuOpen(false)}
                />

                <motion.div
                  className="w-72 max-w-4/5 fixed top-0 text-end flex flex-col gap-1 px-6 py-4 right-0 h-screen bg-background"
                  initial={{
                    x: "100%",
                    boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0)",
                  }}
                  animate={{
                    x: 0,
                    boxShadow: "3px 0px 10px 2px rgba(0, 0, 0, 0.1)",
                  }}
                  exit={{
                    x: "100%",
                    boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    mass: 0.5,
                  }}
                >
                  <CustomHyperlink
                    className="w-min aspect-square flex items-center justify-center ml-auto"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <MenuBurger width={24} height={24} />
                  </CustomHyperlink>

                    <NavLink to={"/"} className="flex">
                      <CustomButton>Register</CustomButton>
                    </NavLink>
                    <NavLink to={"/login"} className="flex">
                      <CustomButton filled>Login</CustomButton>
                    </NavLink>

                  <p className="text-lg font-semibold mt-2 mr-3">Navigation</p>

                  {navigationPaths.map((navPath) => (
                    <NavLink
                      key={navPath.path}
                      to={navPath.path}
                      className={({ isActive }) =>
                        isActive
                          ? "underline underline-offset-4 underline-primary"
                          : undefined
                      }
                    >
                      <CustomHyperlink className="text-right block py-2">
                        {navPath.name}
                      </CustomHyperlink>
                    </NavLink>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      ) : (
        <div className="text-lg font-medium items-center inline-flex top-0 py-0 gap-4">
          <div className="inline-flex gap-2">
            {navigationPaths.map((navPath) => (
              <NavLink
                key={navPath.path}
                to={navPath.path}
                className={({ isActive }) =>
                  isActive
                    ? "underline underline-offset-4 underline-primary"
                    : undefined
                }
              >
                <CustomHyperlink>{navPath.name}</CustomHyperlink>
              </NavLink>
            ))}
          </div>

          <div className="flex gap-2 flex-row min-w-50">
            <NavLink to={"/"} className="flex-1 flex">
              <CustomButton>Register</CustomButton>
            </NavLink>
            <NavLink to={"/login"} className="flex-1 flex">
              <CustomButton filled>Login</CustomButton>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomNavBar;
