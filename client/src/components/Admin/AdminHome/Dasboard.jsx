import React from "react";
import Analist from "./analist";

const Dasboard = () => {
  return (
    <div className="bg-[#f6f6f9] p-10 w-full">
      <div>
        <h1 className=" text-black text-3xl font-bold">Dashboard</h1>
      </div>
      <Analist />
    </div>
  );
};

export default Dasboard;
