/* eslint-disable react/prop-types */

const CardAdmin = (props) => {
  return (
    <div
      onClick={props.onClick}
      className="w-full md:min-w-[500px] p-10 text-gray-400 md:max-w-[32%] min-h-[20vh] bg-slate-10 bg-slate-800 bg-opacity-38 backdrop-blur-md border border-slate-500 border-opacity-45 rounded-lg shadow-lg"
    >
      <p className="font-[pp] w-full text-left text-2xl">{props.title}</p>
      <p className="w-full text-end text-7xl font-semibold">{props.num || 0}</p>
    </div>
  );
};

export default CardAdmin;
