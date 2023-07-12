import React, { useState, useEffect, useRef } from "react";
import logo from "../../img/Logo.svg";
import user from "../../img/userimg.webp";
import guestUser from '../../img/guestUser.png'
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [username, setUsername] = useState("John Doe"); // En caso de manejar estados de nombre
  const userGuest = localStorage.getItem("guest");
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
  const logOut = (event) => {
    localStorage.clear();
    navigate("/login");
  };
  const logOutGuest=(event)=>{
    localStorage.clear();
    navigate("/login")
  }
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
        <NavLink to={"/favoritos"}>
          <button>Favorites</button>
        </NavLink>
        <NavLink to={"/locations"}>
          <button>Locations</button>
        </NavLink>
        {userGuest ? (
          <div className="userMenuContainer" ref={menuRef}>
            <button className="usernameButton" onClick={toggleMenu}>
              <img className="userMenuImg" src={guestUser} alt="guestUser" />
            </button>
            {isMenuOpen && (
              <div className="dropdownMenu">
                  <button onClick={logOutGuest}>Login</button>
              </div>
            )}
          </div>
        ) : (
          <div className="userMenuContainer" ref={menuRef}>
            <button className="usernameButton" onClick={toggleMenu}>
              <img className="userMenuImg" src={user} alt="user" />
            </button>
            {isMenuOpen && (
              <div className="dropdownMenu">
                <NavLink to={"/userDetail"}>
                  <button>Account Information</button>
                </NavLink>
                <button onClick={logOut}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
