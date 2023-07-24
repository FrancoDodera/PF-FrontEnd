import style from "./Card.module.css";
import { Link } from "react-router-dom";
import cart from "../../img/cart.png";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { addFav, removeFav } from "../../redux/actions";
import axios from "axios";

const Card = (props) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [fav, setFav] = useState(false);
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const handleFavorite = () => {
    const user = localStorage.getItem("user");
    const admin = localStorage.getItem("admin");
    let postData = {};
    if (user) {
      postData = {
        user: user,
      };
    } else if (admin) {
      postData = {
        user: admin,
      };
    }
    if (user || admin) {
      axios
        .post("https://pf-back.fly.dev/user/verifyUser", postData)
        .then((response) => {
          if (response.status === 202 && response.data) {
            if (fav) {
              setFav(false);
              dispatch(removeFav(response.data.data._id, props.id));
            } else {
              setFav(true);
              dispatch(addFav(response.data.data._id, props.id));
            }
          } else {
            console.error("Error getting user account details");
          }
        })
        .catch((error) => {
          console.error("Error making the request:", error);
        });
    } else {
      console.error("No user found in localStorage");
    }
  };
  const reviews = [1, 2, 3, 4, 5];


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
      if (fav.id_car._id == props.id) {
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
        
        {
          props.mediaReviews > 0 && <div className="rating">
          {reviews.map((elem,index) => {
            return (
              <input
                key={index}
                type="radio"
                name={`rating-${props.id}`} // Asignar un nombre único basado en el ID del elemento
                className="mask mask-star-2 bg-orange-400"
                defaultChecked={elem <= props.mediaReviews}
                disabled // Marcar solo el elemento con índice 1 como seleccionado (puedes adaptar esto según tus necesidades)
              />
            );
          })}
        </div>
        }
        <p className={style.celler}>{props.category.name}</p>
        
      </div>

      <Link className={style.Link} to={`/detail/${props.id}`}>
        <button className={style.button}>View Details</button>
      </Link>
      <div className={style.cart} onClick={handleAddToCart}>
        <img src={cart} alt="" />
      </div>
    </div>
  );
};

export default Card;
