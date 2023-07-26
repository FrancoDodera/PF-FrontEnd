import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../img/Logo.svg";
import guestUser from "../../img/guestUser.png";
import "./NavBar.css";
import { useLocation } from "react-router-dom";
import cart from "../../img/cart.png";
import { clearFavs } from "../../redux/actions";
import { useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
const NavBar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const userGuest = localStorage.getItem("guest");
  const profileUrl = localStorage.getItem("profileUrl");
  const cartRef = useRef(null);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.totalPrice,
    0
  );

  const location = useLocation();
  const currentPath = location.pathname;

  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCartItems);
  }, []);

  const handleClickOutside = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      setIsCartOpen(false);
    }
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  const handleStorageChange = (event) => {
    if (event.key === "cartItems") {
      const savedCartItems = JSON.parse(event.newValue) || [];
      setCartItems(savedCartItems);
    }
  };

  const logOut = async () => {
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
    // Realiza la navegación a la página de inicio de sesión o a otra página deseada después de cerrar sesión
  };
  const logOutGuest=()=>{
    localStorage.clear();
    navigate("/login");
  }

  const handleGoToCart = (event) => {
    if (userGuest) {
      Swal.fire({
        icon: "success",
        title: "You must login first",
        position: "top-end",
        showConfirmButton: false,
        timer: 800,
      });
      localStorage.clear("guest");
      navigate("/login");
    } else {
      navigate("/detailcart");
    }
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCartItems);
    setIsCartOpen(true);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCartIconClick = (event) => {
    event.stopPropagation();
    toggleCart();
  };

  const removeFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
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
        <NavLink to={"/favorites"}>
          <button>Favorites</button>
        </NavLink>
        <NavLink to={"/locations"}>
          <button>Locations</button>
        </NavLink>
        <NavLink to={"/news"}>
          <button>News</button>
        </NavLink>
        {currentPath !== "/home" && currentPath !== "/news" && currentPath !== "/locations" && (
          <div className="shopping" ref={cartRef} onClick={handleCartIconClick}>
            <img className="cart-shopping" src={cart} alt="cart" />
            {isCartOpen && (
              <div className="cart-dropdown">
                {cartItems.length > 0 ? (
                  <>
                    {cartItems.map((item) => (
                      <div key={item.id} className="cart-item">
                        {item.name} ${item.totalPrice}{" "}
                        {item.amount > 1 ? `x${item.amount}` : ""}
                        <button
                          className="remove-button"
                          onClick={() => removeFromCart(item.id)}
                        >
                          &#10005;
                        </button>
                      </div>
                    ))}
                    <div className="cart-total">Total: ${totalPrice}</div>
                    <div className="goToCart">
                      <button onClick={handleGoToCart}>Go to cart</button>
                    </div>
                  </>
                ) : (
                  <div className="cart-font">No items in cart</div>
                )}
              </div>
            )}
          </div>
        )}
        {userGuest ? (
          <div className="userMenuContainer" ref={menuRef}>
            <div className="usernameButton" onClick={toggleMenu}>
              <img className="userMenuImg" src={guestUser} alt="guestUser" />
            </div>
            {isMenuOpen && (
              <div className="dropdownMenu">
                <button onClick={logOutGuest}>Login</button>
              </div>
            )}
          </div>
        ) : (
          <div className="userMenuContainer" ref={menuRef}>
            <div className="usernameButton" onClick={toggleMenu}>
              <img className="userMenuImg" src={profileUrl} alt="user" />
            </div>
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
