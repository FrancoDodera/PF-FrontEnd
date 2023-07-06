import React from "react";
import "./recommended.css";
import CardHome from "../cardHome/CardHome";

const Recommended = () => {
  return (
    <div className="container_Recommended">
      <h2>Recommended Cars</h2>
      <div className="container_cardsHome">
        <CardHome />
        <CardHome />
        <CardHome />
        <CardHome />
        <CardHome />
        <CardHome />
        <CardHome />
        <CardHome />
      </div>
    </div>
  );
};

export default Recommended;
