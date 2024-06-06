import React, { useEffect, useState } from "react";
import NavA from "../component/AdminNav";
import axios from "axios";

const WithdrawlReq = () => {
  const [usern, setUSer] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [reqWithdrawl, setReq] = useState([]);

  function getUser() {
    axios
      .get(`https://kdm-money-server.onrender.com/api/v1/admin/get-allusers`)
      .then((res) => {
        setUSer(res.data.users);
        console.log("Fetched users:", res.data.users);
      })
      .catch((error) => {
        console.error("Error fetching users:", usern + error);
      });
  }
  async function getReq() {
    await axios
      .get(
        `https://kdm-money-server.onrender.com/api/v1/admin/get-all-withdrawal-req`
      )
      .then((res) => {
        setReq(res.data.withdrawalReq);
      });
  }

  useEffect(() => {
    getUser();
    getReq();
  }, []);

  // const handleDeleteLevelUser = async (mainId, userId) => {
  //   try {
  //     const response = await axios.put(
  //       `https://kdm-money-server.onrender.com/api/v1/admin/delete-child`,
  //       {
  //         mainId: mainId,
  //         userId: userId,
  //       }
  //     );
  //     console.log("Level user deleted successfully:", response);
  //     // After deletion, fetch users again to update the list
  //     getUser();
  //   } catch (error) {
  //     console.error("Error deleting level user:", error);
  //   }
  // };

  const handleRequest = async (id) => {
    try {
      await axios
        .put(
          `https://kdm-money-server.onrender.com/api/v1/admin/approve-req?requsetId=${id}`
        )
        .then((res) => {
          console.log(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const filteredUsers = reqWithdrawl.filter(
    (user) =>
      (user.userName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.upi || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.phone &&
        user.phone.toString().toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="w-full min-h-screen bg-[#121212]">
      <NavA balance={0} />
      <div className="w-full p-10 flex flex-col gap-4">
        <p className="font-[neu] text-4xl w-full flex items-center">Details</p>

        <input
          type="text"
          placeholder="Search users"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded mb-4"
        />

        <div className="mt-5 w-full">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">S.no</th>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Phone </th>
                <th className="border border-gray-300 p-2">Upi ID</th>
                <th className="border border-gray-300 p-2">Amount</th>
                <th className="border border-gray-300 p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.map((user, index) => (
                <React.Fragment key={index}>
                  <tr className="border border-gray-300">
                    <td className="border border-gray-300 p-2">{index + 1}</td>
                    <td className="border border-gray-300 p-2">
                      {user.userName}
                    </td>
                    <td className="border border-gray-300 p-2">{user.phone}</td>
                    <td className="border border-gray-300 p-2">{user.upi}</td>
                    <td className="border border-gray-300 p-2 ">
                      {user.amount}
                    </td>
                    <td className="border border-gray-300 p-2 flex justify-center cursor-pointer">
                      <p
                        className=" text-green-500"
                        onClick={() => handleRequest(user._id)}
                      >
                        Mark as Completed
                      </p>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WithdrawlReq;
