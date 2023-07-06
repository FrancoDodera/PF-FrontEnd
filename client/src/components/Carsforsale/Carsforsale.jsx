import NavBar from "../navbar/NavBar";
import CardsContainer from "../Cards/Cards";
import Filters from "../filters/Filters";
import SearchComponent from "../SearchBar/SearchBar";
import style from "./Carsforsale.module.css";
const Carsforsale = (props) => {
  return (
    <div>
      <NavBar />
      <div className={style.searchContainer}>
        <h2>New or used vehicles for sale</h2>
        <SearchComponent />
      </div>
      <Filters />
      <CardsContainer />
    </div>
  );
};

export default Carsforsale;
