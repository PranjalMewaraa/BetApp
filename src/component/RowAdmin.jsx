/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";

const RowAdmin = (props) => {
  const [calltoDo, setCall] = useState(props.call);

  // Fetch the initial state from the server when the component mounts
  // useEffect(() => {
  //   const fetchInitialState = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://kdm-money-server.onrender.com/api/v1/admin/createCall?productId=${props.id}`
  //       );
  //       setCall(response.data.call); // Assuming response.data.call contains the initial value
  //       setLoading(false); // Set loading to false after fetching data
  //     } catch (error) {
  //       console.error("Error fetching initial state:", error);
  //       setLoading(false); // Set loading to false in case of error
  //     }
  //   };

  //   fetchInitialState();
  // }, [props.id]);

  const handleCallChange = async (e) => {
    const callValue = e.target.checked;
    setCall(callValue);

    try {
      const response = await axios.put(
        `https://kdm-money-server.onrender.com/api/v1/admin/createCall?productId=${props.id}`,
        { call: callValue },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response from server:", response.data);
    } catch (error) {
      console.error("Error updating call status:", error);
    }
  };

  return (
    <div className="w-full h-20 flex">
      <div className="w-full h-full bg-gray-900 bg-opacity-44 backdrop-blur-md border flex border-gray-900 border-opacity-45 rounded-lg shadow-lg">
        <div className="w-1/4 flex items-center h-full px-4">{props.name}</div>

        <div className="w-1/4 flex items-center h-full px-4 gap-2 flex justify-end">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              onChange={handleCallChange}
              checked={calltoDo}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Enable to Set Call
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default RowAdmin;
