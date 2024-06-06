/* eslint-disable react/prop-types */

const InputBox = (props) => {
  return (
    <div className="flex flex-col w-full gap-2 md:w-[45%] items-start">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        className="w-full py-2 px-4 bg-gray-100 text-black rounded-md"
        type={props.type || "text"}
        name={props.name}
        id={props.id}
        min={props.min}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </div>
  );
};

export default InputBox;
