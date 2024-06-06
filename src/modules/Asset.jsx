import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Asset() {
  const navigate = useNavigate();
  const [rechargeHistory, setrechargeHistory] = useState("");
  const [withdrawHistory, setWithdrawHistory] = useState("");

  const fetchWithdrawData = async () => {
    try {
      const response = await axios.get("http://localhost:5001/withdrawdata");
      setWithdrawHistory(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchRechargeData = async () => {
    try {
      const response = await axios.get("http://localhost:5001/rechargedata");
      setrechargeHistory(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchRechargeData();
    fetchWithdrawData();
  }, []);
  return (
    <div className="assetContainer bg-[#121212] text-white">
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
                <div>
                  <div>
                    <b>Rs.{item.Amount}</b>
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
