import { useEffect, useState } from "react";
import Nav from "../component/Nav";
import axios from "axios";
import UserRow from "../component/UserRow";

const Members = () => {
  const user = JSON.parse(localStorage.getItem("User"));

  const [lev1, setlev1] = useState([]);
  const [lev2, setlev2] = useState([]);
  const [lev3, setlev3] = useState([]);

  async function getMember() {
    await axios
      .get("https://kdm-money-server.onrender.com/api/v1/auth/get-team")
      .then((res) => {
        console.log("mem", res.data);
        setlev1(res.data.levelOneUsers);
        setlev2(res.data.leveTwoUsers);
        setlev3(res.data.levelThreeUsers);
      });
  }

  useEffect(() => {
    getMember();
  }, []);
  return (
    <div className="w-full min-h-screen flex flex-col gap-3">
      <Nav balance={user.withrawalAmount} />
      <div className="p-2 md:p-10 w-full h-fit flex flex-col gap-2">
        <p className="text-4xl my-4">Your Members</p>
        <div className="w-full p-2">
          <p className="p-2 mt-2 text-xl">Level 1 Users</p>
          <div className="p-2 w-full min-h-36 max-h-[40vh] overflow-y-auto">
            {lev1.length === 0 ? "No Members yet" : null}
            {lev1.map((item) => {
              console.log(item);
              return (
                <UserRow
                  key={item._id}
                  idx={item.userName}
                  email={item.email}
                />
              );
            })}
          </div>
          <p className="p-2 mt-2 text-xl">Level 2 Users</p>
          <div className="p-2 w-full min-h-36 max-h-[40vh] overflow-y-auto">
            {lev2.length === 0 ? "No Members yet" : null}
            {lev2.map((item) => {
              return (
                <UserRow
                  key={item._id}
                  idx={item.userName}
                  email={item.email}
                />
              );
            })}
          </div>
          <p className="p-2 mt-2 text-xl">Level 3 Users</p>
          <div className="p-2 w-full min-h-36 max-h-[40vh] overflow-y-auto">
            {lev3.length === 0 ? "No Members yet" : null}
            {lev3.map((item) => {
              return (
                <UserRow
                  key={item._id}
                  idx={item.userName}
                  email={item.email}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;
