import style from "./Cards.module.css";
import Card from "../Card/Card";
import { useSelector } from "react-redux";

const CardsContainer = () => {
  const cars = useSelector((state) => state.auxCars);
  return (
    <div className={style.container}>
      {cars.map(({ name, category, image, _id, price, age ,status}) => (
        <Card
          key={_id}
          id={_id}
          name={name}
          image={image}
          category={category}
          price={price}
          age={age}
          status={status}
        />
      ))}
    </div>
  );
};

export default CardsContainer;
