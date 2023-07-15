import React from "react";
import Analist from "./analist";
import RecentOrder from "./RecentOrder";

const Dasboard = () => {
  return (
    <div className="bg-[#f6f6f9] p-8 w-9/12">
      <div>
        <h1 className=" text-black text-3xl font-bold">Dashboard</h1>
      </div>
      <Analist />
      <RecentOrder/>
      
    </div>
    
  );
};

export default Dasboard;
