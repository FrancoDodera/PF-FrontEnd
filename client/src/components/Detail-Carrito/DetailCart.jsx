import { useEffect, useState } from "react";
import NavBar from "../navbar/NavBar";
import Card from "./CardDetailCart";
import style from "./DetailCart.module.css";
import axios from "axios";
const DetailCart = () => {
  const [loading, setLoading] = useState(false);
  const [Sale, setSale] = useState({
    id_user: "",
    description: "",
    date: new Date(),
    total: 0,
  });
  const getUser = async () => {
    const user = localStorage.getItem("user");
    const admin = localStorage.getItem("admin");
    let postData = {};
    if (user) {
      postData = {
        user: user,
      };
    } else if (admin) {
      postData = {
        user: admin,
      };
    }
    const { data } = await axios.post(
      "https://pf-back.fly.dev/user/verifyUser",
      postData
    );
    setSale({ ...Sale, id_user: data.data._id });
  };

  const Cars = localStorage.getItem("cartItems");
  let cars = JSON.parse(Cars);
  const total = "TOTAL";
  let Pay = 0;
  for (let i = 0; i < cars.length; i++) {
    Pay = Pay + cars[i].totalPrice;
  }
  const redirect = async () => {
    setLoading(true);
    const body = { sale: {...Sale,total:Pay}, detailSale: cars };
    const data = await axios.post("https://pf-back.fly.dev/checkout", body);
    window.location.href = data.data.response.response.init_point;
  };
  useEffect(() => {
    getUser();
  }, []);

  if (loading === true) {
    return (
      <div class={style.overlay}>
        <div class={style.loader}></div>
        <h1>redirecting</h1>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="flex justify-center">
        <div className="flex flex-col w-3/4 p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Cars in Cart:</h2>
          {cars.map((car) => (
            <Card
              key={car.id}
              name={car?.name}
              price={car?.price}
              amount={car.amount}
              totalPrice={car.totalPrice}
              image={car?.image}
            />
          ))}
          {loading && (
            <div className="overlay">
              <div className="loader"></div>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-center ml-8 p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Cart Summary:</h2>
          <div className="flex flex-col gap-2">
            {cars.map((car) => (
              <div className="calculator" key={car.id}>
                <h6 className="text-xl">${car.totalPrice}</h6>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <h2 className="text-lg font-bold">{total}:</h2>
            <h2 className="text-xl">${Pay}</h2>
          </div>

          <button
            className="p-2 px-4 mt-4 bg-gray-200 border-2 rounded text-black text-lg cursor-pointer transition duration-300 hover:bg-teal-400 active:bg-purple-600"
            onClick={redirect}
          >
            RESERVE
          </button>
        </div>
      </div>
    </>
  );
};

export default DetailCart;
