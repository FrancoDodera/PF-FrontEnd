import style from "./Cards.module.css";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Pagination from "../Pagination/Pagination";

const CardsContainer = () => {
  const cars = useSelector((state) => state.auxCars);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [carsDisplayed, setCarsDisplayed] = useState([]);

  useEffect(() => {
    setCarsDisplayed(
      cars.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    );
  }, [cars, currentPage]);

  const totalItems = cars.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={style.container}>
      {carsDisplayed.map(({ name, image, _id, price, age, status }) => (
        <Card
          key={_id}
          id={_id}
          name={name}
          image={image}
          price={price}
          age={age}
          status={status}
        />
      ))}
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CardsContainer;
