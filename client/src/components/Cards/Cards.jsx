import style from "./Cards.module.css";
import Card from "../Card/Card";
import data from "../../fake-api";

const CardsContainer = () => {
  return (
    <div className={style.container}>
      {data.map(({ name, description, category, image, id, price, age }) => (
        <Card
          key={id}
          id={id}
          name={name}
          image={image}
          description={description}
          category={category}
          price={price}
          age={age}
        />
      ))}
    </div>
  );
};

export default CardsContainer;
