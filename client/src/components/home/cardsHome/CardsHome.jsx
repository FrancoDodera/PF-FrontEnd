import React from "react";
import "./CardsHome.css";
import CardHome from "../cardHome/CardHome";
import data from "../../../fake-api";

const CardsHome = () => {
  return (
    <div className="cardsHome_container">
      {data.map(({ name, category, image, id, price, age }) => (
        <CardHome
          key={id}
          id={id}
          name={name}
          image={image}
          category={category}
          price={price}
          age={age}
        />
      ))}
    </div>
  );
};

export default CardsHome;
