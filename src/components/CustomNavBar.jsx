import CustomButton from "./CustomButton";
import { NavLink, useNavigate } from "react-router-dom";

const CustomNavBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="top-0 flex justify-between w-full p-4 text-primary-text">
      <div className="flex items-center text-2xl">
        <NavLink to={"/"} className="font-semibold">
          Last Minute
        </NavLink>
      </div>
      <div className="flex items-center gap-8 text-lg font-medium">
        <NavLink to={"/about"}>About</NavLink>
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/contact"}>Contact</NavLink>
        <div className="flex gap-2">
          <NavLink to={'/'}>
            <CustomButton text="Learn More" />
          </NavLink>
          <NavLink to={'login'}>
            <CustomButton
              filled
              text="Login"
            />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default CustomNavBar;
