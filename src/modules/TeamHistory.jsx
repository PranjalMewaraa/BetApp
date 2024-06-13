import React from "react";
import Nav from "../component/Nav";

const TeamHistory = () => {
  const user = JSON.parse(localStorage.getItem("User"));
  const TeamHistory = JSON.parse(localStorage.getItem("history"));
  console.log(TeamHistory);
  console.log(JSON.parse(localStorage.getItem("history")));
  // localStorage.removeItem("history");

  function convertToIST(utcTimestamp) {
    // Parse the input timestamp to a Date object
    const date = new Date(utcTimestamp);

    // Get the UTC time in milliseconds
    const utcTime = date.getTime();

    // IST is 5 hours and 30 minutes ahead of UTC
    const istOffset = 5.5 * 60 * 60 * 1000;

    // Calculate the IST time
    const istTime = new Date(utcTime);

    // Format the date and time
    const istDateString = istTime.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    return istDateString;
  }

  return (
    <div className="w-full min-h-screen bg-[#121212] text-white flex flex-col gap-3">
      <Nav balance={user.withrawalAmount} />
      <div className="p-2 md:p-10 w-full h-fit flex flex-col gap-2">
        <p className="text-4xl my-4">Member Recharge history</p>
        <div className="w-full p-2">
          {TeamHistory?.length === 0 ? (
            <p>No History Yet</p>
          ) : (
            <div>
              {JSON.parse(localStorage.getItem("history"))?.map((item) => {
                console.log(item);
                return (
                  <div key={item._id} className="w-full text-white">
                    <div className="flex justify-between w-full">
                      <b>TXN ID - {item._id}</b>
                      <b> TXN RS - {item.amount}</b>
                      <b>{convertToIST(item.createdAt)}</b>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamHistory;
