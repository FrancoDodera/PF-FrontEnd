import React from "react";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearFavs } from "../../../redux/actions";
import logo from "../../../img/Logo.svg";
import "./NaBar.css";
import axios from "axios";
const NavBar = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const profileUrl = localStorage.getItem("profileUrl");
  const [cartItems, setCartItems] = useState([]);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.totalPrice,
    0
  );
  const logOut = async(event) => {
    const id_user = localStorage.getItem("idAuth");
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const body = {
      sale: {
        id_user: id_user,
        description: "in cart",
        date: new Date().toISOString(),
        total: totalPrice,
      },
      detailSale: savedCartItems,
    };
    await axios.post("/sale", body);
    localStorage.clear();
    dispatch(clearFavs());
    navigate("/login");
  };
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCartItems);
  }, []);
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
            <span className="material-symbols-sharp">bolt</span>
            <a>Brand</a>
          </div>
          <div
            onClick={() => navigate("/admin/category")}
            className="category btn btn-ghost normal-case text-xl"
          >
            <span className="material-symbols-sharp">category</span>{" "}
            <a className="">Category</a>
          </div>
          <div
            onClick={() => navigate("/admin/car")}
            className="car btn btn-ghost normal-case text-xl"
          >
            <span className="material-symbols-sharp">directions_car</span>{" "}
            <a>Car</a>
          </div>
          <div
            onClick={() => navigate("/admin/sale")}
            className="sales btn btn-ghost normal-case text-xl"
          >
            <span className="material-symbols-sharp">sell</span>{" "}
            <a className="">Sale</a>
          </div>
          <div
            onClick={() => navigate("/admin/user")}
            className="user btn btn-ghost normal-case text-xl"
          >
            <span className="material-symbols-sharp">person</span>{" "}
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
