import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCars, getCarByName } from "../../redux/actions";

const SearchComponent = () => {
  const dispatch = useDispatch();
  const auxCars = useSelector((state) => state.auxCars);

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [showNoCarsMessage, setShowNoCarsMessage] = useState(false);

  const showData = () => {
    dispatch(getAllCars());
  };

  const searcher = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);

    if (!searchValue) {
      setResults(auxCars);
      setShowNoCarsMessage(false);
    }
  };

  const handleSearch = () => {
    if (search) {
      dispatch(getCarByName(search));
      setShowNoCarsMessage(true);
    }
  };

  useEffect(() => {
    showData();
  }, []);

  useEffect(() => {
    setResults(auxCars);
    setShowNoCarsMessage(false);
  }, [auxCars]);

  return (
    <div>
      <input
        value={search}
        onChange={searcher}
        type="text"
        placeholder="Search"
        className="form-control"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchComponent;
