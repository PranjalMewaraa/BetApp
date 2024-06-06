import { useState } from "react";
import NavA from "../component/AdminNav";
import InputBox from "../component/InputBox";
import axios from "axios";

const AmountSet = () => {
  const [amountSet, setAmountSet] = useState({
    minAmount: 500,
    maxAmount: 1000,
    withdrawalTax: 6,
    dipositeTax: 6,
    inviteBonus: 10,
    levelOneBonus: 10,
    levelTwoBonus: 10,
    levelThreeBonus: 10,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAmountSet((prevAmountSet) => ({
      ...prevAmountSet,
      [name]: parseFloat(value),
    }));
  };

  // Handler for updating the values
  const handleUpdate = () => {
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

    try {
      console.log("done", amountSet);
      axios
        .post(
          "https://kdm-money-server.onrender.com/api/v1/admin/amount-setup",
          amountSet
        )
        .then((res) => {
          console.log("done" + res);
          alert("Done");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#121212]">
      <NavA balance={0} />
      <div className="w-full p-10 flex flex-col gap-4">
        <p className="font-[neu] text-4xl w-full flex items-center">
          Amount Setup
        </p>
        <div className="flex gap-4 justify-between flex-wrap mt-5 w-full">
          <InputBox
            label="Set Withdrawal Tax"
            placeholder="6%"
            name="withdrawalTax"
            type="number"
            value={amountSet.withdrawalTax}
            onChange={handleInputChange}
            min={0}
          />
          <InputBox
            label="Set deposite Tax"
            placeholder="6%"
            name="depositeTax"
            type="number"
            value={amountSet.depositeTax}
            onChange={handleInputChange}
            min={0}
          />
          <InputBox
            label="Set Minimum Withdrawal Amount"
            placeholder="600"
            name="minAmount"
            type="number"
            value={amountSet.minAmount}
            onChange={handleInputChange}
            min={0}
          />
          <InputBox
            label="Set Minimum deposit Amount"
            placeholder="600"
            name="maxAmount"
            type="number"
            value={amountSet.maxAmount}
            onChange={handleInputChange}
            min={0}
          />
          <InputBox
            label="Invite Bonus Amount"
            placeholder="10"
            name="inviteBonus"
            type="number"
            value={amountSet.inviteBonus}
            onChange={handleInputChange}
            min={0}
          />
          <InputBox
            label="Level 1 Bonus"
            placeholder="10"
            name="levelOneBonus"
            type="number"
            value={amountSet.levelOneBonus}
            onChange={handleInputChange}
            min={0}
          />
          <InputBox
            label="Level 2 Bonus"
            placeholder="10"
            name="levelTwoBonus"
            type="number"
            value={amountSet.levelTwoBonus}
            onChange={handleInputChange}
            min={0}
          />
          <InputBox
            label="Level 3 Bonus"
            placeholder="10"
            name="levelThreeBonus"
            type="number"
            value={amountSet.levelThreeBonus}
            onChange={handleInputChange}
            min={0}
          />
          <button
            className="w-full p-2 mt-4 bg-[#EF4444]"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default AmountSet;
