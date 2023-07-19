import { Link } from "react-router-dom";
import "./CardHome.css";
const CardHome = (props) => {
  const reviews = [1, 2, 3, 4, 5];
  return (
    <>
      <Link className="Link" to={`/detail/${props.id}`}>
        <div className="container">
          <img className="imageCointainer" src={props.image} alt="" />
          <div>
            <p>{props.status}</p>

            <h2>{props.name} </h2>
            {props.mediaReviews > 0 && (
              <div className="rating p-3">
                {reviews.map((elem) => {
                  return (
                    <input
                      key={elem}
                      type="radio"
                      name={`rating-${props.id}`} // Asignar un nombre único basado en el ID del elemento
                      className="mask mask-star-2 bg-orange-400"
                      defaultChecked={elem <= props.mediaReviews}
                      disabled // Marcar solo el elemento con índice 1 como seleccionado (puedes adaptar esto según tus necesidades)
                    />
                  );
                })}
              </div>
            )}
            <h3 className="p">${props.price}</h3>

            <p className="brand">{props.brand.name}</p>
           
          </div>
        </div>
      </Link>
    </>
  );
};

export default CardHome;
