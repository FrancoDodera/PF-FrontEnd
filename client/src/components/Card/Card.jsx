import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <>
      <Link className={style.Link} to={`/detail/${props.id}`}>
        <div className={style.container}>
          <img className={style.imageCointainer} src={props.image} alt="" />
          <div>
            <p>new</p>
            <h3>{props.name} </h3>
            <p className={style.p}>{props.price}</p>
            <p className={style.celler}>celler</p>
          </div>
          <button className={style.button}>Check availability</button>
        </div>
      </Link>
    </>
  );
};

export default Card;
