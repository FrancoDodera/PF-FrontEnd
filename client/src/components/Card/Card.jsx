import style from "./Card.module.css";

const Card = (props) => {
  return (
    <div>
      <p>{props.id}</p>
      <h3>{props.name} </h3>
      <p>{props.description}</p>
      <p>{props.category}</p>
      <img src={props.image} alt="" />
      <p>{props.price}</p>
      <p>{props.age}</p>
    </div>
  );
};

export default Card;
