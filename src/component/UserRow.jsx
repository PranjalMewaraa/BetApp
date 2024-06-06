/* eslint-disable react/prop-types */

function UserRow(props) {
  return (
    <div className="w-full min-h-20 h-fit flex gap-8 flex-wrap justify-evenly">
      <div className="w-full h-full p-8 bg-gray-900 bg-opacity-44 backdrop-blur-md border flex gap-4 flex-wrap text-white border-gray-900 border-opacity-45 rounded-lg shadow-lg ">
        <div className="w-auto flex items-center text-white  h-full px-4">
          {props.idx}
        </div>
        {/* <div className="w-auto flex items-center  h-full px-4">
          {props.name}
        </div> */}
        <div className="w-auto flex items-center text-white h-full px-4">
          {`${props.email}`}{" "}
        </div>
      </div>
    </div>
  );
}

export default UserRow;
