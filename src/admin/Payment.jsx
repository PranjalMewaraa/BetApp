import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Payment() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch user data when the component mounts
  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    axios
      .get(`https://kdm-money-server.onrender.com/api/v1/admin/get-allusers`)
      .then((res) => {
        setUsers(res.data.users);
        console.log("Fetched users:", res.data.users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  // Filter users based on the search term
  const filteredUsers = users.filter((user) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search users"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 mt-5 p-2 border border-gray-300 rounded"
      />
      <div className="mt-5 w-full">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Username</th>
              <th className="border border-gray-300 p-2">Gmail</th>
              <th className="border border-gray-300 p-2">Phone Number</th>
              <th className="border border-gray-300 p-2">Balance</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <React.Fragment key={index}>
                <tr className="border border-gray-300">
                  <td className="border border-gray-300 p-2">
                    {user.userName}
                  </td>
                  <td className="border border-gray-300 p-2">{user.email}</td>
                  <td className="border border-gray-300 p-2">{user.phone}</td>
                  <td className="border border-gray-300 p-2">
                    {user.withdrawalAmount}
                  </td>
                </tr>
                <tr>
                  <td colSpan="4" className="p-4">
                    <div className="bg-gray-100 text-zinc-950 p-4 rounded">
                      <p className="font-bold">Withdrawal History:</p>
                      {user.withdrawalHistory &&
                      user.withdrawalHistory.length > 0 ? (
                        user.withdrawalHistory.map((history, idx) => (
                          <div key={idx} className="p-2">
                            <p>Date: {history.date}</p>
                            <p>Amount: {history.amount}</p>
                          </div>
                        ))
                      ) : (
                        <p>No withdrawal history.</p>
                      )}
                    </div>
                    <div className="bg-gray-100 text-zinc-950 p-4 rounded mt-4">
                      <p className="font-bold">Recharge History:</p>
                      {user.rechargeHistory &&
                      user.rechargeHistory.length > 0 ? (
                        user.rechargeHistory.map((history, idx) => (
                          <div key={idx} className="p-2">
                            <p>Date: {history.date}</p>
                            <p>Amount: {history.amount}</p>
                          </div>
                        ))
                      ) : (
                        <p>No recharge history.</p>
                      )}
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
