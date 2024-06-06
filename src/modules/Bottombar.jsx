import { RiHome5Fill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const bottombarLinks = [
  {
    label: "Home",
    route: "/",
    icon: <RiHome5Fill size={20}></RiHome5Fill>,
  },
  {
    label: "Team",
    route: "/user-profile/members",
    icon: <FaUsers size={20}></FaUsers>,
  },
  {
    label: "Assets",
    route: "/asset",
    icon: <FaWallet size={20}></FaWallet>,
  },
  {
    label: "Profile",
    route: "/user-profile",
    icon: <FaUser size={20}></FaUser>,
  },
];

export default function Bottombar() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("User"));
  const isAdmin = location.pathname.startsWith("/admin");
  return (
    <div className="flex bg-slate-200 items-center justify-between sticky bottom-0 px-4">
      {bottombarLinks.map((item) => {
        const isActive = location.pathname === item.route;
        return (
          <Link
            key={item.label}
            to={item.route}
            className={`flex flex-col items-center text-black hover:text-slate-700 transition-all duration-200 p-3 ${
              isActive && "border-b-8 border-slate-900 bg-slate-400"
            }`}
          >
            {item.icon}
            <p className="text-sm">{item.label}</p>
          </Link>
        );
      })}

      {user.accountType === "Admin" && (
        <Link
          to="/admin"
          className={`flex flex-col items-center text-black hover:text-slate-700 transition-all duration-200 p-3 ${
            isAdmin && "border-b-8 border-slate-900 bg-slate-400"
          }`}
        >
          <MdSpaceDashboard size={20}></MdSpaceDashboard>
          <p>Admin</p>
        </Link>
      )}
    </div>
  );
}
