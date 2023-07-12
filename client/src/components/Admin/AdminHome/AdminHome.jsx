import React from "react";
import NavBar from "../NavBar/NavBar.jsx";

const AdminHome = () => {
  return (
    <div className="w-full h-screen bg-[#0a192f]">
      <p className="text-4x1 sm:text-7xl font-bold text-[#ccd8f8] justify-center items-center flex">
        Admin Home
      </p>
      <NavBar />
    </div>
  );
};

export default AdminHome;
