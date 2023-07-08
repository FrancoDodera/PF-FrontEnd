import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <>
      <div className={style.container}>
        <img className={style.imageCointainer} src={props.image} alt="" />
        <div>
          <p>{props.status}</p>
          <h3>{props.name} </h3>
          <p className={style.p}>{props.price}</p>
          <p className={style.p}>{props.age}</p>
          <p className={style.celler}>celler</p>
        </div>
        <Link className={style.Link} to={`/detail/${props.id}`}>
          <button className={style.button}>Check availability</button>
        </Link>
      </div>
    </>
  );
};

export default Card;
