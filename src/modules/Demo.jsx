import { useState, useEffect } from "react";
import axios from "axios";

export default function Demo() {
  const [withdrawTime, setWithdrawTime] = useState(null);
  const [callTime, setCallTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiClient = axios.create({
    baseURL: "https://kdm-money-server.onrender.com/api/v1/auth",
  });

  apiClient.interceptors.request.use(
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

  useEffect(() => {
    apiClient
      .get("/fetch-amount-details")
      .then((response) => {
        const { withdrawTime, callTime } = response.data.amountsDetails;
        setWithdrawTime(withdrawTime);
        setCallTime(callTime);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleWithdrawTimeUpdate = async () => {
    try {
      const response = await apiClient.put("/admin/set-time", {
        withStartTime: withdrawTime.start,
        withEndTime: withdrawTime.end,
      });
      console.log("Withdraw time updated successfully:", response);
      // Assuming the response contains updated data, you can update the state if needed
    } catch (error) {
      console.error("Error updating withdraw time:", error);
    }
  };

  const handleCallTimeUpdate = async () => {
    try {
      const response = await apiClient.put("/admin/set-time", {
        callStartTime: callTime.start,
        callEndTime: callTime.end,
      });
      console.log("Call time updated successfully:", response);
      // Assuming the response contains updated data, you can update the state if needed
    } catch (error) {
      console.error("Error updating call time:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Data from API</h1>
      <div>
        <h2>Withdraw Time</h2>
        <p>
          Start:{" "}
          {withdrawTime?.start
            ? new Date(withdrawTime.start).toLocaleString()
            : "N/A"}
        </p>
        <p>
          End:{" "}
          {withdrawTime?.end
            ? new Date(withdrawTime.end).toLocaleString()
            : "N/A"}
        </p>
        <input
          type="datetime-local"
          value={new Date(withdrawTime?.start).toISOString().slice(0, -8)}
          onChange={(e) =>
            setWithdrawTime({
              ...withdrawTime,
              start: new Date(e.target.value).toISOString(),
            })
          }
        />
        <input
          type="datetime-local"
          value={new Date(withdrawTime?.end).toISOString().slice(0, -8)}
          onChange={(e) =>
            setWithdrawTime({
              ...withdrawTime,
              end: new Date(e.target.value).toISOString(),
            })
          }
        />
        <button onClick={handleWithdrawTimeUpdate}>Update Withdraw Time</button>
      </div>
      <div>
        <h2>Call Time</h2>
        <p>
          Start:{" "}
          {callTime?.start ? new Date(callTime.start).toLocaleString() : "N/A"}
        </p>
        <p>
          End: {callTime?.end ? new Date(callTime.end).toLocaleString() : "N/A"}
        </p>
        <input
          type="datetime-local"
          value={new Date(callTime?.start).toISOString().slice(0, -8)}
          onChange={(e) =>
            setCallTime({
              ...callTime,
              start: new Date(e.target.value).toISOString(),
            })
          }
        />
        <input
          type="datetime-local"
          value={new Date(callTime?.end).toISOString().slice(0, -8)}
          onChange={(e) =>
            setCallTime({
              ...callTime,
              end: new Date(e.target.value).toISOString(),
            })
          }
        />
        <button onClick={handleCallTimeUpdate}>Update Call Time</button>
      </div>
    </div>
  );
}
