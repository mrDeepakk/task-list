import React from "react";
import { FaPlus } from "react-icons/fa6";
import { IoIosMore } from "react-icons/io";
const Header = ({ setFlag, title, bg, count }) => {
  return (
    <div
      className={`flex justify-between items-center h-12 rounded-md text-sm text-black`}
    >
      <div className="flex">
        <div
          className={`${bg} pl-2 rounded-sm w-[90px] text-md font-medium text-black/[0.9]`}
        >
          {title}
        </div>
        <div
          className={`ml-2 text-lg bg-white w-5 h-5 text-black rounded-full flex justify-center items-center`}
        >
          {count}
        </div>
      </div>
      <div className="flex gap-2">
        <IoIosMore className="text-2xl text-black rounded-full p-1 cursor-pointer" />
        <FaPlus
          className="text-2xl text-black rounded-full p-1 cursor-pointer"
          onClick={() => {
            setFlag((prev) => !prev);
          }}
        />
      </div>
    </div>
  );
};
export default Header;
