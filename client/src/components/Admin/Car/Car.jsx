import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCars,
  createCar,
  updateCar,
  deleteCar,
} from "../../../redux/actions";
import { useNavigate } from "react-router-dom";

const Car = () => {
  // Redux
  const cars = useSelector((state) => state.allCars);
  const dispatch = useDispatch();

  // Estados
  const [car, setCar] = useState({
    _id: null,
    amount: "",
    idCategory: "",
    idMarca: "",
    name: "",
    status: "",
    age: "",
    price: "",
    action: "",
  });
  const [showModal, setShowModal] = useState(false);

  const handleCar = (event) => {
    const { value } = event.target;
    setCar({ ...car, [event.target.name]: value });
  };

  const showModalCar = () => {
    setCar({ ...car, action: "Create" });
    setShowModal(true);
  };

  const handleDelete = (_id) => {
    dispatch(deleteCar(_id));
  };

  const showModalHandlerEdit = (element) => {
    setCar({ ...element, action: "Edit" });
    setShowModal(true);
  };

  const closeModalCar = () => {
    setShowModal(false);
    setCar({
      _id: null,
      amount: "",
      idCategory: "",
      idMarca: "",
      name: "",
      status: "",
      age: "",
      price: "",
      action: "",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (car.action === "Create") {
      dispatch(
        createCar({
          amount: car.amount,
          idCategory: car.idCategory,
          idMarca: car.idMarca,
          name: car.name,
          status: car.status,
          age: car.age,
          price: car.price,
        })
      );
    } else {
      dispatch(
        updateCar({
          amount: car.amount,
          idCategory: car.idCategory,
          idMarca: car.idMarca,
          name: car.name,
          status: car.status,
          age: car.age,
          price: car.price,
        })
      );
    }
    closeModalCar();
  };

  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto w-full h-[110vh] bg-[#0a192f] text-gray-300">
      <div className="flex justify-between p-8 text-gray-300">
        <button className="btn-secondary" onClick={() => navigate("/admin")}>
          Go Home
        </button>
        <h1 className="text-3xl font-bold">Cars</h1>
        <button className="btn" onClick={showModalCar}>
          Create Car
        </button>
      </div>

      <dialog
        id="my_modal_5"
        className={showModal ? "modal modal-open" : "modal"}
      >
        <form
          method="dialog"
          className="modal-box w-11/12 w-5xl h-auto"
          onSubmit={handleSubmit}
        >
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            type="button"
            onClick={closeModalCar}
          >
            X
          </button>
          {car.action === "Create" ? (
            <h3 className="font-bold text-lg">Create Car</h3>
          ) : (
            <h3 className="font-bold text-lg">Edit Car</h3>
          )}
          <div className="pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium leading-6 text-gray-300"
                >
                  Brand
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="brand"
                    id="brand"
                    value={car.idMarca}
                    onChange={handleCar}
                    className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="model"
                  className="block text-sm font-medium leading-6 text-gray-300"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="model"
                    id="model"
                    value={car.name}
                    onChange={handleCar}
                    className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="year"
                  className="block text-sm font-medium leading-6 text-gray-300"
                >
                  Age
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="year"
                    id="year"
                    value={car.age}
                    onChange={handleCar}
                    className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="year"
                  className="block text-sm font-medium leading-6 text-gray-300"
                >
                  Price
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="year"
                    id="year"
                    value={car.price}
                    onChange={handleCar}
                    className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="year"
                  className="block text-sm font-medium leading-6 text-gray-300"
                >
                  Status
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="year"
                    id="year"
                    value={car.status}
                    onChange={handleCar}
                    className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="year"
                  className="block text-sm font-medium leading-6 text-gray-300"
                >
                  Category
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="year"
                    id="year"
                    value={car.idCategory}
                    onChange={handleCar}
                    className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end ...">
            <button type="submit" className="btn btn-success">
              Save
            </button>
          </div>
        </form>
      </dialog>
      <table className="table text-gray-300">
        <thead>
          <tr>
            <th className="w-[10%] text-gray-300">ID</th>
            <th className="w-[20%] text-gray-300">Name</th>
            <th className="w-[20%] text-gray-300">Amount</th>
            <th className="w-[20%] text-gray-300">Status</th>
            <th className="w-[20%] text-gray-300">Year</th>
            <th className="w-[20%] text-gray-300">Brand</th>
            <th className="w-[20%] text-gray-300">Category</th>
            <th className="w-[20%] text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars?.map((car, index) => {
            return (
              <tr key={car._id}>
                <th>{index + 1}</th>
                <th>{car.name}</th>
                <th>{car.price}</th>
                <th>{car.status}</th>
                <th>{car.age}</th>
                <th>{car.idMarca.name}</th>
                <th>{car.idCategory.name}</th>
                <th>
                  <div className="btn-group">
                    <button
                      className="btn btn-success"
                      onClick={() => showModalHandlerEdit(car)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-error"
                      onClick={() => handleDelete(car._id)}
                    >
                      Delete
                    </button>
                  </div>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Car;
