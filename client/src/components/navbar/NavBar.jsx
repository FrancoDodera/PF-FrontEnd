import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../img/Logo.svg";
import user from "../../img/userimg.webp";
import guestUser from "../../img/guestUser.png";
import "./NavBar.css";
import { useLocation } from "react-router-dom";
import cart from "../../img/cart.png";

const NavBar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const userGuest = localStorage.getItem("guest");
  const userUser = localStorage.getItem("user");
  const profileUrl = localStorage.getItem("profileUrl");
  const cartRef = useRef(null);
  const menuRef = useRef(null);
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

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
    // Realiza la navegación a la página de inicio de sesión o a otra página deseada después de cerrar sesión
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCartItems);
    setIsCartOpen(true);
  };

  const logOutGuest = (event) => {
    localStorage.clear();
    navigate("/login");
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

  const handleGoToCart = () => {
    if (userGuest) {
      navigate("/login");
    } else {
      navigate("/cart");
    }
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
                  <Link to="/cart" className="goToCart">
                    <button onClick={handleGoToCart}>Go to cart</button>
                  </Link>
                </>
              ) : (
                <div className="cart-font">No items in cart</div>
              )}
            </div>
          )}
        </div>
        {userGuest ? (
          <div className="userMenuContainer" ref={menuRef}>
            <button className="usernameButton" onClick={toggleMenu}>
              <img className="userMenuImg" src={guestUser} alt="guestUser" />
            </button>
            {isMenuOpen && (
              <div className="dropdownMenu">
                  <button onClick={logOut}>Login</button>
              </div>
            )}
          </div>
        ) : (
          <div className="userMenuContainer" ref={menuRef}>
            <button className="usernameButton" onClick={toggleMenu}>
              <img className="userMenuImg" src={profileUrl} alt="user" />
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
