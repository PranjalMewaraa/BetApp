import { useEffect, useState } from "react";
import Nav from "../component/Nav";

import Slider from "../component/Slider";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import rechargeImg from "./images/RechargeImg.png";
import Row from "../component/Row";
import shareImg from "./images/share.png";
import serviceImg from "./images/support.png";
import "./style/style.css";
import axios from "axios";
import app from "../assets/test.png";

import { useNavigate } from "react-router-dom";

const MySwal = withReactContent(Swal);

const useAxios = () => {
  const nav = useNavigate();

  const axiosInstance = axios.create({
    baseURL: "https://kdm-money-server.onrender.com/api/v1/auth",
  });

  // Add a request interceptor
  axiosInstance.interceptors.request.use(
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

  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        nav("/");
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

const Home = () => {
  const user = JSON.parse(localStorage.getItem("User"));
  const nav = useNavigate();
  const [newProd, setProd] = useState([]);
  const [amountS, setAmountS] = useState();
  const [callStartTime, setCallStartTime] = useState("");
  const [callEndTime, setCallEndTime] = useState("");
  // const [productStatus, setProductStatus] = useState(getProductStatus());
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  // const getProduct = async () => {
  //   axios.interceptors.request.use(
  //     (config) => {
  //       const authToken = localStorage.getItem("token");
  //       if (authToken) {
  //         config.headers.Authorization = `Bearer ${authToken}`;
  //       }
  //       return config;
  //     },

  //     (error) => {
  //       if (error.response && error.response.status === 401) {
  //         nav("/login");
  //       }
  //       console.log("Header", error);
  //       return Promise.reject(error);
  //     }
  //   );
  //   try {
  //     axios
  //       .get(
  //         "https://kdm-money-server.onrender.com/api/v1/auth/fetch-all-products"
  //       )
  //       .then((res) => {
  //         console.log(res);
  //         if (res.data.message == "Token is invalide") {
  //           nav("/login");
  //         }
  //         console.log(res.data.products);
  //         setProd(res.data.products);
  //       });
  //   } catch (error) {
  //     console.log("HEllo" + error);
  //   }
  // };
  const getProduct = async () => {
    try {
      const res = await axiosInstance.get("/fetch-all-products");
      console.log(res);
      if (res.data.message === "Token is invalide") {
        nav("/");
      } else {
        setProd(res.data.products);
      }
    } catch (error) {
      console.log("Error:", error.response.status);
      if (error.response.status == 401) {
        nav("/login");
      }
    }
  };
  const [ref, setRef] = useState("");
  const fetchAmountSetup = async () => {
    await axios
      .get(
        "https://kdm-money-server.onrender.com/api/v1/auth/fetch-amount-details"
      )
      .then((res) => {
        console.log("hel" + res);
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

  const [ip, setIp] = useState("");

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => setIp(data.ip))
      .then(console.log(ip))
      .catch((error) => console.error("Error fetching IP: ", error));
  }, []);

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
    <div className="w-full min-h-screen flex flex-col text-white bg-[#121212] gap-3">
      <Nav balance={user?.withrawalAmount} />
      <div className="p-1 md:p-10 w-full h-fit flex flex-col gap-2">
        <p className="font-[neu] pt-8 text-md md:text-4xl justify-between flex items-center">
          {`Hey ${user?.userName} !`} <br />
        </p>
        <p className="text-white">
          This Program will be launched for 3 years in india for customer
          benefits
        </p>
        <div className="w-[full] rounded-xl h-[40vh] bg-white my-5">
          <Slider />
        </div>
        <div className="rechargeContainer">
          <button
            className="recharegButton p-4"
            onClick={() => navigate("/home/action/deposit")}
          >
            <div className="rechargeText">
              <p className="maintxt">Recharge</p>
              <p className="subTxt">Quick and Easy</p>
            </div>
            <img id="recImg" src={rechargeImg} alt="" className="p-4" />
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
            <button className="shareService">
              <img className="shareServiceImg2" src={app} alt="img" />
              Download Application
            </button>
          </div>
        </div>
        <p className="font-[neu] text-4xl my-4 w-full flex items-center">
          Explore the Market
        </p>
        <div className="flex justify-between px-8">
          <p>Port Name</p>
          <p>Price</p>
          <p className="hidden md:flex">Status</p>
          <p>Action</p>
        </div>
        {newProd &&
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
                isEnabled={currentTimeInRange}
              />
            );
          })}
        {/* <table className="table-auto w-full rounded-md">
          <thead>
            <tr className="p-2 bg-gray-900">
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {newProd.map((product) => (
              <tr className="text-center p-2 bg-gray-900" key={product._id}>
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
        </table> */}
      </div>
    </div>
  );
};

export default Home;
