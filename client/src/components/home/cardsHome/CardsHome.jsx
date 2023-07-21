import React, { useEffect } from "react";
import "./CardsHome.css";
import CardHome from "../cardHome/CardHome";
import {useSelector } from "react-redux";

const CardsHome = () => { 
  const cars = useSelector((state) => state.allCars);
  const carsRecomended=cars.filter((elem)=>elem.mediaReviews >= 3 && elem.active==true)
  return (
    <div className="cardsHome_container">
      {carsRecomended?.map(({ name, idCategory,idMarca, image, _id, price, age,status,mediaReviews }) => (
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
          mediaReviews={mediaReviews}
        />
      ))}
    </div>
  );
};

export default CardsHome;
