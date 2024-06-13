/* eslint-disable react/prop-types */
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import log from "../../public/1714553082803.png";

const Nav = (props) => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const logout = () => {
    setToken();
    navigate("/", { replace: true });
  };

  return (
    <div className="w-full h-auto md:h-12 flex flex-wrap justify-between my-4 items-center">
      <p className="ml-4 text-5xl flex h-full items-center text-red-600 text-[4vw] md:text-xl font-[founder]">
        <span className="h-full mr-4">
          <img src={log} alt="" className="md:h-full max-h-20" />
        </span>
        SSP Ports..
      </p>
      <div className="h-[95%] md:h-auto flex gap-4 md:gap-8 items-center mr-4 md:mr-8 ml-4 md:ml-8">
        <span className="hidden md:inline-block text-red-600">BALANCE:</span>
        <span className="w-fit px-2 py-2 bg-white-200 text-red-600 rounded">
          Rs. {props.balance}
        </span>
        <button className="bg-red-500" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Nav;
