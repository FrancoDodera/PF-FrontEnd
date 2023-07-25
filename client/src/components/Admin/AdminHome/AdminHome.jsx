import React from "react";
import NavBar from "../NavBar/NavBar.jsx";
import Dasboard from "./Dasboard.jsx";

const AdminHome = () => {
  return (
    <div className="font-lamia flex">
      <NavBar />
      <Dasboard />
    </div>
  );
};

export default AdminHome;
