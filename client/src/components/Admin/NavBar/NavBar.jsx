import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const profileUrl=localStorage.getItem("profileUrl")
  const logOut = (event) => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="navbar bg-[#1751a7] text-gray-300">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl" onClick={() => navigate("/admin")}>Home</a>
        <a className="btn btn-ghost normal-case text-xl" onClick={() => navigate("/admin/brand")}>Brand</a>
        <a className="btn btn-ghost normal-case text-xl" onClick={() => navigate("/admin/category")} >Category</a>
        <a className="btn btn-ghost normal-case text-xl" onClick={() => navigate("/admin/car")}>Car</a>
        <a className="btn btn-ghost normal-case text-xl" onClick={() => navigate("/admin/sale")}>Sale</a>
        <a className="btn btn-ghost normal-case text-xl" onClick={() => navigate("/admin/user")}>User</a>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={profileUrl} />
            </div>
          </label>
          <ul
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-[#3c4367] rounded-box w-52"
          >
            <li>
              <a href="" onClick={logOut}>LogOut</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
