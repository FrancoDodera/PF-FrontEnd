import React, { useState } from "react";
import "./About.css";
import car from "../../../img/car.svg";
import carlogito from "../../../img/carrito.svg";
import second from "../../../img/secondLogo.svg";
import selt from "../../../img/selt.svg";
import { Link } from "react-router-dom";
import "./About.css";
import img from "../../../img/fotopetri.png";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const AboutUS = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="wrapper">
      <div className="flip-card">
        <div className="front card">
          <div className=".container_about">
            <img src={car} alt="" />
            <h2>About Us</h2>
            <p>
              At carGo, we're passionate about revolutionizing the way you buy
              and sell cars. As an innovative e-commerce platform, we connect
              car enthusiasts and sellers, making the car shopping experience
              seamless and enjoyable. Our mission is to provide a trusted and
              convenient online marketplace where you can find the car of your
              dreams or effortlessly sell your vehicle. With carGo, you'll
              experience a new level of automotive convenience and satisfaction.
              Join us today and let us drive you towards automotive excellence.
            </p>
          </div>
        </div>
        <div className="back card">
          <div className="cards-container">
            <div
              className="cards"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img src={img} alt="" className="img-card" />
              <p>Francisco Petri</p>
              <div className={`icon-container ${isHovered ? "visible" : ""}`}>
                <p>Full Stack Web Developer</p>
                <button className="icon-button">
                  {" "}
                  <FaLinkedin size={30} />
                </button>
                <button className="icon-button">
                  {" "}
                  <FaGithub size={30} />
                </button>
              </div>
            </div>
            <div
              className="cards"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img src={img} alt="" className="img-card" />
              <p>Ezequiel Capretta</p>
              <div className={`icon-container ${isHovered ? "visible" : ""}`}>
                <p>Full Stack Web Developer</p>
                <button className="icon-button">
                  {" "}
                  <FaLinkedin size={30} />
                </button>
                <button className="icon-button">
                  {" "}
                  <FaGithub size={30} />
                </button>
              </div>
            </div>
            <div
              className="cards"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img src={img} alt="" className="img-card" />
              <p>Franco Rodriguez Dodera</p>
              <div className={`icon-container ${isHovered ? "visible" : ""}`}>
                <p>Full Stack Web Developer</p>
                <button className="icon-button">
                  {" "}
                  <FaLinkedin size={30} />
                </button>
                <button className="icon-button">
                  {" "}
                  <FaGithub size={30} />
                </button>
              </div>
            </div>
            <div
              className="cards"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img src={img} alt="" className="img-card" />
              <p>Alfredo Parada</p>
              <div className={`icon-container ${isHovered ? "visible" : ""}`}>
                <p>Full Stack Web Developer</p>
                <button className="icon-button">
                  {" "}
                  <FaLinkedin size={30} />
                </button>
                <button className="icon-button">
                  {" "}
                  <FaGithub size={30} />
                </button>
              </div>
            </div>
            <div
              className="cards"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img src={img} alt="" className="img-card" />
              <p>Barbara Ruiz</p>
              <div className={`icon-container ${isHovered ? "visible" : ""}`}>
                <p>Full Stack Web Developer</p>
                <button className="icon-button">
                  {" "}
                  <FaLinkedin size={30} />
                </button>
                <button className="icon-button">
                  {" "}
                  <FaGithub size={30} />
                </button>
              </div>
            </div>
            <div
              className="cards"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img src={img} alt="" className="img-card" />
              <p>Lautaro Gimenez</p>
              <div className={`icon-container ${isHovered ? "visible" : ""}`}>
                <p>Full Stack Web Developer</p>
                <button className="icon-button">
                  {" "}
                  <FaLinkedin size={30} />
                </button>
                <button className="icon-button">
                  {" "}
                  <FaGithub size={30} />
                </button>
              </div>
            </div>
            <div
              className="cards"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img src={img} alt="" className="img-card" />
              <p>Melody Ponczyo</p>
              <div className={`icon-container ${isHovered ? "visible" : ""}`}>
                <p>Full Stack Web Developer</p>
                <button className="icon-button">
                  {" "}
                  <FaLinkedin size={30} />
                </button>
                <button className="icon-button">
                  {" "}
                  <FaGithub size={30} />
                </button>
              </div>
            </div>
            <div
              className="cards"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img src={img} alt="" className="img-card" />
              <p>Hector</p>
              <div className={`icon-container ${isHovered ? "visible" : ""}`}>
                <p>Full Stack Web Developer</p>
                <button className="icon-button">
                  {" "}
                  <FaLinkedin size={30} />
                </button>
                <button className="icon-button">
                  {" "}
                  <FaGithub size={30} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUS;
