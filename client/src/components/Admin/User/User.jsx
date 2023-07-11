import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createUser,
  disableUser,
  enableUser,
  getAllUsers,
  updateUser,
} from "../../../redux/actions";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.allUsers);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({
    _id: null,
    name: "",
    lastName: "",
    email: "",
    dni: null,
    user: "",
    password: "",
    confirmPassword: "",
    accion: "",
  });

  const showModalUser = () => {
    setUser({ ...user, accion: "Crear" });
    setShowModal(true);
  };
  const showModalhandlerEdit = (element) => {
    setUser({ ...element, accion: "Editar" });
    setShowModal(true);
  };
  const closeModalUser = () => {
    setShowModal(false);
    setUser({
      _id: null,
      name: "",
      lastName: "",
      email: "",
      dni: null,
      user: "",
      password: "",
      accion: "",
    });
  };
  const handleUser = (event) => {
    const { value } = event.target;
    setUser({ ...user, [event.target.name]: value });
  };
  const handlerSubmit = (event) => {
    event.preventDefault();
    if (user.accion === "Crear") {
      if (user.password !== user.confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "passwords do not match",
          position: "top-end",
          showConfirmButton: false,
          timer: 800,
        });
      } else {
        dispatch(
          createUser({
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            user: user.user,
            password: user.password,
            dni: user.dni,
          })
        );
        closeModalUser();
      }
    } else {
      dispatch(
        updateUser({
          id: user._id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          user: user.user,
          password: user.password,
          image: "ruta",
        })
      );
      closeModalUser();
    }
  };
  const disable = (id) => {
    dispatch(disableUser(id));
  };
  const enable = (id) => {
    dispatch(enableUser(id));
  };
  useEffect(() => {
    if (users.length == 0) {
      dispatch(getAllUsers());
    }
  }, []);

  return (
    <div className="overflow-x-auto w-full h-[110vh] bg-[#0a192f] text-gray-300">
      <div className="flex justify-between p-8 text-gray-300">
        <button
          className="btn-secondary flex justify-between p-8 text-gray-300"
          onClick={() => navigate("/admin")}
        >
          Go Home
        </button>
        <h1 className="text-3xl font-bold">Users</h1>
        <button className="btn" onClick={showModalUser}>
          Create User
        </button>
      </div>

      <dialog
        id="my_modal_4"
        className={showModal ? "modal modal-open" : "modal"}
      >
        <form
          method="dialog"
          onSubmit={handlerSubmit}
          className="modal-box w-11/12 max-w-5xl h-auto"
        >
          {
            user.accion=='Crear'?<h3 className="font-bold text-lg">Create User</h3>:<h3 className="font-bold text-lg">Update User</h3>
          }
          
          <button
            type="button"
            onClick={closeModalUser}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <div className="pb-12">
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                    value={user.name}
                    onChange={handleUser}
                    className="block w-full p-3 rounded-md border-0 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={user.lastName}
                    onChange={handleUser}
                    className="block w-full p-3 rounded-md border-0 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="user"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  User
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="user"
                    id="user"
                    value={user.user}
                    onChange={handleUser}
                    className="block w-full p-3 rounded-md border-0 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={user.email}
                    onChange={handleUser}
                    className="block w-full p-3 rounded-md border-0 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {user.accion == "Crear" && (
                <>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={user.password}
                        onChange={handleUser}
                        className="block w-full p-3 rounded-md border-0 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Confirm Password
                    </label>
                    <div className="mt-2">
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={user.confirmPassword}
                        onChange={handleUser}
                        className="block w-full p-3 rounded-md border-0 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </>
              )}
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
          <tr className="text-gray-300">
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
                <td>
                  {user.status ? (
                    <button className="btn btn-xs btn-success">
                      Available
                    </button>
                  ) : (
                    <button className="btn btn-xs btn-error">Disabled</button>
                  )}
                </td>
                <td>
                  <div className="btn-group">
                    <button
                      className="btn btn-warning"
                      onClick={() => showModalhandlerEdit(user)}
                    >
                      Update
                    </button>
                    {user.status ? (
                      <button
                        className="btn btn-success"
                        onClick={() => disable(user._id)}
                      >
                        enable
                      </button>
                    ) : (
                      <button
                        className="btn btn-error"
                        onClick={() => enable(user._id)}
                      >
                        disable
                      </button>
                    )}
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
