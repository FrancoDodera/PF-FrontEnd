import React from "react";
import Analist from "./analist";
import RecentOrder from "./RecentOrder";

const Dasboard = () => {
  return (
    <div className="bg-[#0a192f] text-gray-300 p-8 w-full">
      <div>
        <h1 className=" text-3xl font-bold">Dashboard</h1>
      </div>
      <Analist />
      <RecentOrder/>
      
    </div>
    
  );
};

export default Dasboard;
