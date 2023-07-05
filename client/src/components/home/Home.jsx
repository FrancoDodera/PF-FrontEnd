import React from "react";
import NavBar from "../navbar/NavBar";
import "./home.css";

import Filters from "../filters/Filters";
const Home = () => {
  return (
    <div className="Home_container">
      <NavBar />
      <div className="carpicture">
        <h2>
          "Embark on an emotional journey with carGO: where the passion for cars
          meets the convenience of e-commerce."
        </h2>
      </div>

      <Filters />
    </div>
  );
};

export default Home;
