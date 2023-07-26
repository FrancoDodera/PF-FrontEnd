import React, { useEffect, useState } from "react";
import NavBar from "../navbar/NavBar";
import style from "./Favorites.module.css";
import CardFavorites from "../CardFavorite/CardFavorite";
import { useDispatch, useSelector } from "react-redux";
import { getAllFavs } from "../../redux/actions";
import noCarimg from "../../img/nohayautos.png";
import Footer from "../Footer/Footer";

const Favorites = () => {
  const dispatch = useDispatch();
  const favs = useSelector((state) => state.favorites);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const charge = async () => {
      if (favs.length == 0) {
        const id_user = localStorage.getItem("idAuth");
        await dispatch(getAllFavs(id_user));
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    charge();
  }, []);
  return (
    <div className={style.divContainer}>
      <NavBar />
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loading ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        </div>
      ) : favs.length === 0 ? (
        <div className={style.noCarContainer}>
          <h1 className={style.noCarsMessage}>¡NO CARS IN FAVORITES!</h1>
          <img src={noCarimg} alt="Not Car" className={style.image} />
        </div>
      ) : (
        <div className={style.container}>
          {favs.map((fav) => {
            return (
              <CardFavorites
                key={fav.id_favorite}
                id={fav.id_car._id}
                name={fav.id_car.name}
                image={fav.id_car.image}
                price={fav.id_car.price}
                age={fav.id_car.age}
                status={fav.id_car.status}
                category={fav.id_car.category}
                brand={fav.id_car.brand}
                description={fav.id_car.description}
              />
            );
          })}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Favorites;
