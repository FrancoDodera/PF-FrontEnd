import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <>
      <Link className={style.Link} to={`/detail/${props.id}`}>
        <div className={style.container}>
          <img className={style.imageCointainer} src={props.image} alt="" />
          <div>
            <h3>{props.name} </h3>
            <p className={style.p}>Price:{props.price}</p>
            <p>{props.description}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;
