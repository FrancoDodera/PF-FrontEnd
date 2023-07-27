import React from "react";
import style from "./Dashboard.module.css";
import local from "../../../img/local.jpg";
// import Analist from "./analist";
// import RecentOrder from "./RecentOrder";

const Dasboard = () => {
  return (
    <div className="bg-[#0a192f] text-gray-300 p-8 w-full">
      <div>
        {/* <h1 className=" text-3xl font-bold">Dashboard</h1> */}
        <h2 className={style.text}>Welcome to dashboard admin </h2>
        <img className={style.imageLocal} src={local} alt="Concesionaria" />
      </div>

      {/* <Analist />
      <RecentOrder/> */}
    </div>
  );
};

export default Dasboard;
