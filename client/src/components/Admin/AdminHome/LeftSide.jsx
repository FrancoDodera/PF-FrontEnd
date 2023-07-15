import React from "react";
import Rating from "./rating";

const LeftSide = () => {
  return (
    <div className=" w-full h-100vh bg-[white]">
      <div className="h-10vh  pt-2">
        <Rating />
      </div>
      <div className=" mt-9 h-96  bg-[#f6f6f9]"></div>
    </div>
  );
};

export default LeftSide;
