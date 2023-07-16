import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllSales } from "../../../redux/actions";

const RecentOrder = () => {
  //Redux
  const sale = useSelector((state) => state.allSales);
  const dispatch = useDispatch();

  useEffect(() => {
    if (sale.length === 0) {
      dispatch(getAllSales());
    }
  }, []);

  return (
    <div>
      <h1 className=" text-black text-2xl  font-semibold  mt-5">Last Sales</h1>
      <div>
        <div className="h-[30vh] shadow-mi-sombra	 shadow-[gray] rounded-lg bg-[#ffffff] text-black w-12/12 pt-3 mr-9	mt-10">
          <table className=" border-separate table text-black ">
            <thead>
              <tr>
                <th className="w-[30%] text-xl text-black ">Name</th>
                <th className="w-[40%] text-xl text-black">Date</th>
                <th className=" w-[20%] text-xl text-black">Total</th>
              </tr>
            </thead>
            <tbody>
              {sale?.map((element) => {
                return (
                  <tr className=" text-gray-600  font-normal" key={element._id}>
                    <th>{element.description}</th>
                    <th>{element.date}</th>
                    <th>${element.total}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentOrder;
