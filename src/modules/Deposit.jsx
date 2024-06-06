/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Nav from "../component/Nav";
import axios from "axios";

const Deposit = () => {
  const [Amount, setAmount] = useState(0);
  const [amountS, setAmountS] = useState();
  const handleInputChange = (e) => {
    console.log(Amount);
    setAmount(e.target.value);
    console.log(amountS);
  };

  const fetchAmountSetup = async () => {
    await axios
      .get(
        "https://kdm-money-server.onrender.com/api/v1/auth/fetch-amount-details"
      )
      .then((res) => {
        setAmountS(res.data.amountsDetails);
        console.log(res.data.amountsDetails);
      });
  };

  const accountNumber = "23100001002637";
  const IFSCcode = "FSFB0000001";

  const withdrawAmmount = async () => {
    console.log(Amount);
    await axios
      .post(
        `https://apihome.in/panel/api/payout/?key=e723c7f472225f0ec06f2f470b3f336374156&account=${accountNumber}&ifsc=${IFSCcode}&amount=${Amount}`
      )
      .then((res) => {
        console.log(res);
        const Unique = Math.floor(Math.random() * 1000) + Date.now();
        axios
          .post(
            `https://apihome.in/panel/api/payin_intent/?key=YOUR API KEY&amount=COLLECTION 
        AMOUNT&reqid=UNIQUE NUMBER&rdrct=https://sspports.xyz`
          )
          .then((res) => {
            console.log(res.data);
          });
      });
  };

  const user = JSON.parse(localStorage.getItem("User"));
  useEffect(() => {
    fetchAmountSetup();
  }, []);
  return (
    <div className="w-full min-h-screen bg-[#121212] text-white">
      <Nav balance={user.withrawalAmount} />
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

          <button
            className="w-[45%] p-2 mt-4 bg-[#EF4444]"
            onClick={withdrawAmmount}
          >
            Deposit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
