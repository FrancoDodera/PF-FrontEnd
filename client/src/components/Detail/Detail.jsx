import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getCarById } from "../../redux/actions";
import NavBar from "../navbar/NavBar";
const Detail = () => {
  const { id } = useParams();
  const car = useSelector((state) => state.carDetail);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCarById(id));
  }, []);

  return (
    <>
      <div>
        <NavBar />

        <img src={car?.image} alt="" />
      </div>
    </>
  );
};

export default Detail;
