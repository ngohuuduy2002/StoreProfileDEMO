import React from "react";

interface DividerProps {
  item: String;
}

const Divider = ({item}: DividerProps) => {
  return (
    <div className="flex flex-row w-full items-center ">
      <div className="border bg-[#2357C7]  w-[10%] h-[15px]"></div>
      <p className="px-5 w-[13%] text-center text-xl font-bold text-[#2357C7]">
        {item}
      </p>
      <div className="border bg-[#2357C7] w-[90%] h-[15px]"></div>
    </div>
  );
};

export default Divider;