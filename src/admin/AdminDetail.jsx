import React, { useEffect, useState } from "react";
import NavA from "../component/AdminNav";
import axios from "axios";

const AdminDetail = () => {
  const [usern, setUSer] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  function getUser() {
    axios
      .get(`https://kdm-money-server.onrender.com/api/v1/admin/get-allusers`)
      .then((res) => {
        setUSer(res.data.users);
        console.log("Fetched users:", res.data.users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }

  useEffect(() => {
    getUser();
  }, []);

  const handleDeleteLevelUser = async (mainId, userId) => {
    try {
      const response = await axios.put(
        `https://kdm-money-server.onrender.com/api/v1/admin/delete-child`,
        {
          mainId: mainId,
          userId: userId,
        }
      );
      console.log("Level user deleted successfully:", response);
      // After deletion, fetch users again to update the list
      getUser();
    } catch (error) {
      console.error("Error deleting level user:", error);
    }
  };

  const filteredUsers = usern.filter(
    (user) =>
      (user.userName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
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
                      {user.withrawalAmount}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="4" className="p-4">
                      <div className="bg-gray-100 text-black p-4 rounded">
                        <p className="font-bold">Members:</p>
                        {user.levelOneChield &&
                        user.levelOneChield.length > 0 ? (
                          <>
                            <p className="font-semibold">Level 1 Users:</p>
                            {user.levelOneChield.map((member) => (
                              <div
                                key={member._id}
                                className="p-2 flex justify-between items-center"
                              >
                                <div>
                                  <p>Name: {member.userName}</p>
                                  <p>Email: {member.email}</p>
                                </div>
                                <button
                                  onClick={() =>
                                    handleDeleteLevelUser(user._id, member._id)
                                  }
                                >
                                  Delete
                                </button>
                              </div>
                            ))}
                          </>
                        ) : (
                          <p>No Level 1 Users</p>
                        )}
                        {user.levelTwoChild && user.levelTwoChild.length > 0 ? (
                          <>
                            <p className="font-semibold">Level 2 Users:</p>
                            {user.levelTwoChild.map((member) => (
                              <div
                                key={member._id}
                                className="p-2 flex justify-between items-center"
                              >
                                <div>
                                  <p>Name: {member.userName}</p>
                                  <p>Email: {member.email}</p>
                                </div>
                                <button
                                  onClick={() =>
                                    handleDeleteLevelUser(user._id, member._id)
                                  }
                                >
                                  Delete
                                </button>
                              </div>
                            ))}
                          </>
                        ) : (
                          <p>No Level 2 Users</p>
                        )}
                        {user.levelThreeChild &&
                        user.levelThreeChild.length > 0 ? (
                          <>
                            <p className="font-semibold">Level 3 Users:</p>
                            {user.levelThreeChild.map((member) => (
                              <div
                                key={member._id}
                                className="p-2 flex justify-between items-center"
                              >
                                <div>
                                  <p>Name: {member.userName}</p>
                                  <p>Email: {member.email}</p>
                                </div>
                                <button
                                  onClick={() =>
                                    handleDeleteLevelUser(user._id, member._id)
                                  }
                                >
                                  Delete
                                </button>
                              </div>
                            ))}
                          </>
                        ) : (
                          <p>No Level 3 Users</p>
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
    </div>
  );
};

export default AdminDetail;
