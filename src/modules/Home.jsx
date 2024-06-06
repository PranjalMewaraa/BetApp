import { useEffect, useState } from "react";
import Nav from "../component/Nav";

import Slider from "../component/Slider";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import rechargeImg from "./images/RechargeImg.png";

import shareImg from "./images/share.png";
import serviceImg from "./images/support.png";
import "./style/style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MySwal = withReactContent(Swal);

const Home = () => {
  const user = JSON.parse(localStorage.getItem("User"));

  const [newProd, setProd] = useState([]);
  const [amountS, setAmountS] = useState();
  const [callStartTime, setCallStartTime] = useState("");
  const [callEndTime, setCallEndTime] = useState("");
  // const [productStatus, setProductStatus] = useState(getProductStatus());

  const navigate = useNavigate();
  const getProduct = async () => {
    await axios.interceptors.request.use(
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
      .get(
        "https://kdm-money-server.onrender.com/api/v1/auth/fetch-all-products"
      )
      .then((res) => {
        console.log(res.data.products);
        setProd(res.data.products);
      });
  };
  const [ref, setRef] = useState("");
  const fetchAmountSetup = async () => {
    await axios
      .get(
        "https://kdm-money-server.onrender.com/api/v1/auth/fetch-amount-details"
      )
      .then((res) => {
        const { amountsDetails } = res.data; // Extract amountsDetails object from response
        const { callTime } = amountsDetails; // Extract callTime object from amountsDetails
        setCallStartTime(callTime.start); // Set call start time state
        setCallEndTime(callTime.end);
        console.log({ callStartTime });
        console.log({ callEndTime });
        setAmountS(res.data.amountsDetails);
        console.log(res.data.amountsDetails);
        console.log(ref);
        console.log(amountS);
      });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        MySwal.fire("Copied!", "", "success");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const genRef = async () => {
    try {
      await axios
        .get(
          "https://kdm-money-server.onrender.com/api/v1/refer/get-referal-code"
        )
        .then((res) => {
          setRef(`${res.data.message} - ${user.email}`);
          console.log(res);
          const refURL = res.data.referalUrl;
          MySwal.fire({
            title: "Copy and Share",
            html: (
              <div>
                <p className=" text-xl text-black">{refURL}</p>
                <button onClick={() => copyToClipboard(refURL)}>
                  Copy to Clipboard
                </button>
              </div>
            ),
            showConfirmButton: false,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
  // function redirectToTelegram() {
  //   window.location.href = "https://web.telegram.org/";
  // }

  useEffect(() => {
    getProduct();
    fetchAmountSetup();
  }, []);

  const isCurrentTimeInRange = () => {
    if (callStartTime && callEndTime) {
      const now = new Date();
      const startTime = new Date(callStartTime);
      const endTime = new Date(callEndTime);

      const timeZoneOffset = startTime.getTimezoneOffset();
      startTime.setMinutes(startTime.getMinutes() + timeZoneOffset);
      endTime.setMinutes(endTime.getMinutes() + timeZoneOffset);
      console.log(startTime);
      return now >= startTime && now <= endTime;
    }
    return false;
  };

  const currentTimeInRange = isCurrentTimeInRange();

  return (
    <div className="w-full min-h-screen flex flex-col gap-3">
      <Nav balance={user?.withrawalAmount} />
      <div className="p-1 md:p-10 w-full h-fit flex flex-col gap-2">
        <p className="font-[neu] pt-8 text-md md:text-4xl justify-between flex items-center">
          {`Hey ${user?.userName} !`}
        </p>
        <div className="w-[full] rounded-xl h-[40vh] bg-white my-5">
          <Slider />
        </div>
        <div className="rechargeContainer">
          <button
            className="recharegButton"
            onClick={() => navigate("/home/action/deposit")}
          >
            <div className="rechargeText">
              <p className="maintxt">Recharge</p>
              <p className="subTxt">Quick and Easy</p>
            </div>
            <img id="recImg" src={rechargeImg} alt="" />
          </button>
          <div className="rechargeChild">
            <button className="shareService" onClick={genRef}>
              <img className="shareServiceImg1" src={shareImg} alt="img" />
              Share
            </button>
            <button
              className="shareService"
              onClick={() => navigate("/services")}
            >
              <img className="shareServiceImg2" src={serviceImg} alt="img" />
              Service
            </button>
          </div>
        </div>

        <p className="font-[neu] text-4xl my-4 w-full flex items-center">
          Explore the Market
        </p>
        {/* <Link to="/prod">Products</Link> */}

        {/* {newProd &&
          newProd?.map((item) => {
            return (
              <Row
                key={item._id}
                name={item.name}
                price={item.price}
                rise={item.rise}
                call={item.call}
                change={item.change}
                user={user}
                isEnabled={isEnabled}
              />
            );
          })} */}

        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {newProd.map((product) => (
              <tr className="text-center" key={product._id}>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">${product.price}</td>
                <td className="border px-4 py-2">
                  {currentTimeInRange ? "Active" : "Inactive"}
                </td>{" "}
                <td className="border px-4 py-2">
                  {currentTimeInRange && (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => navigate(product.name)}
                    >
                      View
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
