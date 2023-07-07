import NavBar from "../navbar/NavBar";
import CardsContainer from "../Cards/Cards";
import Filters from "../filters/Filters";
import SearchComponent from "../SearchBar/SearchBar";
import style from "./Carsforsale.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllCars } from "../../redux/actions";
const Carsforsale = (props) => {
  const dispatch = useDispatch();
  const allCars = useSelector((state) => state.auxCars);
  useEffect(() => {
    if (allCars.length === 0) {
      dispatch(getAllCars());
    }
  }, []);

  return (
    <div>
      <NavBar />
      <div className={style.searchContainer}>
        <h2>New or used vehicles for sale</h2>
        <SearchComponent />
      </div>
      <Filters />
      <CardsContainer allCars={allCars} />
    </div>
  );
};

export default Carsforsale;
