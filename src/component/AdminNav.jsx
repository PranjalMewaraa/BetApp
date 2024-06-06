import { Link } from "react-router-dom";
import log from "../../public/1714553082803.png";
const NavA = () => {
  return (
    <div className="w-full h-12 flex justify-between my-4 items-center">
      <p className="ml-4  text-5xl flex h-full items-center text-red-600 font-[founder]">
        <span className="h-full mr-5">
          <img src={log} alt="" className="h-full" />
        </span>
        SSP Ports
      </p>
      <div className="h-[95%] flex gap-8 items-center">
        <ul className="w-fit flex gap-3 items-center pr-4">
          <Link
            to={"/admin"}
            className="text-slate-300 text-sm hover:bg-slate-700 hover:text-white transition-all duration-200 border px-2 py-2 rounded-md bg-slate-800 border-slate-500"
          >
            Dashboard
          </Link>
          <Link
            to={"/admin/amount"}
            className="text-slate-300 text-sm hover:bg-slate-700 hover:text-white transition-all duration-200 border px-2 py-2 rounded-md bg-slate-800 border-slate-500"
          >
            Amount Setup
          </Link>
          <Link
            to={"/admin/products"}
            className="text-slate-300 text-sm hover:bg-slate-700 hover:text-white transition-all duration-200 border px-2 py-2 rounded-md bg-slate-800 border-slate-500"
          >
            Products Setup
          </Link>
          <Link
            to={"/admin/withdraw-request"}
            className="text-slate-300 text-sm hover:bg-slate-700 hover:text-white transition-all duration-200 border px-2 py-2 rounded-md bg-slate-800 border-slate-500"
          >
            Withdrawal Request
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default NavA;
