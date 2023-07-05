import React from "react";
import logo from "../../img/Logo.svg";
import "./NavBar.css";
const NavBar = () => {
  return (
    <div className="container_NavBar">
      <div className="container_Logo">
        <img src={logo} alt="CarGO" />
      </div>
      <div className="thinksContainer">
        <a>Cars for sale</a>
        <a>Sell Your Car</a>
        <a>Locations</a>
        <a>Menu</a>
      </div>
    </div>
  );
};

export default NavBar;
