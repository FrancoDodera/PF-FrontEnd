import React, { useEffect } from "react";
import "./CardsHome.css";
import CardHome from "../cardHome/CardHome";
import {useSelector } from "react-redux";

const CardsHome = () => { 
  const cars = useSelector((state) => state.auxCars);
  return (
    <div className="cardsHome_container">
      {cars?.map(({ name, category, image, _id, price, age }) => (
        <CardHome
          key={_id}
          id={_id}
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
