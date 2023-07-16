import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllSales } from "../../../redux/actions";
import NavBar from "../NavBar/NavBar.jsx";
const Sale = () => {
  //Redux
  const sale = useSelector((state) => state.allSales);
  const dispatch = useDispatch();

  //Estados
  const [showModal, setShowModal] = useState(false);

  const showModalhandlerDetail = (element) => {
    setShowModal(true);
  };

  const handlerDelete = (_id) => {
    dispatch(deleteSale(_id));
  };

  const closeModalSale = () => {
    setShowModal(false);
  };
  useEffect(() => {
    if (sale.length === 0) {
      dispatch(getAllSales());
    }
  }, []);
  const navigate = useNavigate();
  console.log(sale);
  return (
    <div className="flex">
      <NavBar />

      <div className="overflow-x-auto w-full  bg-[#0a192f] text-gray-300">
        <div className="flex justify-between p-8 text-gray-300">
          <h1 className="text-3xl font-bold">Sales</h1>
        </div>
        <dialog
          id="my_modal_3"
          className={showModal ? "modal modal-open" : "modal"}
        >
          <form method="dialog" className="modal-box w-11/12 w-5xl h-auto">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              type="button"
              onClick={closeModalSale}
            >
              X
            </button>
            <h3 className="font-bold text-lg text-gray-300">Sale Detail</h3>
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
                      value={sale.name}
                      className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-gray-300"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <input
                      id="description"
                      name="description"
                      value={sale.description}
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
              <th className="w-[30%] text-gray-300">Date</th>
              <th className="w-[30%] text-gray-300">Total</th>
              <th className="w-[20%] text-gray-300">Accions</th>
            </tr>
          </thead>
          <tbody>
            {sale?.map((element) => {
              return (
                <tr key={element._id}>
                  <th>{element.id_user}</th>
                  <th>{element.description}</th>
                  <th>{element.date}</th>
                  <th>${element.total}</th>
                  <th>
                    <div className="btn-group">
                      <button
                        className="btn btn-success"
                        onClick={() => showModalhandlerDetail(element)}
                      >
                        Detail
                      </button>
                      <button
                        className="btn btn-error"
                        onClick={() => handlerDelete(element._id)}
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
    </div>
  );
};

export default Sale;
