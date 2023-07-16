import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../img/Logo.svg";
import "./NaBar.css";
const NavBar = () => {
  const navigate = useNavigate();
  const profileUrl = localStorage.getItem("profileUrl");
  const logOut = (event) => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="containerSlite bg-[#597091]">
      <aside>
        <div className="top">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
        </div>
        <div className="sidebar">
          <div
            onClick={() => navigate("/admin")}
            className="home btn btn-ghost normal-case text-xl"
          >
            <span className="material-symbols-sharp">home</span>

            <a>Home</a>
          </div>
          <div
            onClick={() => navigate("/admin/brand")}
            className="brand btn btn-ghost normal-case text-xl"
          >
            <span class="material-symbols-sharp">bolt</span>
            <a>Brand</a>
          </div>
          <div
            onClick={() => navigate("/admin/category")}
            className="category btn btn-ghost normal-case text-xl"
          >
            <span class="material-symbols-sharp">category</span>{" "}
            <a className="">Category</a>
          </div>
          <div
            onClick={() => navigate("/admin/car")}
            className="car btn btn-ghost normal-case text-xl"
          >
            <span class="material-symbols-sharp">directions_car</span>{" "}
            <a>Car</a>
          </div>
          <div
            onClick={() => navigate("/admin/sale")}
            className="sales btn btn-ghost normal-case text-xl"
          >
            <span class="material-symbols-sharp">sell</span>{" "}
            <a className="">Sale</a>
          </div>
          <div
            onClick={() => navigate("/admin/user")}
            className="user btn btn-ghost normal-case text-xl"
          >
            <span class="material-symbols-sharp">person</span>{" "}
            <a className="">User</a>
          </div>
          <div  onClick={() => logOut()} className="user btn btn-ghost normal-case text-xl">
            <a >
              LogOut
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default NavBar;
