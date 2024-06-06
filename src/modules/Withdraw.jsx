import { useEffect, useState } from "react";
import Nav from "../component/Nav";
import axios from "axios";
import InputBox from "../component/InputBox";
const Withdraw = () => {
  const [Amount, setAmount] = useState(0);
  const [Upi, setUPI] = useState("");
  const [amountS, setAmountS] = useState();
  const handleInputChange = (e) => {
    setAmount(e.target.value);
  };
  const handleInputChange2 = (e) => {
    setUPI(e.target.value);
  };

  const Withdraw = async () => {
    await axios
      .post(
        `https://kdm-money-server.onrender.com/api/v1/payment/withraw-money`,
        { upi: Upi, amount: Amount }
      )
      .then((res) => {
        console.log(res);
        console.log(amountS);
      });
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

  const user = JSON.parse(localStorage.getItem("User"));
  useEffect(() => {
    fetchAmountSetup();
  }, []);
  return (
    <div className="w-full min-h-screen bg-[#121212] text-white">
      <Nav balance={user.withrawalAmount} />
      <div className="w-full p-10 flex flex-col  gap-4">
        <p className="font-[neu] text-4xl w-full flex items-center">
          Amount Setup
        </p>
        <div className="flex flex-col gap-4 justify-between flex-wrap mt-5 w-full">
          <InputBox
            label="Enter UPI UID"
            placeholder="xxxxx@oksbi"
            name="Enter UPI ID"
            type="text"
            value={Upi}
            onChange={handleInputChange2}
            min={0}
            max={user.withrawalAmount}
          />
          <InputBox
            label="Set Amount to Withdraw"
            placeholder="600"
            name="Set Amount to Withdraw"
            type="number"
            value={Amount}
            onChange={handleInputChange}
            min={0}
            max={user.withrawalAmount}
          />

          <button className="w-[45%] p-2 mt-4 bg-[#EF4444]" onClick={Withdraw}>
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
