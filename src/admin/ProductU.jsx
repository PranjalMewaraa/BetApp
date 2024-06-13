import { useEffect, useState } from "react";
import axios from "axios";
import NavA from "../component/AdminNav";
import RowAdmin from "../component/RowAdmin";

const ProductU = () => {
  const [prods, setProd] = useState([]);
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [startWstartTime, setWstartTime] = useState("");
  const [startWendTime, setWendTime] = useState("");

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        "https://kdm-money-server.onrender.com/api/v1/auth/fetch-all-products"
      );
      setProd(res.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchDataFromApi = async () => {
    try {
      const response = await axios.get(
        "https://kdm-money-server.onrender.com/api/v1/auth/get-times-data"
      );
      console.log("Data fetched successfully:", response.data);
      const { callTime } = response.data;
      const { withdrawTime } = response.data;
      setStartDateTime(formatDateTime(callTime.start));
      setEndDateTime(formatDateTime(callTime.end));
      setWstartTime(formatDateTime(withdrawTime.start));
      setWendTime(formatDateTime(withdrawTime.end));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    if (isNaN(dateTime.getTime())) {
      console.error("Invalid date string:", dateTimeString);
      return null;
    }
    return dateTime.toISOString();
  };

  const handleSetupTime = () => {
    const updatedData = {
      withStartTime: startWstartTime,
      withEndTime: startWendTime,
      callStartTime: startDateTime,
      callEndTime: endDateTime,
    };

    axios
      .post(
        "https://kdm-money-server.onrender.com/api/v1/admin/set-time",
        updatedData
      )
      .then((response) => {
        console.log("Time setup successful:", response.data);
        fetchDataFromApi();
        alert("UPDATED");
      })
      .catch((error) => {
        console.error("Error setting time:", error.response.data);
      });
  };
  function formatDateToLocaleString(dateStr) {
    const date = new Date(dateStr);

    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    });
  }

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#121212] text-white">
      <NavA balance={0} />
      <div className="w-full p-10 flex flex-col gap-4">
        <p className="font-[neu] text-4xl w-full flex items-center">
          Products Setup
        </p>
        <div className="flex w-full justify-between">
          <div className="flex gap-4 flex-col">
            <p className="text-red-400">Setup Call/Put Time</p>
            <div>
              <h2>Start Time:</h2>
              <input
                type="datetime-local"
                value={startDateTime}
                className="text-black"
                onChange={(e) => setStartDateTime(e.target.value)}
              />
              <p>Start Time: {formatDateToLocaleString(startDateTime)}</p>
            </div>
            <div>
              <h2>End Time:</h2>
              <input
                type="datetime-local"
                value={endDateTime}
                className="text-black"
                onChange={(e) => setEndDateTime(e.target.value)}
              />
              <p>End Time : {formatDateToLocaleString(endDateTime)}</p>
            </div>
          </div>
          <div className="flex gap-4 flex-col">
            <p className="text-red-400">Setup Withdrawal Time</p>
            <div>
              <h2>Start Time:</h2>
              <input
                type="datetime-local"
                value={startWstartTime}
                className="text-black"
                onChange={(e) => setWstartTime(e.target.value)}
              />
              <p>Start Time: {formatDateToLocaleString(startWstartTime)}</p>
            </div>
            <div>
              <h2>End Time:</h2>
              <input
                type="datetime-local"
                value={startWendTime}
                className="text-black"
                onChange={(e) => setWendTime(e.target.value)}
              />
              <p>End Time : {formatDateToLocaleString(startWendTime)}</p>
            </div>
          </div>
        </div>
        <button className="bg-red-400" onClick={handleSetupTime}>
          Setup Time
        </button>
        <div className="flex flex-wrap mt-5 w-full text-white">
          {prods.map((item) => (
            <RowAdmin
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              rise={item.rise}
              call={item.call}
              change={item.change}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductU;
