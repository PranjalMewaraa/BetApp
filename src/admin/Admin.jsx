import CardAdmin from "../component/CardAdmin";
import NavA from "../component/AdminNav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Admin = () => {
  const [user, setUser] = useState([]);
  const [Nouser, setNoUser] = useState();
  const navigate = useNavigate();
  const getUser = () => {
    axios.interceptors.request.use(
      (config) => {
        const authToken = localStorage.getItem("token");
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    axios
      .get("https://kdm-money-server.onrender.com/api/v1/admin/get-allusers")
      .then((res) => {
        setUser(res.data.users);
      });
  };

  useEffect(() => {
    getUser();
    setNoUser(user.length);
  }, [user]);

  const handleUserClick = () => {
    navigate("/admin/user-detail");
  };
  const navigatePayment = () => {
    navigate("/admin/payment");
  };

  return (
    <div className="w-full min-h-screen">
      <NavA balance={0} />
      <div className="w-full p-10 flex flex-col gap-4">
        <p className="font-[neu] text-4xl w-full flex items-center">
          Admin Dashboard{" "}
        </p>
        <div className="flex justify-evenly gap-y-8 flex-wrap mt-5 w-full">
          <CardAdmin
            title={"Total Users Join"}
            num={Nouser}
            onClick={handleUserClick}
          />
          <CardAdmin title={"Today's Recharge"} onClick={navigatePayment} />
          <CardAdmin title={"Today's Withdrawl"} onClick={navigatePayment} />
          <CardAdmin
            title={"Total Users"}
            num={Nouser}
            onClick={handleUserClick}
          />
          <CardAdmin title={"Total Withdrawl"} onClick={navigatePayment} />
          {/* <CardAdmin title={"Today's Total Bet"} />
          <CardAdmin title={"Today's Total Win"} /> */}
        </div>
      </div>
    </div>
  );
};

export default Admin;
