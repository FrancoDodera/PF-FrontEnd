import React from "react";
import { useNavigate } from "react-router-dom";

const Rating = () => {
  const navigate = useNavigate();
  const profileUrl = localStorage.getItem("profileUrl");
  const logOut = (event) => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="h-19 bg-[#f6f6f9] w-12/12 flex p-2 justify-end rounded-xl">
      <div className="flex items-center h-12 w-full">
        <div className="m-4 text-black">
          <h1>welcome name </h1>
        </div>
        <div className="dropdown dropdown-end ">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-30 h-30 rounded-full">
              <img src={profileUrl} />
            </div>
          </label>
          <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-[gray] rounded-box w-52">
            <li>
              <a href="" onClick={logOut}>
                LogOut
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="secondPart">

      </div>
    </div>
  );
};

export default Rating;
