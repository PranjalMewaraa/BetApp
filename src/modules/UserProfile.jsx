import Nav from "../component/Nav";
import axios from "axios";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem("User"));

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

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#121212] gap-3">
      <Nav balance={user.withrawalAmount} />
      <div className="p-2 md:p-10 w-full h-fit flex flex-col gap-2">
        <p className="text-4xl my-4">User Profile</p>
        <p className="w-full p-4 bg-slate-800 rounded-md text-white">{`Your Username : ${user.userName}`}</p>
        <p className="w-full p-4 bg-slate-800 rounded-md text-white">{`Your Email ID : ${user.email}`}</p>
        <p className="w-full p-4 bg-slate-800 rounded-md text-white">{`Your Phone Number : ${user.phone}`}</p>
        <p className="w-full p-4 bg-slate-800 rounded-md text-white">{`Broker Level : ${user.brokerLevel}`}</p>
        <p className="w-full p-4 bg-slate-800 rounded-md text-white">{`Account Balance : ${user.withrawalAmount}`}</p>
        <p className="w-full p-4 bg-slate-800 rounded-md text-white">{`Eligible for Weekly Salary : ${user.isGetWeekySalary}`}</p>
        <div className="w-full h-fit flex gap-4 my-3 flex-wrap">
          <button className="bg-red-500" onClick={genRef}>
            {"Generate referal url"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
