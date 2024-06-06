/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";

const Row = (props) => {
  // const userData = props.user;
  console.log(props.isEnabled);
  const navigate = useNavigate();

  return (
    <div className="w-full h-20 flex ">
      <div className="w-full h-full justify-between bg-gray-900 bg-opacity-44 backdrop-blur-md border flex border-gray-900 border-opacity-45 rounded-lg shadow-lg ">
        <div className="w-auto flex items-center text-white text-[2.5vw] md:text-lg h-full px-4">
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
            onClick={() => navigate(props.name)}
            disabled={!props.isEnabled}
            style={{
              backgroundColor: !props.isEnabled
                ? "gray"
                : "rgb(22 163 74 / var(--tw-bg-opacity))",
            }}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default Row;
