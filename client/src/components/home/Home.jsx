import React from "react";
import NavBar from "../navbar/NavBar";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllCars, getAllFavs } from "../../redux/actions";
import SellYourCar from "./sellYourCar/SellYourCar";
import Recommended from "./recommended/Recommended";
import Find from "./find/Find";
import AboutUS from "./aboutUS/AboutUS";
import Contact from "./contact/Contact";
import CookieBanner from "../../components/CookiesBanner/Cookies";
import { useEffect } from "react";
import axios from "axios";
const Home = () => {
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.auxCars);

  useEffect(() => {
    if (cars.length == 0) {
      dispatch(getAllCars());
      const user = localStorage.getItem("user");
      const admin = localStorage.getItem("admin");
      let postData = {};
      if (user) {
        postData = {
          user: user,
        };
      } else if (admin) {
        postData = {
          user: admin,
        };
      }
      if (user || admin) {
        axios
          .post("https://pf-back.fly.dev/user/verifyUser", postData)
          .then((response) => {
            if (response.status === 202 && response.data) {
              dispatch(getAllFavs(response.data.data._id));
            } else {
              console.error("Error getting user account details");
            }
          })
          .catch((error) => {
            console.error("Error making the request:", error);
          });
      } else {
        console.error("No user found in localStorage");
      }
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
