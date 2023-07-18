import React from "react";
import NavBar from "../navbar/NavBar";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllCars } from "../../redux/actions";
import SellYourCar from "./sellYourCar/SellYourCar";
import Recommended from "./recommended/Recommended";
import Find from "./find/Find";
import AboutUS from "./aboutUS/AboutUS";
import Contact from "./contact/Contact";
import CookieBanner from "../../components/CookiesBanner/Cookies";
import { useEffect } from "react";
const Home = () => {
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.auxCars);
  useEffect(() => {
    if (cars.length == 0) {
      dispatch(getAllCars());
    }
  }, []);
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
        <Find />
        <SellYourCar />
        <CookieBanner />
      </div>
      <Recommended />
      <div className="aboutus">
        <AboutUS />
      </div>
      <div className="contact">
        {" "}
        <Contact />
      </div>
    </div>
  );
};

export default Home;
