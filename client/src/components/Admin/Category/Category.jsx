import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, deleteCategory, getAllCategories,updateCategory} from "../../../redux/actions";
import { useNavigate } from "react-router-dom";
const Category = () => {
  //redux
  const categories = useSelector((state) => state.allCategories);
  const dispatch = useDispatch();

  //estados
  const [category, setCategory] = useState({
    _id: null,
    name: "",
    description: "",
    accion: "",
  });
  const [showModal, setShowModal] = useState(false);

  const handleCategory = (event) => {
    const { value } = event.target;
    setCategory({ ...category, [event.target.name]: value });
  };

  const showModalCategory = () => {
    setCategory({ ...category, accion: "Create" });
    setShowModal(true);
  };
  const handlerDelete = (_id) => {
    dispatch(deleteCategory());
  };

  const showModalhandlerEdit = (element) => {
    setCategory({ ...element, accion: "Edit" });
    setShowModal(true);
  };

  const closeModalCategory = () => {
    setShowModal(false);
    setCategory({
      _id: null,
    name: "",
    description: "",
    accion: "",
    });
  };
  const handlerSubmit = (event) => {
    event.preventDefault();
    if (category.accion === "Create") {
      dispatch(
        createCategory({ name: category.name, description: category.description })
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
    if(categories.length==0){
      dispatch(getAllCategories());
    } 
  }, []);
  const navigate = useNavigate();


  return (
    <div className="overflow-x-auto w-full h-[110vh] bg-[#0a192f] text-gray-300">
      <div className="flex justify-between p-8 text-gray-300">
      <button className="btn-secondary" onClick={() => navigate("/admin")}>
          Go Home
        </button>
        <h1 className="text-3xl font-bold">Categories</h1>
        <button  className="btn" onClick={showModalCategory}>
          Create Category
        </button>
      </div>

      <dialog
        id="my_modal_3"
        className={showModal ? "modal modal-open" : "modal"}
      >
        <form
          onSubmit={handlerSubmit}
          method="dialog"
          className="modal-box w-11/12 max-w-5xl"
        >
          <button
            type="button"
            onClick={closeModalCategory}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <h3 className="font-bold text-lg">Create category</h3>
          <div className="pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              
              <div className="sm:col-span-2">
                <label
                  htmlFor="Nombre"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="Name"
                    id="Name"
                    value={category.name}
                    onChange={handleCategory}
                    className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="Descripcion"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="Description"
                    name="Description"
                    value={category.description}
                    onChange={handleCategory}
                    className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end ...">
            <button type="submit" className="btn btn-success">
             SAVE
            </button>
          </div>
        </form>
      </dialog>
      <table className="table">
        <thead>
          <tr>
          <th className="w-[10%] text-gray-630">ID</th>
            <th className="w-[20%] text-gray-300">Name</th>
            <th className="w-[50%] text-gray-300">Descriptions</th>
            <th className="w-[20%] text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((element) => {
            return (
              <tr key={element._id}>
                <th>{element._id}</th>
                <th>{element.name}</th>
                <th>{element.description}</th>
                <th>
                    <div className="btn-group">
                      <button className="btn btn-success" onClick={()=>showModalhandlerEdit(element)}>Edit</button>
                      <button className="btn btn-error" onClick={()=>handlerDelete(element.ID)}>Delete</button>
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
export default Category;
