import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrands } from "../../../redux/actions";

const Brand = () => {
  //redux
  const brands = useSelector((state) => state.allBrands);
  const dispatch = useDispatch();

  //estados
  const [brand, setBrand] = useState({
    _id: null,
    name: "",
    description: "",
    accion: "",
  });
  const [showModal, setShowModal] = useState(false);

  const handleBrand = (event) => {
    const { value } = event.target;
    setBrand({ ...brand, [event.target.name]: value });
  };
  const showModalBrand = () => {
    setBrand({ ...brand, accion: "Crear" });
    setShowModal(true);
  };
  const handlerDelete = (_id) => {
    dispatch(deleteCategoty());
  };
  const showModalhandlerEdit = (element) => {
    setBrand({ ...element, accion: "Editar" });
    setShowModal(true);
  };

  const closeModalCategory = () => {
    setShowModal(false);
    setBrand({
      _id: null,
      name: "",
      description: "",
      accion: "",
    });
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    if (brand.accion === "Crear") {
      dispatch(addBrand(brand));
    } else {
      dispatch(updateBrand(brand));
    }
    closeModalCategory();
  };

  useEffect(() => {
    if (brands.length === 0) {
      dispatch(getAllBrands());
    }
  }, []);

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between p-8">
        <h1 className="text-3xl font-bold">Brands</h1>
        <button className="btn" onClick={showModalBrand}>
          Create Brand
        </button>
      </div>

      <dialog
        id="my_modal_3"
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
          <h3 className="font-bold text-lg">Create Brand</h3>
          <div className="pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={brand.name}
                    onChange={handleBrand}
                    className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <input
                    id="description"
                    name="description"
                    value={brand.description}
                    onChange={handleBrand}
                    className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
      <table className="table">
        <thead>
          <tr>
            <th className="w-[10%]">ID</th>
            <th className="w-[20%]">Name</th>
            <th className="w-[50%]">Description</th>
            <th className="w-[20%]">Accions</th>
          </tr>
        </thead>
        <tbody>
          {brands?.map((element) => {
            return (
              <tr key={element._id}>
                <th>{element._id}</th>
                <th>{element.name}</th>
                <th>{element.description}</th>
                <th>
                  <div className="btn-group">
                    <button
                      className="btn btn-success"
                      onClick={() => showModalhandlerEdit(element)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-error"
                      onClick={() => handlerDelete(element._id)}
                    >
                      Eliminar
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

export default Brand;
