import React from "react";
import "./About.css";
import car from "../../../img/car.svg";
import carlogito from "../../../img/carrito.svg";
import second from "../../../img/secondLogo.svg";
import selt from "../../../img/selt.svg";
import { Link } from "react-router-dom";
const AboutUS = () => {
  return (
    <div className="container_all">
      <img src={car} alt="" />
      <div className="container_about">
        <h2>About Us</h2>
        <p>
          At carGo, we're passionate about revolutionizing the way you buy and
          sell cars. As an innovative e-commerce platform, we connect car
          enthusiasts and sellers, making the car shopping experience seamless
          and enjoyable. Our mission is to provide a trusted and convenient
          online marketplace where you can find the car of your dreams or
          effortlessly sell your vehicle. With carGo, you'll experience a new
          level of automotive convenience and satisfaction. Join us today and
          let us drive you towards automotive excellence.
        </p>
      </div>
      <section className="container_secondLayer">
        <div className="globalContainer">
          <div className="container_info">
            <div className="150">
              <p className="p">150</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="150"
                height="10"
                viewBox="0 0 250 10"
                fill="none"
              >
                <rect width="144" height="2" rx="1" fill="#004A77" />
                <rect y="4" width="72" height="2" rx="1" fill="#004A77" />
                <rect x="0.5" y="0.5" width="249" height="9" stroke="black" />
              </svg>
              <p>Vehicle In Stock</p>
            </div>
            <div className="happy">
              <p className="p">200</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="150"
                height="10"
                viewBox="0 0 250 10"
                fill="none"
              >
                <rect width="144" height="2" rx="1" fill="#004A77" />
                <rect y="4" width="72" height="2" rx="1" fill="#004A77" />
                <rect x="0.5" y="0.5" width="249" height="9" stroke="black" />
              </svg>
              <p>Happy Customer</p>
            </div>
            <div className="happy">
              <p className="p">100</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="150"
                height="10"
                viewBox="0 0 250 10"
                fill="none"
              >
                <rect width="144" height="2" rx="1" fill="#004A77" />
                <rect y="4" width="72" height="2" rx="1" fill="#004A77" />
                <rect x="0.5" y="0.5" width="249" height="9" stroke="black" />
              </svg>
              <p>Sold Car</p>
            </div>
          </div>
        </div>
        <h1 className="out">Our Services</h1>
        <div className="prueba">
          <Link to={"/carsforsale"} >
            <div className="box">
              <img src={carlogito} alt=""  />
              <p>Buy a  car</p>
            </div>
          </Link>
          
          <Link>
            <div className="box">
              <img src={selt} alt=""  />
              <p>Sell my car</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUS;
