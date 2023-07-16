import { useState } from "react";
import NavBar from "../navbar/NavBar";
import Card from "./CardDetailCart";
import axios from "axios";

const DetailCart = () => {
  const [loading, setLoading] = useState(false);
  const Cars = localStorage.getItem("cartItems");
  let cars = JSON.parse(Cars);
  console.log(cars);
  const total = "TOTAL";
  let Pay = 0;
  for (let i = 0; i < cars.length; i++) {
    Pay = Pay + cars[i].totalPrice;
  }
  const redirect = async () => {
    setLoading(true);
    const data = await axios.post("https://pf-back.fly.dev/checkout", cars);
    console.log(data.data.response.response.init_point);
    window.location.href = data.data.response.response.init_point;
  };

  if (loading === true) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black bg-opacity-50">
        <div className="border-4 border-white rounded-full h-16 w-16 animate-spin"></div>
        <h1 className="ml-2 text-white">Redirecting</h1>
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
