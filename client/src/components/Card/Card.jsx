import style from "./Card.module.css";
import { Link } from "react-router-dom";
import cart from "../../img/cart.png";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { addFav, removeFav } from "../../redux/actions";

const Card = (props) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [fav, setFav] = useState(false);
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const handleFavorite = () => {
    if (fav) {
      setFav(false);
      dispatch(removeFav(props.id));
    } else {
      setFav(true);
      dispatch(addFav(props));
    }
  };

  const showPopup = () => {
    Swal.fire({
      text: "Car added to cart",
      timer: 4000,
      timerProgressBar: true,
      showConfirmButton: false,
      position: "top-end",
      toast: true,
      icon: "success",
    });
  };

  const handleAddToCart = () => {
    const item = {
      id: props.id,
      amount: 1,
      name: props.name,
      price: props.price,
      totalPrice: props.price,
      image: props.image,
    };
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      existingItem.amount += 1;
      existingItem.totalPrice = existingItem.price * existingItem.amount;
    } else {
      cartItems.push(item);
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setIsAddedToCart(true);
    showPopup();
  };

  useEffect(() => {
    favorites.forEach((fav) => {
      if (fav.id == props.id) {
        setFav(true);
      }
    });
  }, [favorites]);
  return (
    <div className={style.container}>
      {fav ? (
        <button onClick={handleFavorite}>❤️</button>
      ) : (
        <button onClick={handleFavorite}>🤍</button>
      )}
      <img className={style.imageCointainer} src={props.image} alt="" />
      <div>
        <p>{props.status}</p>
        <h3>{props.name} </h3>
        <p className={style.p}>${props.price}</p>
        <p className={style.p}>{props.age}</p>
        <p className={style.celler}>{props.category.name}</p>
      </div>
      <Link className={style.Link} to={`/detail/${props.id}`}>
        <button className={style.button}>Check availability</button>
      </Link>
      <div className={style.cart} onClick={handleAddToCart}>
        <img src={cart} alt="" />
      </div>
    </div>
  );
};

export default Card;
