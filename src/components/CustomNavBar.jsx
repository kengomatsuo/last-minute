import { useContext, useState } from "react";
import CustomButton from "./CustomButton";
import { NavLink } from "react-router-dom";
import { ScreenContext } from "../contexts/ScreenContext";
import CustomHyperlink from "./CustomHyperlink";
import MenuBurger from "../assets/icons/menu-burger.svg?react";

const CustomNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSmallScreen } = useContext(ScreenContext);

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
          {isMenuOpen ? (
            <>
              <div className="absolute top-0 left-0 w-screen h-screen bg-background/75" />
              <div className="w-72 max-w-4/5 fixed top-0 text-end gap-2 px-6 py-4 right-0 h-screen bg-background shadow-[-2px_0px_6px_0px_rgba(0,_0,_0,_0.1)]">
                <CustomHyperlink
                  className="w-min aspect-square flex items-center justify-center ml-auto"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <MenuBurger width={24} height={24} />
                </CustomHyperlink>
                Navigation
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
                    <CustomHyperlink className="text-right">
                      {navPath.name}
                    </CustomHyperlink>
                  </NavLink>
                ))}
              </div>
            </>
          ) : null}
        </>
      ) : (
        <div
          className={
            "text-lg font-medium items-center inline-flex top-0 py-0 gap-4"
          }
        >
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

          <div className="flex gap-2 max-md:flex-col flex-row min-w-50">
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
