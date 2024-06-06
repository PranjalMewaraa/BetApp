/* eslint-disable react/prop-types */
const Row = (props) => {
  const userData = props.user;

  const handleClick = (act) => {
    const action = props.call;

    const res = action ? "Call" : "Put";
    if (act === res) {
      userData.balance += userData.balance * 0.06;
      console.log(userData);
    } else {
      userData.balance -= userData.balance * 0.06;
      console.log(userData);
    }
  };

  return (
    <div className="w-full h-20 flex ">
      <div className="w-full h-full justify-between bg-gray-900 bg-opacity-44 backdrop-blur-md border flex border-gray-900 border-opacity-45 rounded-lg shadow-lg ">
        <div className="w-auto flex items-center text-[2.5vw] md:text-lg h-full px-4">
          {props.name}
        </div>
        <div className="w-auto flex items-center h-full px-4 md:text-lg text-[2.5vw]">
          {`Rs${props.price}`}{" "}
        </div>
        <div
          className="w-auto hidden md:flex items-center  h-full px-4 text-green-500"
          style={{
            color: props.rise
              ? "rgb(34 197 94 / var(--tw-text-opacity))"
              : "#DC2626",
          }}
        >
          {props.change}
          <span
            style={{
              color: props.rise
                ? "rgb(34 197 94 / var(--tw-text-opacity))"
                : "#DC2626",
            }}
          >
            {props.rise ? "↗" : "↘"}
          </span>
        </div>
        <div className="w-auto flex items-center  h-full px-4 gap-2 justify-end">
          <button
            className="w-fit m-1 bg-green-600 text-sm md:text-lg"
            onClick={() => handleClick("Call")}
            disabled={!props.isEnabled}
            style={{
              backgroundColor: !props.isEnabled
                ? "gray"
                : "rgb(22 163 74 / var(--tw-bg-opacity))",
            }}
          >
            Call
          </button>
          <button
            className="w-fit m-1 bg-red-600 text-sm md:text-lg"
            onClick={() => handleClick("Put")}
            disabled={!props.isEnabled}
            style={{
              backgroundColor: !props.isEnabled
                ? "gray"
                : "rgb(220 38 38 / var(--tw-bg-opacity))",
            }}
          >
            Put
          </button>
        </div>
      </div>
    </div>
  );
};

export default Row;
