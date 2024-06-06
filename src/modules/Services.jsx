import Nav from "../component/Nav";

const Services = () => {
  const user = JSON.parse(localStorage.getItem("User"));
  return (
    <div className="w-full min-h-screen">
      <Nav balance={user.withrawalAmount} />
      <div className="w-full p-10 flex flex-col gap-4">
        <p className="font-[neu] mb-8 text-4xl w-full flex items-center">
          Check Our Services
        </p>
        <div className="flex flex-col gap-3">
          <p className="p-4 bg-slate-900 flex justify-center text-white rounded-md">
            Get Daily Signals
          </p>
          <p className="p-4 bg-slate-900 flex justify-center text-white rounded-md">
            Complaints Channel
          </p>
          <p className="p-4 bg-slate-900 flex justify-center text-white rounded-md">
            Help and Support Channel
          </p>
          <p className="p-4 bg-slate-900 flex justify-center text-white rounded-md">
            Community Channel
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
