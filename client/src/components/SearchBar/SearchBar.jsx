import { useState, useEffect } from "react";

import style from "../SearchBar/SearchBar.module.css";

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
    <div className={style.search}>
      <input className={style.input}
        value={search}
        onChange={searcher}
        type="text"
        placeholder="Search your product..."
        // className="form-control"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchComponent;
