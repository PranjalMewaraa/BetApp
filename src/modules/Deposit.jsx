/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Nav from "../component/Nav";
import axios from "axios";

const Deposit = () => {
  const [Amount, setAmount] = useState(0);
  const [amountS, setAmountS] = useState();
  const [jsonResponse, setJsonResponse] = useState("");

  const handleInputChange = (e) => {
    setAmount(e.target.value);
  };

  const fetchAmountSetup = async () => {
    try {
      const res = await axios.get(
        "https://kdm-money-server.onrender.com/api/v1/auth/fetch-amount-details"
      );
      setAmountS(res.data.amountsDetails);
      console.log(res.data.amountsDetails);
    } catch (error) {
      console.error("Error fetching amount details:", error);
    }
  };

  const generateUniqueId = () => {
    const baseId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    return baseId.slice(0, 20);
  };

  const getJson = async () => {
    try {
      const uniqueId = generateUniqueId();
      const resExternal = await axios.get(
        `https://apihome.in/panel/api/payin_intent/?key=9be4fb91637e6defbee72f3b4923687949099&amount=${Amount}&reqid=${uniqueId}&rdrct=https://sspports.xyz/`
      );

      const responseDataExternal = resExternal.data;
      setJsonResponse(JSON.stringify(responseDataExternal, null, 2));
      console.log(responseDataExternal);

      if (responseDataExternal.status === "Success") {
        updateUserBalance(Amount);
        window.location.href = responseDataExternal.payurl;
      } else {
        alert(responseDataExternal.remark);
      }
    } catch (error) {
      console.error("Error fetching JSON response:", error);
      setJsonResponse("An error occurred. Please try again.");
    }
  };

  const updateUserBalance = async (amount) => {
    try {
      const user = JSON.parse(localStorage.getItem("User"));
      const newBalance = user.withrawalAmount + parseFloat(amount);
      user.withrawalAmount = newBalance;
      localStorage.setItem("User", JSON.stringify(user));

      // Call your internal server to update the user's balance
      await axios.post(
        "https://kdm-money-server.onrender.com/api/v1/payment/pay-process",
        { amount }
      );

      alert("Balance updated successfully!");
    } catch (error) {
      console.error("Error updating user balance:", error);
    }
  };

  useEffect(() => {
    fetchAmountSetup();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#121212] text-white">
      <Nav balance={JSON.parse(localStorage.getItem("User")).withrawalAmount} />
      <div className="w-full p-10 flex flex-col gap-4">
        <p className="font-[neu] text-4xl w-full flex items-center">
          Amount Setup
        </p>
        <div className="flex flex-col gap-4 justify-between flex-wrap mt-5 w-full">
          <div className="flex flex-col w-full gap-2 md:w-[45%] items-start">
            <label htmlFor={""}>{"Enter Recharge Amount"}</label>
            <input
              className="w-full py-2 px-4 bg-gray-100 text-black rounded-md"
              type="number"
              name={"Deposit Amount"}
              min={0}
              placeholder={600}
              onChange={handleInputChange}
            />
          </div>

          <button className="w-[45%] p-2 mt-4 bg-[#EF4444]" onClick={getJson}>
            Deposit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
