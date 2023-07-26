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
import img4 from "../../../img/monocuco.jpg";
import img5 from "../../../img/alfredo.jpg";
import img6 from "../../../img/WhatsApp Image 2023-07-26 at 19.42.12.jpeg"
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
      {/* Front side - Initial Information */}
      <div className={`flip-card ${isFlipped ? "flipped" : ""}`}>
        <div className="front card">
          <div className="container_about">
            <button className="button-more" onClick={handleMoreInformation}>
              More Information!
            </button>
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
              <div className="box_container">
                <Link to={"/carsforsale"}>
                  <div className="box a">
                    <img src={carlogito} alt="" />
                  </div>
                  <div className="box b">
                    <p>Buy a car</p>
                  </div>
                </Link>

                <Link>
                  <div className="box c">
                    <img src={selt} alt="" />
                  </div>
                  <div className="box d">
                    <p>Sell my car</p>
                  </div>
                </Link>
              </div>
            </section>
          </div>
        </div>
        <div className="back card">
          <div className="cards-container">
            <button onClick={handleBackClick} className="button-more">
              Back
            </button>
            <div
              className="cards"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img src={img} alt="" className="img-card" />
              <p>Francisco Petri</p>
              <div className={`icon-container ${isHovered ? "visible" : ""}`}>
                <p>Full Stack Web Developer</p>
                <a
                  href="https://www.linkedin.com/in/fran-petri/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="icon-button">
                    {" "}
                    <FaLinkedin size={30} />
                  </button>
                </a>
                <a
                  href="https://github.com/franpetri7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="icon-button">
                    {" "}
                    <FaGithub size={30} />
                  </button>
                </a>
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
                <a
                  href="https://www.linkedin.com/in/ezequiel-capretta-17a14b265/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="icon-button">
                    {" "}
                    <FaLinkedin size={30} />
                  </button>
                </a>
                <a
                  href="https://github.com/Ezecapretta"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="icon-button">
                    {" "}
                    <FaGithub size={30} />
                  </button>
                </a>
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
                <a
                  href="https://www.linkedin.com/in/franco-rodriguez-dodera/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="icon-button">
                    {" "}
                    <FaLinkedin size={30} />
                  </button>
                </a>
                <a
                  href="https://github.com/FrancoDodera"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="icon-button">
                    {" "}
                    <FaGithub size={30} />
                  </button>
                </a>
              </div>
            </div>
            <div
              className="cards"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img src={img5} alt="" className="img-card" />
              <p>Alfredo Parada</p>
              <div className={`icon-container ${isHovered ? "visible" : ""}`}>
                <p>Full Stack Web Developer</p>
                <a
                  href="https://www.linkedin.com/in/alfredo-parada/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="icon-button">
                    {" "}
                    <FaLinkedin size={30} />
                  </button>
                </a>
                <a
                  href="https://github.com/AlfredoPA22"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="icon-button">
                    {" "}
                    <FaGithub size={30} />
                  </button>
                </a>
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
                <a
                  href="https://www.linkedin.com/in/barbararuiz6/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="icon-button">
                    {" "}
                    <FaLinkedin size={30} />
                  </button>
                </a>
                <a
                  href="https://github.com/BarbaraR06"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="icon-button">
                    {" "}
                    <FaGithub size={30} />
                  </button>
                </a>
              </div>
            </div>
            <div
              className="cards"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img src={img6} alt="" className="img-card" />
              <p>Lautaro Gimenez</p>
              <div className={`icon-container ${isHovered ? "visible" : ""}`}>
                <p>Full Stack Web Developer</p>
                <a
                  href="https://www.linkedin.com/in/lautaro-gimenez-b7648b274/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="icon-button">
                    {" "}
                    <FaLinkedin size={30} />
                  </button>
                </a>
                <a
                  href="https://github.com/lautaro-gimenez"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="icon-button">
                    {" "}
                    <FaGithub size={30} />
                  </button>
                </a>
              </div>
            </div>
            <div
              className="cards"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img src={user} alt="" className="img-card" />
              <p>Melody Ponczko</p>
              <div className={`icon-container ${isHovered ? "visible" : ""}`}>
                <p>Full Stack Web Developer</p>
                <a
                  href="https://www.linkedin.com/in/melody-ponczko-047545269/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="icon-button">
                    {" "}
                    <FaLinkedin size={30} />
                  </button>
                </a>
                <a
                  href="https://github.com/MelodyFss"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="icon-button">
                    {" "}
                    <FaGithub size={30} />
                  </button>
                </a>
              </div>
            </div>
            <div
              className="cards"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img src={img4} alt="" className="img-card" />
              <p>Hector Solano</p>
              <div className={`icon-container ${isHovered ? "visible" : ""}`}>
                <p>Full Stack Web Developer</p>
                <a
                  href="https://www.linkedin.com/in/hector-solano-4550bb237/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="icon-button">
                    {" "}
                    <FaLinkedin size={30} />
                  </button>
                </a>
                <a
                  href="https://github.com/monocuco01"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="icon-button">
                    {" "}
                    <FaGithub size={30} />
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUS;
