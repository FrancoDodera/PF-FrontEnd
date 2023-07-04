import style from "./Card.module.css";

const Card = (props) => {
  return (
    <div>
      <h3>{props.name} </h3>
      <p>{props.description}</p>
      <p>{props.categoria}</p>
      <img src={props.image} alt="" />
    </div>
  );
};

export default Card;
