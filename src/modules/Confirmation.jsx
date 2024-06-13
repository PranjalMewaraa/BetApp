import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Confirmation = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const [isLoading, setIsLoading] = useState(false);
  // Create a URLSearchParams object from the query string

  const updatebalance = async (amount) => {
    try {
      setIsLoading(true);
      const user = JSON.parse(localStorage.getItem("User"));
      const newBalance = user.withrawalAmount + parseFloat(amount);
      user.withrawalAmount = newBalance;
      localStorage.setItem("User", JSON.stringify(user));
      const token = localStorage.getItem("token");
      console.log(localStorage.getItem("token"));
      var x = Number(amount);
      console.log("adding Balance");
      const requestData = { amount: x };
      // Call your internal server to update the user's balance
      await axios.post(
        "https://kdm-money-server.onrender.com/api/v1/payment/pay-process",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.removeItem("Amount");

      alert("Balance updated successfully!");
    } catch (error) {
      console.error("Error updating user balance:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (urlParams !== undefined) {
      if (urlParams?.get("status") === "SUCCESS") {
        if (localStorage.getItem("Amount") !== null) {
          console.log(urlParams?.get("status"));
          isLoading === false
            ? updatebalance(localStorage.getItem("Amount"))
            : console.log("alreadyRunning");
        }
      }
    }
  }, []);

  return (
    <div className="w-full h-full min-h-screen flex justify-center items-center flex-col gap-4 bg-[#121212]">
      <div className="text-[6vw]">
        Payment Status = {urlParams?.get("status")}
      </div>
      <button className="bg-red-500">
        {" "}
        <Link to={"/home"} className="text-white">
          Go To Home
        </Link>
      </button>
    </div>
  );
};

export default Confirmation;
