import React from "react";
import NavBar from "../navbar/NavBar";
import "./home.css";

import Filters from "../filters/Filters";
import SellYourCar from "./sellYourCar/SellYourCar";
import Recommended from "./recommended/Recommended";
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
      <div className="banner">
        <Filters />
        <SellYourCar />
      </div>
      <Recommended />
    </div>
  );
};

export default Home;
