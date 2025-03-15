import { useState } from "react";
import CustomButton from "./CustomButton";
import { NavLink } from "react-router-dom";

const CustomNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative z-10 top-0 flex justify-between w-full p-4 text-primary-text">
      {/* Logo */}
      <div className="flex items-center text-2xl max-sm:flex-1">
        <NavLink to={"/"} className="font-semibold text-nowrap">
          Last Minute
        </NavLink>
      </div>

      <div className="max-sm:flex hidden items-center">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-4xl transition-transform duration-300 ease-in-out"
        >
          {isMenuOpen ? "✖" : "☰"}
        </button>
      </div>

      <div
        className={`max-sm:absolute z-10 max-sm:top-full max-sm:right-0 max-sm:flex-col max-sm:bg-background max-sm:shadow-lg max-sm:rounded-bl-xl max-sm:p-10
          text-lg font-medium flex md:relative top-0 flex-row gap-8 justify-end bg-transparent items-center 
            ${
            isMenuOpen ? "max-sm:translate-x-0" : "max-sm:-translate-x-[-100%]"
          }`}
      >
        <NavLink to={"/about"}>About</NavLink>
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/contact"}>Contact</NavLink>
        <div className="flex gap-2 max-sm:flex-col flex-row">
          <NavLink to={"/"}>
            <CustomButton text="Learn More" />
          </NavLink>
          <NavLink to={"/login"}>
            <CustomButton filled text="Login" />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default CustomNavBar;
