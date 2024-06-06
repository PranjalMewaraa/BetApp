/* eslint-disable react/prop-types */

function UserRow(props) {
  return (
    <div className="w-full h-20 flex flex-wrap justify-evenly">
      <div className="w-full h-full bg-gray-900 bg-opacity-44 backdrop-blur-md border flex flex-wrap border-gray-900 border-opacity-45 rounded-lg shadow-lg ">
        <div className="w-auto flex items-center  h-full px-4">{props.idx}</div>
        {/* <div className="w-auto flex items-center  h-full px-4">
          {props.name}
        </div> */}
        <div className="w-auto flex items-center  h-full px-4">
          {`${props.email}`}{" "}
        </div>
      </div>
    </div>
  );
}

export default UserRow;
