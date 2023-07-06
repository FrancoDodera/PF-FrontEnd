import React, { useState, useEffect, useRef } from "react";
import logo from "../../img/Logo.svg";
import user from "../../img/userimg.webp";
import "./NavBar.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [username, setUsername] = useState("John Doe"); // En caso de manejar estados de nombre

  const menuRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="container_NavBar">
      <div className="container_Logo">
        <NavLink to={"/home"}>
          <img src={logo} alt="CarGO" />
        </NavLink>
      </div>
      <div className="thinksContainer">
        <NavLink to={"/carsforsale"}>
          <button>Cars For Sale</button>
        </NavLink>
        <NavLink to={"/sellyourcar"}>
          <button>Sell Your Car</button>
        </NavLink>
        <NavLink to={"/locations"}>
          <button>Locations</button>
        </NavLink>
        <div className="userMenuContainer" ref={menuRef}>
          <button className="usernameButton" onClick={toggleMenu}>
            <img className="userMenuImg" src={user} alt="user" />
          </button>
          {isMenuOpen && (
            <div className="dropdownMenu">
              <NavLink to={"/settinguser"}>
                <button>Settings</button>
              </NavLink>
              <NavLink>
                <button>Switch User</button>
              </NavLink>
              <NavLink to={"/login"}>
                <button>Logout</button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
