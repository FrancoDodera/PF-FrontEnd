import { Link } from "react-router-dom";
import "./CardHome.css";
const CardHome = (props) => {
  return (
    <>
      <Link className="Link" to={`/detail/${props.id}`}>
        <div className="container">
          <img className="imageCointainer" src={props.image} alt="" />
          <div>
            <p>{props.status}</p>
            <h2>{props.name} </h2>
            <h3 className="p">$. {props.price}</h3>
            <p className="brand">{props.brand.name}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CardHome;
