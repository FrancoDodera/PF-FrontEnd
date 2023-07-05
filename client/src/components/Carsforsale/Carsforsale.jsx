import NavBar from "../navbar/NavBar";
import CardsContainer from "../Cards/Cards";
import Filters from "../filters/Filters";
const Carsforsale = (props) => {
  return (
    <div>
      <NavBar />
      <Filters />
      <CardsContainer />
    </div>
  );
};

export default Carsforsale;
