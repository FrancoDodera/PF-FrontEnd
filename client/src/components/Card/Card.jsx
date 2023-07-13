import style from "./Card.module.css";
import { Link } from "react-router-dom";
import cart from "../../img/cart.png";
import React, { useState } from "react";

const Card = (props) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleAddToCart = () => {
    const item = {
      id:props.id,
      amount:1,
      name: props.name,
      price: props.price,
    };
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCartItems = [...cartItems, item];
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    cartItems.push(item);
    
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setIsAddedToCart(true);
  };
  return (
      <div className={style.container}>
        <img className={style.imageCointainer} src={props.image} alt="" />
        <div>
          <p>{props.status}</p>
          <h3>{props.name} </h3>
          <p className={style.p}>$. {props.price}</p>
          <p className={style.p}>{props.age}</p>
          <p className={style.celler}>{props.category.name}</p>
        </div>
        <Link className={style.Link} to={`/detail/${props.id}`}>
          <button className={style.button}>Check availability</button>
        </Link>
        <div className={style.cart} onClick={handleAddToCart}>
          <img src={cart} alt=""/>
        </div>
      </div>
  );
};



export default Card;
