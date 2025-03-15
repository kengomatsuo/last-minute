import { useState } from "react";
import CustomButton from "./CustomButton";
import { NavLink } from "react-router-dom";

const CustomNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // when window is resized, close the menu
  window.addEventListener("resize", () => {
    setIsMenuOpen(false);
  }
  );

  return (
    <nav className="sticky top-0 flex justify-between w-full py-4 px-6">
      <div className="flex items-center text-2xl justify-start max-md:flex-1 max-md:justify-center">
        <NavLink to={"/"} className="font-semibold text-nowrap">
          Last Minute
        </NavLink>
      </div>

      <div className="max-md:flex hidden items-center justify-center">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-4xl transition-transform duration-300 ease-in-out"
        >
          ☰
        </button>
      </div>

      <div
        className={`max-md:flex-col max-md:absolute max-md:left-full max-md:py-8 
          max-md:px-8 max-md:rounded-lg max-md:h-fit max-md:top-[120%] max-md:gap-6
          max-md:justify-start max-md:bg-background max-md:shadow-[0px_2px_15px_0px_rgba(0,_0,_0,_0.1)]
          max-md:transition-all max-md:duration-300 max-md:ease-in-out
          ${isMenuOpen ? "max-md:-translate-x-[110%]" : "max-md:translate-x-0 max-md:shadow-none"}
          text-lg font-medium flex top-0 flex-row gap-8 justify-end bg-transparent items-center`}
      >
        <NavLink className={({isActive}) => isActive && "underline underline-offset-4"} to={"/about"}>About</NavLink>
        <NavLink className={({isActive}) => isActive && "underline underline-offset-4"} to={"/"}>Home</NavLink>
        <NavLink className={({isActive}) => isActive && "underline underline-offset-4"} to={"/contact"}>Contact</NavLink>
        <div className="flex gap-2 max-md:flex-col flex-row min-w-50">
          <NavLink to={"/"} className="flex-1 flex">
            <CustomButton text="Register"/>
          </NavLink>
          <NavLink to={"/login"} className="flex-1 flex">
            <CustomButton filled text="Login" />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default CustomNavBar;
