import React from "react";
import "./recommended.css";
import CardHome from "../cardsHome/CardsHome";

const Recommended = () => {
  return (
    <div className="container_Recommended">
      <h2>Recommended Cars</h2>
      <div className="container_cardsHome">
        <CardHome />
      </div>
    </div>
  );
};

export default Recommended;
