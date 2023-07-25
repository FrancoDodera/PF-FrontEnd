import style from "./Card.module.css";
import { Link } from "react-router-dom";
import cart from "../../img/cart.png";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { addFav, removeFav } from "../../redux/actions";
import likeimg from "../../img/like.jpeg";
import noLikeimg from "../../img/nolike.png";

const Card = (props) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [fav, setFav] = useState(false);
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const handleFavorite = () => {
    const id_user = localStorage.getItem("idAuth");
    if (fav) {
      setFav(false);
      dispatch(removeFav(id_user, props.id));
    } else {
      setFav(true);
      dispatch(addFav(id_user, props.id));
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
      <div>
        <Link className={style.Link} to={`/detail/${props.id}`}>
          <img className={style.imageCointainer} src={props.image} alt="" />
        </Link>
      </div>
      <div>
        <p>{props.status}</p>
        <Link className={style.Link} to={`/detail/${props.id}`}>
          <h3 className={style.carName}>{props.name} </h3>
        </Link>
        <p className={style.p}>${props.price}</p>
        <p className={style.p}>{props.age}</p>

        {props.mediaReviews > 0 && (
          <div className="rating">
            {reviews.map((elem, index) => {
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
        )}
        <p className={style.celler}>{props.category.name}</p>
      </div>
      <div className={style.iconsContainer}>
        <img
          className={style.cart}
          onClick={handleAddToCart}
          src={cart}
          alt=""
        />
        {fav ? (
          <img
            onClick={handleFavorite}
            className={style.likeImg}
            src={likeimg}
            alt={likeimg}
          />
        ) : (
          <img
            onClick={handleFavorite}
            className={style.likeImg}
            src={noLikeimg}
            alt={noLikeimg}
          />
        )}
      </div>
    </div>
  );
};

export default Card;
