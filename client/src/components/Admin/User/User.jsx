import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../redux/actions";
import { useNavigate } from "react-router-dom";

const User = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.allUsers);
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  const navigate = useNavigate();

  return (
    <div className="w-full h-[110vh] bg-[#0a192f] text-gray-300">
      <button
        className="btn-secondary flex justify-between p-8 text-gray-300"
        onClick={() => navigate("/admin")}
      >
        Go Home
      </button>
      <h1 className="text-3xl font-bold flex justify-between p-8 text-gray-300">
        User
      </h1>
      <button className="btn" onClick={() => window.my_modal_4.showModal()}>
        open modal
      </button>
      <dialog id="my_modal_4" className="modal">
        <form method="dialog" className="modal-box w-11/12 max-w-5xl h-auto">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Click the button below to close</p>

          <div className="modal-action">
            <button className="btn">save</button>
          </div>
        </form>
      </dialog>
      <table className="w-full h-[110vh] bg-[#0a192f] text-gray-300">
        <thead>
          <tr>
            <th></th>
            <th>UserName</th>
            <th>Email</th>
            <th>Name</th>
            <th>Last Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => {
            return (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.user}</td>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.lastName}</td>
                <td>{user.status ? "Available" : "Disabled"}</td>
                <td>
                  <div className="btn-group">
                    <button className="btn btn-success">Update</button>
                    <button className="btn btn-error">Delete</button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default User;
