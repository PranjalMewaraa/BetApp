import { useState } from "react";
import Nav from "../component/Nav";

const Detail = () => {
  const options = ["60s | 30%", "120s | 35%", "300s | 40%"];
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div className="w-full h-fit min-h-screen flex flex-col gap-4">
      <Nav />
      <div className="w-full items-center p-10 flex flex-col gap-4">
        <div className="w-11/12 h-[68vh] bg-slate-50 rounded-md"></div>
        <div className="w-11/12 h-10 flex gap-8 justify-between">
          <label htmlFor="pos" className="flex gap-4 items-center w-1/3">
            No of Open Position:
            <input
              type="number"
              min={0}
              placeholder="0"
              className="p-2 rounded"
            />
          </label>
          <div className="w-1/2 h-full flex gap-3 justify-end items-center">
            {options.map((option) => (
              <label
                key={option}
                className="w-fit p-4 bg-slate-50 rounded flex gap-4 items-center text-black"
              >
                <input
                  type="radio"
                  value={option}
                  checked={selectedOption == option}
                  onChange={handleOptionChange}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
        <div className="w-11/12 h-10 flex gap-8">
          <button className="w-1/2 h-full bg-green-600">Call</button>
          <button className="w-1/2 h-full bg-red-600">Put</button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
