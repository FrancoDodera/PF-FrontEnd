import Style from "./CardFavorite.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { removeFav } from "../../redux/actions";

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
    const id_user=localStorage.getItem("idAuth");
    if (fav) {
      setFav(false);
      dispatch(removeFav(id_user, id));
    } else {
      setFav(true);
      dispatch(addFav(id_user, id));
    }
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
      {fav ? (
        <button onClick={handleFavorite}>❤️</button>
      ) : (
        <button onClick={handleFavorite}>🤍</button>
      )}
      <div>
        <h1 className={Style.h1}>{name}</h1>
        <img className={Style.image} src={image} alt="" />
        <p className={Style.p}>${price}</p>
        <p className={Style.p}>{age}</p>
        <p className={Style.p}>{status}</p>
        <p className={Style.p}>{category}</p>
        <p className={Style.p}>{brand}</p>
        {/* <p className={Style.p}>{description}</p> */}
        <Link className={Style.Link} to={`/detail/${id}`}>
          <button className={Style.button}>View Details</button>
        </Link>
      </div>
    </div>
  );
};

export default CardFavorites;
