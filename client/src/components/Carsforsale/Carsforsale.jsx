import NavBar from "../navbar/NavBar";
import CardsContainer from "../Cards/Cards";
import Filters from "../filters/Filters";
import SearchComponent from "../SearchBar/SearchBar";
import style from "./Carsforsale.module.css";
import noCarimg from "../../img/nohayautos.png";
import { useSelector, useDispatch } from "react-redux";
import { getAllCars, getAllFavs } from "../../redux/actions";
import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";

const Carsforsale = (props) => {
  const dispatch = useDispatch();
  const allCars = useSelector((state) => state.auxCars);

  const carsActive = allCars.filter((elem) => elem.active == true);
  const favorites = useSelector((state) => state.favorites);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (favorites.length == 0) {
      const id_user = localStorage.getItem("idAuth");
      dispatch(getAllFavs(id_user));
    }
    if (allCars.length === 0) {
      dispatch(getAllCars())
        .then(() => setLoading(false))
        .catch((error) => {
          setLoading(false);
          console.error("Error loading cars:", error);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <div className={style.divContainer}>
        <NavBar />
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="loading ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
          </div>
        ) : (
          <>
            <div className={style.searchContainer}>
              <h2 className={style.h2}>New or used vehicles for sale</h2>
              <SearchComponent className={style.search} />
            </div>
            <div className={style.containerCarsForSale}>
              <Filters />
              {carsActive.length === 0 ? (
                <div className={style.noCarContainer}>
                  <h1 className={style.noCarsMessage}>
                    ¡THERE ARE NO CARS WITH THESE FEATURES!
                  </h1>
                  <img src={noCarimg} alt="Not Car" className={style.image} />
                </div>
              ) : (
                <CardsContainer carsActive={carsActive} />
              )}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Carsforsale;
