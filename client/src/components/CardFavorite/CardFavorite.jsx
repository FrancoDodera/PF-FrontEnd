import Style from "./CardFavorite.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { removeFav } from "../../redux/actions";
import likeimg from "../../img/like.jpeg";
import noLikeimg from "../../img/nolike.png";
import cart from "../../img/cart.png";
import Swal from "sweetalert2";
const CardFavorites = ({
  id,
  name,
  image,
  price,
  age,
  status,
  category,
  brand,
  description,
}) => {
  const favorites = useSelector((state) => state.favorites);
  const [fav, setFav] = useState(false);
  const dispatch = useDispatch();
  const handleFavorite = () => {
    const id_user = localStorage.getItem("idAuth");
    if (fav) {
      setFav(false);
      dispatch(removeFav(id_user, id));
    } else {
      setFav(true);
      dispatch(addFav(id_user, id));
    }
  };
  const showPopup = () => {
    Swal.fire({
      text: "Car added to cart",
      timer: 700,
      timerProgressBar: true,
      showConfirmButton: false,
      position: "top-end",
      toast: true,
      icon: "success",
    });
  };
  const handleAddToCart = () => {
    const item = {
      id: id,
      amount: 1,
      name: name,
      price: price*0.01,
      totalPrice: price*0.01,
      image: image,
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
    showPopup();
  };

  useEffect(() => {
    favorites.forEach((fav) => {
      if (fav.id_car._id == id) {
        setFav(true);
      }
    });
  }, [favorites]);
  return (
    <div className={Style.container1}>
      <div className={Style.iconsContainer}>
        <img
          className={Style.cart}
          onClick={handleAddToCart}
          src={cart}
          alt=""
        />
        {fav ? (
          <img
            onClick={handleFavorite}
            className={Style.likeImg}
            src={likeimg}
            alt={likeimg}
          />
        ) : (
          <img
            onClick={handleFavorite}
            className={Style.likeImg}
            src={noLikeimg}
            alt={noLikeimg}
          />
        )}
      </div>
      <div className={Style.containerDetails}>
        <Link className={Style.Link} to={`/detail/${id}`}>
          <h1 className={Style.h1}>{name}</h1>
        </Link>
        <Link className={Style.Link} to={`/detail/${id}`}>
          <img className={Style.image} src={image} alt="" />
        </Link>
        <p className={Style.p}>${price}</p>
        <p className={Style.p}>{age}</p>
        <p className={Style.p}>{status}</p>
      </div>
    </div>
  );
};

export default CardFavorites;
