import React, { useEffect, useState } from "react";
import axios from "axios";

const Purchases = () => {
  const [saleInfo,setSaleInfo]=useState([]);
  const [customerPurchases, setCustomerPurchases] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const showModalhandlerDetail = async (buy) => {
    const { data } = await axios.get(
      `https://pf-back.fly.dev/detail/get/${buy._id}`
    );
    setCustomerPurchases(data);
    setShowDetailModal(true);
  };
  const closeModalPurchase = () => {
    setCustomerPurchases([]);
    setShowDetailModal(false);
  };
  const getUser = async () => {
    let dataUsers = {};
    const user = localStorage.getItem("user");
    const admin = localStorage.getItem("admin");
    let postData = {};
    if (user) {
      postData = {
        user: user,
      };
    } else if (admin) {
      postData = {
        user: admin,
      };
    }
    if (user || admin) {
      const { data } = await axios.post(
        "https://pf-back.fly.dev/user/verifyUser",
        postData
      );
      const response = await axios.get(
        `https://pf-back.fly.dev/sale/user/${data.data._id}`
      );
      if (response.status === 200) {
        setSaleInfo(response.data);
      } else {
        console.error("Error al obtener las compras del cliente");
      }
    } else {
      console.error("No se encontró ningún usuario en el almacenamiento local");
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Client Buys</h2>
      <div className="overflow-x-auto">
      {showDetailModal && (
        <div className="modal modal-open">
          <form method="dialog" className="modal-box w-11/12 max-w-5xl h-auto">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              type="button"
              onClick={closeModalPurchase}
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
                  {customerPurchases?.map((detail, index) => {
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
        </div>
        )}
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">N°</th>
              <th className="px-4 py-2">ID Purchase</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {saleInfo.map((sale,index) => (
              <tr key={sale._id}>
                <td className="border px-4 py-2">{index+1}</td>
                <td className="border px-4 py-2">{sale._id}</td>
                <td className="border px-4 py-2">{sale.date}</td>
                <td className="border px-4 py-2">{sale.description}</td>
                <td className="border px-4 py-2">{sale.total}</td>
                <th>
                    <div className="btn-group">
                      <button
                        className="btn btn-success"
                        onClick={() => showModalhandlerDetail(sale)}
                      >
                        Detail
                      </button>
                    </div>
                  </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Purchases;
