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
              dispatch(removeFav(response.data.data._id, id));
            } else {
              setFav(true);
              dispatch(addFav(response.data.data._id, id));
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
