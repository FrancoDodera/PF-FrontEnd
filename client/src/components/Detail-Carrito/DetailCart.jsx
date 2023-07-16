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
      <div className="flex">
        <div className="relative left-96 max-w-3xl z-0">
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

        <div className="border-4 absolute top-60 right-40 w-96 h-3/6 rounded-xl">
          <h1 className="mx-36 mt-10 text-3xl">Cars:</h1>
          <div className="h-60 w-80 border-2 ml-7 rounded-xl">
            {cars.map((car) => (
              <div className="calculator" key={car.id}>
                <h6 className="inline">{`$ ${car.totalPrice}`}</h6>
              </div>
            ))}
          </div>
          <h1 className="inline-block ml-7 mt-1">{total}</h1>
          <h1 className="text-right text-2xl mr-10 mt-1">${Pay}</h1>

          <button
            className="p-2 px-4 bg-gray-200 border-2 border-gray-200 rounded text-black text-lg cursor-pointer transition duration-300 hover:bg-teal-400 active:bg-purple-600 absolute bottom-10 left-1/2 transform -translate-x-1/2"
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
