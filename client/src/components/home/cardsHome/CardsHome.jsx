import React, { useEffect } from "react";
import "./CardsHome.css";
import CardHome from "../cardHome/CardHome";
import {useSelector } from "react-redux";

const CardsHome = () => { 
  const cars = useSelector((state) => state.auxCars);
  return (
    <div className="cardsHome_container">
      {cars?.map(({ name, idCategory,idMarca, image, _id, price, age,status }) => (
        <CardHome
          key={_id}
          id={_id}
          name={name}
          image={image}
          category={idCategory}
          brand={idMarca}
          price={price}
          age={age}
          status={status}
        />
      ))}
    </div>
  );
};

export default CardsHome;
