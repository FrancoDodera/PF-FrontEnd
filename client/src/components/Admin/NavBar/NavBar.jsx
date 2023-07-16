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
            <div className="home btn btn-ghost normal-case text-xl">
              <span className="material-symbols-sharp">home</span>

              <a onClick={() => navigate("/admin")}>Home</a>
            </div>
            <div className="brand btn btn-ghost normal-case text-xl">
              <span class="material-symbols-sharp">bolt</span>
              <a className="" onClick={() => navigate("/admin/brand")}>
                Brand
              </a>
            </div>
            <div className="category btn btn-ghost normal-case text-xl">
              <span class="material-symbols-sharp">category</span>{" "}
              <a className="" onClick={() => navigate("/admin/category")}>
                Category
              </a>
            </div>
            <div className="car btn btn-ghost normal-case text-xl">
              <span class="material-symbols-sharp">directions_car</span>{" "}
              <a className="" onClick={() => navigate("/admin/car")}>
                Car
              </a>
            </div>
            <div className="sales btn btn-ghost normal-case text-xl">
              <span class="material-symbols-sharp">sell</span>{" "}
              <a className="" onClick={() => navigate("/admin/sale")}>
                Sale
              </a>
            </div>
            <div className="user btn btn-ghost normal-case text-xl">
              <span class="material-symbols-sharp">person</span>{" "}
              <a className="" onClick={() => navigate("/admin/user")}>
                User
              </a>
            </div>
            <div className="user btn btn-ghost normal-case text-xl">
              
              <a className="" onClick={() => logOut()}>
                LogOut
              </a>
            </div>
          </div>
        </aside>
      </div>
  );
};

export default NavBar;
