import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[80px] flex justify-evenly items-center px-4 bg-[#0a192f] text-gray-300">
      <button className="btn-primary" onClick={() => navigate("/admin/brand")}>
        Brand
      </button>
      <button className="btn-primary" onClick={() => navigate("/admin/car")}>
        Car
      </button>
      <button
        className="btn-primary"
        onClick={() => navigate("/admin/category")}
      >
        Category
      </button>
      <button className="btn-primary" onClick={() => navigate("/admin/sale")}>
        Sale
      </button>
      <button className="btn-primary" onClick={() => navigate("/admin/user")}>
        User
      </button>
    </div>
  );
};

export default NavBar;
