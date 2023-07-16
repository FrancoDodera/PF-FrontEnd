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
    <div className=" flex">
      <div className="containerSlite bg-[#f6f6f9]">
        <aside>
          <div className="top">
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>
          </div>
          <div className="sidebar">
            <div className="home btn btn-ghost normal-case text-xl">
              <span class="material-symbols-sharp">home</span>

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
          </div>
        </aside>
      </div>
      {/* <div className="navbar bg-[gray] text-gray-300 items-end justify-end w-3 pr-10 h-8">
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={profileUrl} />
              </div>
            </label>
            <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-[#3c4367] rounded-box w-52">
              <li>
                <a href="" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>{" "} */}
    </div>
  );
};

export default NavBar;
