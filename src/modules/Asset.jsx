import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../component/Nav";

export default function Asset() {
  const navigate = useNavigate();
  const [rechargeHistory, setrechargeHistory] = useState("");
  const [withdrawHistory, setWithdrawHistory] = useState("");

  const userNew = JSON.parse(localStorage.getItem("User"));

  const fetchWithdrawData = async () => {
    try {
      // const response = await axios.get("http://localhost:5001/withdrawdata");
      setWithdrawHistory(userNew?.withdrawalHistry);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchRechargeData = async () => {
    try {
      const response = await axios.get(
        "https://kdm-money-server.onrender.com/api/v1/auth/user-details"
      );
      setrechargeHistory(response?.data.user.paymmentHistory);
      console.log(userNew.paymmentHistory);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  function convertToIST(utcTimestamp) {
    // Parse the input timestamp to a Date object
    const date = new Date(utcTimestamp);

    // Get the UTC time in milliseconds
    const utcTime = date.getTime();

    // IST is 5 hours and 30 minutes ahead of UTC
    const istOffset = 5.5 * 60 * 60 * 1000;

    // Calculate the IST time
    const istTime = new Date(utcTime);

    // Format the date and time
    const istDateString = istTime.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    return istDateString;
  }
  useEffect(() => {
    fetchRechargeData();
    fetchWithdrawData();
  }, []);
  return (
    <div className="assetContainer bg-[#121212] text-white mt-10">
      <button
        className="RechargeBtn"
        onClick={() => navigate("/home/action/deposit")}
      >
        Recharge
      </button>
      <button
        className="withdrawBtn"
        onClick={() => navigate("/home/action/withdraw")}
      >
        Withdraw
      </button>
      <div className="rechHistory">
        <h2 id="rechargeHead" className="text-white">
          Recharge History
        </h2>

        {rechargeHistory.length === 0 ? (
          <p id="emptyRecharge" className="text-white">
            No history yet.
          </p>
        ) : (
          <>
            {rechargeHistory.map((item, index) => (
              <div className="childRecharge" key={index}>
                <div>
                  <div id="rechargeHeading">{item.Heading}</div>
                </div>
                <div className="w-full">
                  <div className="flex justify-between w-full">
                    <b>TXN ID - {item._id}</b>
                    <b> TXN RS - {item.amount}</b>
                    <b>{convertToIST(item.createdAt)}</b>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="rechHistory">
        <h2 id="rechargeHead" className="text-white">
          Withdraw History
        </h2>

        {withdrawHistory.length === 0 ? (
          <p id="emptyRecharge" className="text-white">
            No history yet.
          </p>
        ) : (
          <>
            {withdrawHistory.map((item, index) => (
              <div className="childRecharge" key={index}>
                <div>
                  <div id="rechargeHeading">{item.Heading}</div>
                </div>
                <div>
                  <div>
                    <b>Rs.{item.Cart}</b>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
