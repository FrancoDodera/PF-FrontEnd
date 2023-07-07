import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { clearDetail, getCarById } from "../../redux/actions";
import NavBar from "../navbar/NavBar";
import style from "./Detail.module.css";
const Detail = () => {
  const { id } = useParams();
  const car = useSelector((state) => state.carDetail);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCarById(id));
    return () => {
      dispatch(clearDetail());
    };
  }, []);

  return (
    <>
      <div>
        <NavBar />
        <div className={style.cont}>
          <div className={style.container}>
            <div className={style.image}>
              <img src={car?.image} alt="" />
            </div>
            <h2>{car?.name}</h2>
            <p>{car?.description}</p>
            <p>{car?.category}</p>
            <p>{car?.marca}</p>
            <p>{car?.age}</p>
            <p>{car?.color}</p>
            <p>{car?.trasmission}</p>
            <p>{car?.price}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
