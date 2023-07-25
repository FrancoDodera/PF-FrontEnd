import React, { useState } from "react";
import "./About.css";
import car from "../../../img/car.svg";
import carlogito from "../../../img/carrito.svg";
import selt from "../../../img/selt.svg";
import { Link } from "react-router-dom";
import "./About.css";
import img from "../../../img/fotopetri.png";
import img2 from "../../../img/fotobarbara.jpeg";
import img3 from "../../../img/fotoFranco.jpeg";
import user from "../../../img/userimg.webp";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const AboutUS = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMoreInformation = () => {
    setIsFlipped(!isFlipped);
  };

  const handleBackClick = () => {
    setIsFlipped(false);
  };
  return (
    <div className="wrapper">
      <div className={`flip-card ${isFlipped ? "flipped" : ""}`}>
        {/* Front side - Initial Information */}
        <div className="front card">
          <div className="container_about">
            <button onClick={handleMoreInformation}>More Information!</button>
            <img src={car} alt="" className="car-image" />
            <p>
              At carGo, we're passionate about revolutionizing the way you buy
              and sell cars. As an innovative e-commerce platform, we connect
              car enthusiasts and sellers, making the car shopping experience
              seamless and enjoyable. Our mission is to provide a trusted and
              convenient online marketplace where you can find the car of your
              dreams or effortlessly sell your vehicle. With carGo, you'll
              experience a new level of automotive convenience and satisfaction.
            </p>
            <section className="container_secondLayer">
              <div className="globalContainer">
                <div className="container_info">
                  <div className="happy">
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
                      <rect
                        x="0.5"
                        y="0.5"
                        width="249"
                        height="9"
                        stroke="black"
                      />
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
                      <rect
                        x="0.5"
                        y="0.5"
                        width="249"
                        height="9"
                        stroke="black"
                      />
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
                      <rect
                        x="0.5"
                        y="0.5"
                        width="249"
                        height="9"
                        stroke="black"
                      />
                    </svg>
                    <p>Sold Car</p>
                  </div>
                </div>
              </div>
              <h1 className="out">Our Services</h1>
              <div className="prueba">
                <Link to={"/carsforsale"}>
                  <div className="box">
                    <img src={carlogito} alt="" />
                    <p>Buy a car</p>
                  </div>
                </Link>

                <Link>
                  <div className="box">
                    <img src={selt} alt="" />
                    <p>Sell my car</p>
                  </div>
                </Link>
              </div>
            </section>
          </div>
        </div>
        <div className="back card">
          <div className="cards-container">
            <button onClick={handleBackClick}>Back</button>
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
              <img src={user} alt="" className="img-card" />
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
              <img src={img3} alt="" className="img-card" />
              <p>Franco Dodera</p>
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
              <img src={user} alt="" className="img-card" />
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
              <img src={img2} alt="" className="img-card" />
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
              <img src={user} alt="" className="img-card" />
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
              <img src={user} alt="" className="img-card" />
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
              <img src={user} alt="" className="img-card" />
              <p>Hector Solano</p>
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
