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
  const handleBrand = (event) => {
    const { value } = event.target;
    setBrand({ ...brand, [event.target.name]: value });
  };
  const createBrand = () => {
    setBrand({ ...brand, accion: "Crear" });
  };
  const handlerDelete = (_id) => {
    dispatch(deleteCategoty());
  };
  const handlerEdit = (element) => {
    setBrand({ ...element, accion: "Editar" });
  };

  useEffect(() => {
    if (brands.length === 0) {
      dispatch(getAllBrands());
    }
  }, []);

  return (
    <div>
      <div>
        <button onClick={createBrand}>Crear Categoria</button>
      </div>
      <div>
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          name="name"
          id="name"
          value={brand.name}
          onChange={handleBrand}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={brand.description}
          onChange={handleBrand}
        ></textarea>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Accions</th>
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
                  <button onClick={() => handlerEdit(element)}>Editar</button>
                  <button onClick={() => handlerDelete(element._id)}>
                    Eliminar
                  </button>
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
