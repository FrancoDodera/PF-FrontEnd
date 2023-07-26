import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllSales } from "../../../redux/actions";
import NavBar from "../NavBar/NavBar.jsx";
import axios from "axios";
import Pagination from "../../Pagination/Pagination";
const Sale = () => {
  //Redux
  const sale = useSelector((state) => state.allSales);
  const [dataDetail, setDataDetail] = useState([]);
  const dispatch = useDispatch();

  //Estados
  const [showModal, setShowModal] = useState(false);

  //Pagination
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = sale.length;
  const indexOfLastBrand = currentPage * itemsPerPage;
  const indexOfFirstBrand = indexOfLastBrand - itemsPerPage;
  const currentSale = sale.slice(indexOfFirstBrand, indexOfLastBrand);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const showModalhandlerDetail = async (element) => {
    setShowModal(true);
    const { data } = await axios.get(
      `https://pf-back.fly.dev/detail/get/${element._id}`
    );

    setDataDetail(data);
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
          <form method="dialog" className="modal-box w-11/12 max-w-5xl h-auto">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              type="button"
              onClick={closeModalSale}
            >
              X
            </button>
            <h3 className="font-bold text-lg text-gray-300">Sale Detail</h3>
            <div className="pb-12 w-full">
              <table className="table text-gray-300">
                <thead>
                  <tr>
                    <th className="w-[10%] text-gray-300">N°</th>
                    <th className="w-[30%] text-gray-300">ID Sale</th>
                    <th className="w-[30%] text-gray-300">Car</th>
                    <th className="w-[15%] text-gray-300">Amount</th>
                    <th className="w-[15%] text-gray-300">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {dataDetail?.map((detail, index) => {
                    return (
                      <tr key={detail._id}>
                        <th>{index + 1}</th>
                        <th>{detail.id_venta}</th>
                        <th>{detail.id_car.name}</th>
                        <th>{detail.amount}</th>
                        <th>{detail.subtotal}</th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </form>
        </dialog>
        <table className="table text-gray-300">
          <thead>
            <tr>
              <th className="w-[10%] text-gray-300">ID</th>
              <th className="w-[30%] text-gray-300">User</th>
              <th className="w-[20%] text-gray-300">Date</th>
              <th className="w-[15%] text-gray-300">Status</th>
              <th className="w-[15%] text-gray-300">Total</th>
              <th className="w-[10%] text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentSale?.map((element) => {
              return (
                <tr key={element._id}>
                  <th>{element._id}</th>
                  <th>{element.id_user.user}</th>
                  <th>{element.date}</th>
                  <th>{element.description}</th>
                  <th>$ {element.total}</th>
                  <th>
                    <div className="btn-group">
                      <button
                        className="btn btn-success"
                        onClick={() => showModalhandlerDetail(element)}
                      >
                        Detail
                      </button>
                      {/* <button
                        className="btn btn-error"
                        onClick={() => handlerDelete(element._id)}
                      >
                        Delete
                      </button> */}
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

export default Sale;
