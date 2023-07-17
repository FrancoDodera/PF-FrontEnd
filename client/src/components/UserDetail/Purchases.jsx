import React, { useEffect, useState } from "react";
import axios from "axios";

const Purchases = () => {
  const [customerPurchases, setCustomerPurchases] = useState([]);
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
        `https://pf-back.fly.dev/sale/${data.data._id}`
      );
      if (response.status === 200) {
        console.log(response.data);
        setCustomerPurchases(response.data);
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
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">ID Buy</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {customerPurchases.map((sale) => (
              <tr key={sale.id}>
                <td className="border px-4 py-2">{sale.id_user}</td>
                <td className="border px-4 py-2">{sale.description}</td>
                <td className="border px-4 py-2">{sale.date}</td>
                <td className="border px-4 py-2">{sale.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Purchases;
