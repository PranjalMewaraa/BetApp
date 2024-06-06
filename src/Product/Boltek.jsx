import { useState, useEffect } from "react";
import axios from "axios";
import "../modules/style/style.css";
import increase from "../modules/images/increase.png";
import productVideo from "../Product/product1.mp4";
import redchart from "../modules/images/redchart.png";
import greenchart from "../modules/images/greenchart.png";

function formatNumberWithCustomPattern(number) {
  let numStr = number.toString();
  let result = "";

  let lastThree = numStr.slice(-3);
  result = "," + lastThree;
  numStr = numStr.slice(0, -3);

  while (numStr.length > 2) {
    let nextTwo = numStr.slice(-2);
    result = "," + nextTwo + result;
    numStr = numStr.slice(0, -2);
  }

  result = numStr + result;

  if (result[0] === ",") {
    result = result.slice(1);
  }

  return result;
}

export default function Boltek() {
  const [marketCap, setMarketCap] = useState(124854725225);
  const [isFuncCalled, setIsFuncCalled] = useState(false);
  const [cooldownActive, setCooldownActive] = useState(false);

  const updateAmount = async () => {
    const res = await axios.get(
      "https://kdm-money-server.onrender.com/api/v1/auth/user-details"
    );
    localStorage.setItem("User", JSON.stringify(res.data.user));
  };

  const callFunc = () => {
    // Check if the function can be called
    if (!isFuncCalled && !cooldownActive) {
      const updatedData = {
        productId: "664d8a197f79eb1ab87a5904",
        call: true,
      };

      axios
        .post(
          "https://kdm-money-server.onrender.com/api/v1/auth/take-action",
          updatedData
        )
        .then((response) => {
          console.log("Call successful:", response.data);
          alert("Balance updated... It may take some time to reflect");
          // Refresh the data after setup
          updateAmount();
          setIsFuncCalled(true);
          setCooldownActive(true);
          localStorage.setItem("lastCallTimeBoltek", Date.now());
        })
        .catch((error) => {
          console.error("Error:", error.response.data);
        });
    }
  };

  const putFnc = () => {
    // Check if the function can be called
    if (!isFuncCalled && !cooldownActive) {
      const updatedData = {
        productId: "664d8a197f79eb1ab87a5904",
        call: false,
      };

      axios
        .post(
          "https://kdm-money-server.onrender.com/api/v1/auth/take-action",
          updatedData
        )
        .then((response) => {
          console.log("Put successful:", response.data);
          alert("Balance updated... It may take some time to reflect");
          updateAmount();
          setIsFuncCalled(true);
          setCooldownActive(true);
          localStorage.setItem("lastCallTimeBoltek", Date.now());
        })
        .catch((error) => {
          console.error("Error:", error.response.data);
        });
    }
  };

  useEffect(() => {
    updateAmount();
    const lastCallTimeBoltek = localStorage.getItem("lastCallTimeBoltek");
    const currentTime = Date.now();
    if (lastCallTimeBoltek && currentTime - lastCallTimeBoltek < 14400000) {
      // Cooldown is still active, set cooldown active state to true
      setCooldownActive(true);
      // Set timeout for remaining cooldown time
      setTimeout(
        () => setCooldownActive(false),
        14400000 - (currentTime - lastCallTimeBoltek)
      );
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomDelta = Math.floor(Math.random() * 500) + 1;
      const increase = Math.random() < 0.5;
      const newMarketCap = increase
        ? marketCap + randomDelta
        : marketCap - randomDelta;

      setMarketCap(newMarketCap);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [marketCap]);

  return (
    <div className="productContainer">
      <h1>Botlek_Port</h1>
      <video
        className="productVideo"
        src={productVideo}
        autoPlay
        loop
        muted
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
        aria-label="Product Video"
      ></video>

      <div className="productChart">
        <div className="chart1">
          <div className="chart1left">
            <p className="chartValue">
              ${formatNumberWithCustomPattern(marketCap)}
            </p>
            <div className="chart1leftchild">
              <p id="chartName">Market Cap</p>
              <div id="chartPercentage">
                <img src={increase} alt="up" />
              </div>
              2.6%
            </div>
          </div>
          <div className="chart1right">
            <img src={greenchart} alt="chart" />
          </div>
        </div>
        <div className="chart2">
          <div className="chart1left">
            <p className="chartValue">$75,03,69,91,536</p>
            <div className="chart1leftchild">
              <p id="chartName">24h Trading Volume</p>
            </div>
          </div>
          <div className="chart1right">
            <img src={redchart} alt="chart" />
          </div>
        </div>
      </div>

      <div className="productButton">
        <button
          className={`callBtn ${cooldownActive ? "disabled" : ""}`}
          onClick={callFunc}
          disabled={cooldownActive}
        >
          Call
        </button>
        <button
          className={`putBtn ${cooldownActive ? "disabled" : ""}`}
          onClick={putFnc}
          disabled={cooldownActive}
        >
          Put
        </button>
      </div>
    </div>
  );
}
