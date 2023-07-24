import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../../redux/actions";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar.jsx";
import Pagination from "../../Pagination/Pagination";
const Category = () => {
  // Redux
  const categories = useSelector((state) => state.allCategories);
  const dispatch = useDispatch();

  // Estados
  const [category, setCategory] = useState({
    _id: null,
    name: "",
    description: "",
    action: "",
  });
  const [showModal, setShowModal] = useState(false);

  //pagination
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = categories.length;
  const indexOfLastBrand = currentPage * itemsPerPage;
  const indexOfFirstBrand = indexOfLastBrand - itemsPerPage;
  const currentCategories = categories.slice(
    indexOfFirstBrand,
    indexOfLastBrand
  );
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCategory = (event) => {
    const { value } = event.target;
    setCategory({ ...category, [event.target.name]: value });
  };

  const showModalCategory = () => {
    setCategory({ ...category, action: "Create" });
    setShowModal(true);
  };

  const handlerDelete = (_id) => {
    dispatch(deleteCategory(_id));
  };

  const showModalHandlerEdit = (element) => {
    setCategory({ ...element, action: "Edit" });
    setShowModal(true);
  };

  const closeModalCategory = () => {
    setShowModal(false);
    setCategory({
      _id: null,
      name: "",
      description: "",
      action: "",
    });
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    if (category.action === "Create") {
      dispatch(
        createCategory({
          name: category.name,
          description: category.description,
        })
      );
    } else {
      dispatch(
        updateCategory({
          id: category._id,
          name: category.name,
          description: category.description,
        })
      );
    }
    closeModalCategory();
  };

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getAllCategories());
    }
  }, []);

  const navigate = useNavigate();

  return (
    <div className="flex">
      <NavBar />

      <div className="overflow-x-auto w-full  bg-[#0a192f] text-gray-300">
        <div className="flex justify-between p-8 text-gray-300">
          <h1 className="text-3xl font-bold">Categories</h1>
          <button className="btn" onClick={showModalCategory}>
            Create Category
          </button>
        </div>

        <dialog
          id="my_modal_5"
          className={showModal ? "modal modal-open" : "modal"}
        >
          <form
            method="dialog"
            className="modal-box w-11/12 w-5xl h-auto"
            onSubmit={handlerSubmit}
          >
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              type="button"
              onClick={closeModalCategory}
            >
              X
            </button>
            {category.action === "Create" ? (
              <h3 className="font-bold text-lg text-gray-300">
                Create Category
              </h3>
            ) : (
              <h3 className="font-bold text-lg text-gray-300">Edit Category</h3>
            )}
            <div className="pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-300"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={category.name}
                      onChange={handleCategory}
                      className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-gray-300"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="description"
                      id="description"
                      value={category.description}
                      onChange={handleCategory}
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
              <th className="w-[30%] text-gray-300">Name</th>
              <th className="w-[50%] text-gray-300">Description</th>
              <th className="w-[20%] text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCategories?.map((category) => {
              return (
                <tr key={category._id}>
                  <th>{category._id}</th>
                  <th>{category.name}</th>
                  <th>{category.description}</th>
                  <th>
                    <div className="btn-group">
                      <button
                        className="btn btn-success"
                        onClick={() => showModalHandlerEdit(category)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-error"
                        onClick={() => handlerDelete(category._id)}
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

export default Category;
