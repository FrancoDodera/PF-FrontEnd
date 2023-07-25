import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCars,
  createCar,
  updateCar,
  deleteCar,
  getAllBrands,
  getAllCategories,
} from "../../../redux/actions";
import NavBar from "../NavBar/NavBar.jsx";
import Pagination from "../../Pagination/Pagination";

const Car = () => {
  // Redux
  const cars = useSelector((state) => state.allCars);
  const brands = useSelector((state) => state.allBrands);
  const categories = useSelector((state) => state.allCategories);
  const dispatch = useDispatch();
  const cloudName = "dbt5vgimv";
  // Estados
  const [car, setCar] = useState({
    _id: null,
    amount: 0,
    idCategory: null,
    idMarca: null,
    name: "",
    transmission: "",
    description: "",
    status: "",
    age: 0,
    price: 0,
    action: "",
    image: "",
  });

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = cars.length;
  const indexOfLastBrand = currentPage * itemsPerPage;
  const indexOfFirstBrand = indexOfLastBrand - itemsPerPage;
  const currentCars = cars.slice(indexOfFirstBrand, indexOfLastBrand);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // const getCurrentItems = () => {
  //   const indexOfLastItem = currentPage * itemsPerPage;
  //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //   return cars.slice(indexOfFirstItem, indexOfLastItem);
  // };

  // const handlePrevPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  // const handleNextPage = () => {
  //   const totalPages = Math.ceil(cars.length / itemsPerPage);
  //   if (currentPage < totalPages) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  const [showModal, setShowModal] = useState(false);

  const uploadImage = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "CarGo_Pf_henry");
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      if (res.ok) {
        const file = await res.json();
        return file.secure_url;
      } else {
        return "";
      }
    } catch (error) {
      alert(error);
    }
  };

  const [nameError, setNameError] = useState("");

  const [transmissionError, setTransmissionError] = useState(false);

  const [amountError, setAmountError] = useState("");

  const [ageError, setAgeError] = useState("");

  const [descriptionError, setDescriptionError] = useState(false);

  const [priceError, setPriceError] = useState(false);

  const handleCar = (event) => {
    const { name, value } = event.target;
    setCar({ ...car, [event.target.name]: value });
    if (name === "name") {
      validateName(value);
    } else if (name === "transmission") {
      validateTransmission(value);
    } else if (name === "amount") {
      validateAmount(Number(value));
    } else if (name === "description") {
      validateDescription(value);
    } else if (name === "age") {
      validateAge(Number(value));
    } else if (name === "price") {
      validatePrice(Number(value));
    }
  };

  const validateDescription = (value) => {
    if (value === "") {
      setDescriptionError("The description field cannot be empty");
    } else {
      setDescriptionError("");
    }
  };

  const validatePrice = (value) => {
    if (value === 0) {
      setPriceError("The price field cannot be zero");
    } else {
      setPriceError("");
    }
  };

  const validateAge = (value) => {
    if (value === 0) {
      setAgeError("The age field cannot be zero");
    } else {
      setAgeError("");
    }
  };

  const validateAmount = (value) => {
    if (value === 0) {
      setAmountError("The amount field cannot be zero");
    } else {
      setAmountError("");
    }
  };

  const validateTransmission = (value) => {
    if (value === "") {
      setTransmissionError("The transmission field cannot be empty");
    } else {
      setTransmissionError("");
    }
  };

  const validateName = (value) => {
    if (value.length < 3) {
      setNameError("The name field must have three or more letters");
    } else {
      setNameError("");
    }
  };

  const showModalCar = () => {
    setCar({
      ...car,
      action: "Create",
      status: "new",
      idCategory: categories[0]._id,
      idMarca: brands[0]._id,
    });
    setShowModal(true);
  };

  const handleDelete = (_id) => {
    dispatch(deleteCar(_id));
  };

  const showModalHandlerEdit = (element) => {
    setCar({
      ...element,
      image: "",
      action: "Edit",
      idCategory: element.idCategory._id,
      idMarca: element.idMarca._id,
    });
    setShowModal(true);
  };

  const closeModalCar = () => {
    setShowModal(false);
    setCar({
      _id: null,
      amount: "",
      idCategory: null,
      idMarca: null,
      name: "",
      transmission: "",
      description: "",
      status: "",
      age: "",
      price: "",
      action: "",
      image: "",
    });
  };
  const handlerImage = (event) => {
    const files = event.target.files[0];
    setCar({
      ...car,
      image: files,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let imageUrl = "";
    if (car.action === "Create") {
      if (car.image != "") {
        imageUrl = await uploadImage(car.image);
      }
      if (car.amount === 0) {
        return;
      }
      if (car.name.length < 3) {
        setNameError("The name field must have three or more letters");
        return;
      } else {
        setNameError("");
      }
      const body = {
        amount: car.amount,
        idCategory: car.idCategory,
        idMarca: car.idMarca,
        name: car.name,
        status: car.status,
        age: car.age,
        price: car.price,
        color: "black",
        transmission: car.transmission,
        description: car.description,
        image: imageUrl,
      };
      console.log(body);
      dispatch(createCar(body));
    } else {
      if (car.image != "") {
        imageUrl = await uploadImage(car.image);
      }
      dispatch(
        updateCar({
          id: car._id,
          amount: car.amount,
          idCategory: car.idCategory,
          idMarca: car.idMarca,
          name: car.name,
          status: car.status,
          age: car.age,
          price: car.price,
          color: "",
          transmission: car.transmission,
          description: car.description,
          image: imageUrl,
        })
      );
    }
    closeModalCar();
  };

  useEffect(() => {
    if (cars.length == 0) {
      dispatch(getAllCars());
    }
    if (brands.length == 0) {
      dispatch(getAllBrands());
    }
    if (categories.length == 0) {
      dispatch(getAllCategories());
    }
  }, []);

  return (
    <div className="flex">
      <NavBar />

      <div className="overflow-x-auto w-full bg-[#0a192f] text-gray-300">
        <div className="flex justify-between p-8 text-gray-300">
          <h1 className="text-3xl font-bold">Cars</h1>
          <button className="btn" onClick={showModalCar}>
            Create Car
          </button>
        </div>
        {/* <div className="flex justify-between p-8 text-gray-300">
          <button className="btn" onClick={handlePrevPage}>
            Previous
          </button>
          {Array.from({ length: Math.ceil(cars.length / itemsPerPage) }).map(
            (item, index) => (
              <button
                key={index}
                className={`btn ${
                  currentPage === index + 1 ? "btn-active" : ""
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            )
          )}
          <button className="btn" onClick={handleNextPage}>
            Next
          </button>
        </div> */}
        <dialog
          id="my_modal_5"
          className={showModal ? "modal modal-open" : "modal"}
        >
          <form
            method="dialog"
            className="modal-box w-11/12 max-w-5xl h-auto"
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
              <h3 className="font-bold text-lg  text-gray-300">Create Car</h3>
            ) : (
              <h3 className="font-bold text-lg text-gray-300">Edit Car</h3>
            )}
            <div className="pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                      name="name"
                      id="name"
                      value={car.name}
                      onChange={handleCar}
                      className="block w-full p-3 rounded-md border-0 py-4 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {nameError && (
                    <span className="text-red-500 text-sm">{nameError}</span>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="Transmission"
                    className="block text-sm font-medium leading-6 text-gray-300"
                  >
                    Transmission
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="transmission"
                      id="transmission"
                      value={car.transmission}
                      onChange={handleCar}
                      className="block w-full p-3 rounded-md border-0 py-4 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {transmissionError && (
                    <span className="text-red-500 text-sm">
                      {transmissionError}
                    </span>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="brand"
                    className="block text-sm font-medium leading-6 text-gray-300"
                  >
                    Amount
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      value={car.amount}
                      onChange={handleCar}
                      className="block w-full p-3 rounded-md border-0 py-4 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {amountError && (
                    <span className="text-red-500 text-sm">{amountError}</span>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="model"
                    className="block text-sm font-medium leading-6 text-gray-300"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="description"
                      id="name"
                      value={car.description}
                      onChange={handleCar}
                      className="block w-full p-3 rounded-md border-0 py-4 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {descriptionError && (
                    <span className="text-red-500 text-sm">
                      {descriptionError}
                    </span>
                  )}
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
                      type="number"
                      name="age"
                      id="age"
                      value={car.age}
                      onChange={handleCar}
                      className="block w-full p-3 rounded-md border-0 py-4 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {ageError && (
                    <span className="text-red-500 text-sm">{ageError}</span>
                  )}
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
                      type="number"
                      name="price"
                      id="price"
                      value={car.price}
                      onChange={handleCar}
                      className="block w-full p-3 rounded-md border-0 py-4 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {priceError && (
                    <span className="text-red-500 text-sm">{priceError}</span>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="brand"
                    className="block text-sm font-medium leading-6 text-gray-300"
                  >
                    Brand
                  </label>
                  <div className="mt-2">
                    {/* <input
                      type="text"
                      name="brand"
                      id="idMarca"
                      value={car.idMarca}
                      onChange={handleCar}
                      className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    /> */}
                    {/* {amountError && (
                      <span className="text-red-500 text-sm">
                        {amountError}
                      </span>
                    )} */}
                    <select
                      onChange={handleCar}
                      className="select select-bordered w-full max-w-xs text-gray-300"
                      name="idMarca"
                      id="brand"
                    >
                      {brands?.map((elem, index) => {
                        if (car && car.idMarca) {
                          return (
                            <option
                              key={index}
                              value={elem._id}
                              selected={elem._id == car.idMarca}
                            >
                              {elem.name}
                            </option>
                          );
                        } else {
                          return (
                            <option key={index} value={elem._id}>
                              {elem.name}
                            </option>
                          );
                        }
                      })}
                    </select>
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
                    {/* <input
                      type="text"
                      name="idCategory"
                      id="idCategory"
                      value={car.idCategory}
                      onChange={handleCar}
                      className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    /> */}
                    <select
                      onChange={handleCar}
                      className="select select-bordered w-full max-w-xs text-gray-300"
                      name="idCategory"
                      id="category"
                    >
                      {categories?.map((elem, index) => {
                        if (car && car.idCategory) {
                          return (
                            <option
                              key={index}
                              value={elem._id}
                              selected={elem._id == car.idCategory}
                            >
                              {elem.name}
                            </option>
                          );
                        } else {
                          return (
                            <option key={index} value={elem._id}>
                              {elem.name}
                            </option>
                          );
                        }
                      })}
                    </select>
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
                    <select
                      onChange={handleCar}
                      className="select select-bordered w-full max-w-xs text-gray-300"
                      name="status"
                      id="status"
                    >
                      {car.status != "" ? (
                        <>
                          <option value="new" selected={car.status == "new"}>
                            new
                          </option>
                          <option value="used" selected={car.status == "used"}>
                            used
                          </option>
                        </>
                      ) : (
                        <>
                          <option value="new">new</option>
                          <option value="used">used</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="model"
                    className="block text-sm font-medium leading-6 text-gray-300"
                  >
                    Image
                  </label>
                  <div className="mt-2">
                    <input
                      type="file"
                      name="image"
                      id="image"
                      onChange={handlerImage}
                      className="file-input w-full max-w-xs text-gray-300"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end ">
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
              <th className="w-[10%] text-gray-300">Price</th>
              <th className="w-[10%] text-gray-300">Status</th>
              <th className="w-[10%] text-gray-300">Year</th>
              <th className="w-[10%] text-gray-300">Brand</th>
              <th className="w-[10%] text-gray-300">Category</th>
              <th className="w-[10%] text-gray-300">Active</th>
              <th className="w-[10%] text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCars.map((car, index) => {
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
                    {car.active ? (
                      <button className="btn btn-xs btn-success">
                        Available
                      </button>
                    ) : (
                      <button className="btn btn-xs btn-error">Disabled</button>
                    )}
                  </th>
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
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Car;
