import Nav from "../component/Nav";

const Services = () => {
  const handleDailySignal = () => {
    window.location.href = "https://t.me/+ttX6C2Zw2sQ5ZTU1 ";
  };

  const handleComplaintChannel = () => {
    window.location.href = "https://t.me/SSP_PORTS_HELPLINE";
  };

  const handleCommunityChannel = () => {
    window.location.href = "https://t.me/+ttX6C2Zw2sQ5ZTU1";
  };

  const handleWhatsappComplaint = () => {
    window.location.href = "https://wa.me/447441929522";
  };
  const handleCommunityWP = () => {
    window.location.href =
      "https://whatsapp.com/channel/0029VagbPxz0lwgy7cnhBV0L";
  };
  const handleWPDailySignal = () => {
    window.location.href =
      "https://whatsapp.com/channel/0029VagbPxz0lwgy7cnhBV0L";
  };

  const user = JSON.parse(localStorage.getItem("User"));
  return (
    <div className="w-full min-h-screen bg-[#121212] text-white">
      <Nav balance={user.withrawalAmount} />
      <div className="w-full p-10 flex flex-col gap-4">
        <p className="font-[neu] mb-8 text-4xl w-full flex items-center">
          Check Our Services
        </p>
        <div className="flex flex-col gap-3">
          <p className="p-4 bg-slate-900 flex gap-4 justify-center text-white rounded-md">
            Get Daily Signals{" "}
            <span
              className="text-red-300 cursor-pointer hover:underline"
              onClick={handleDailySignal}
            >
              Telegram
            </span>{" "}
            |{" "}
            <span
              className="text-red-300 cursor-pointer hover:underline"
              onClick={handleWPDailySignal}
            >
              Whatsapp
            </span>
          </p>
          <p className="p-4 bg-slate-900 flex gap-4 justify-center text-white rounded-md">
            Complaints Channel{" "}
            <span
              className="text-red-300 cursor-pointer hover:underline"
              onClick={handleComplaintChannel}
            >
              Telegram
            </span>{" "}
            |{" "}
            <span
              className="text-red-300 cursor-pointer hover:underline"
              onClick={handleWhatsappComplaint}
            >
              Whatsapp
            </span>
          </p>
          <p className="p-4 bg-slate-900 flex gap-4 justify-center text-white rounded-md">
            Help and Support Channel{" "}
            <span
              className="text-red-300 cursor-pointer hover:underline"
              onClick={handleComplaintChannel}
            >
              Telegram
            </span>{" "}
            |{" "}
            <span
              className="text-red-300 cursor-pointer hover:underline"
              onClick={handleWhatsappComplaint}
            >
              Whatsapp
            </span>
          </p>
          <p className="p-4 bg-slate-900 flex gap-4 justify-center text-white rounded-md">
            Community Channel
            <span
              className="text-red-300 cursor-pointer hover:underline"
              onClick={handleCommunityChannel}
            >
              Telegram
            </span>{" "}
            |{" "}
            <span
              className="text-red-300 cursor-pointer hover:underline"
              onClick={handleWPDailySignal}
            >
              Whatsapp
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
