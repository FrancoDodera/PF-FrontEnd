import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../Pagination/Pagination";

import {
  createUser,
  disableUser,
  enableUser,
  getAllUsers,
  updateUser,
} from "../../../redux/actions";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar.jsx";
const User = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const cloudName = "dbt5vgimv";
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
    type: "",
    image: "",
    accion: "",
  });
  const totalItems = users.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handlerImage = (event) => {
    const files = event.target.files[0];
    setUser({
      ...user,
      image: files,
    });
  };

  const showModalUser = () => {
    setUser({ ...user, accion: "Crear" });
    setShowModal(true);
  };
  const showModalhandlerEdit = (element) => {
    setUser({ ...element, accion: "Editar", image: "" });
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
      type: "",
      confirmPassword: "",
      image: "",
      accion: "",
    });
  };
  const handleUser = (event) => {
    const { value } = event.target;
    setUser({ ...user, [event.target.name]: value });
  };
  const uploadImage = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "CarGo_Pf_henry");
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      if (res.ok) {
        const file = await res.json();
        return file.secure_url;
      } else {
        return "";
      }
    } catch (error) {
      alert(error);
    }
  };
  const handlerSubmit = async (event) => {
    event.preventDefault();
    if (
      user.type == "" ||
      user.name == "" ||
      user.lastName == "" ||
      user.user == "" ||
      user.email == ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Missing data",
        position: "top-end",
        showConfirmButton: false,
        timer: 500,
      });
    } else {
      let imageUrl = "";
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
          if (user.image != "") {
            imageUrl = await uploadImage(user.image);
          }
          dispatch(
            createUser({
              name: user.name,
              lastName: user.lastName,
              email: user.email,
              user: user.user,
              password: user.password,
              dni: user.dni,
              type: user.type,
              image: imageUrl,
            })
          );
          closeModalUser();
        }
      } else {
        if (user.image != "") {
          imageUrl = await uploadImage(user.image);
        }
        dispatch(
          updateUser({
            id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            user: user.user,
            password: user.password,
            type: user.type,
            image: imageUrl,
          })
        );
        closeModalUser();
      }
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
    <div className="flex">
      <NavBar />
      <div className="overflow-x-auto w-full  bg-[#0a192f] text-gray-300">
        <div className="flex justify-between p-8 text-gray-300">
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
            className="modal-box w-11/12 max-w-5xl h-auto "
          >
            {user.accion == "Crear" ? (
              <h3 className="font-bold text-lg  text-gray-300">Create User</h3>
            ) : (
              <h3 className="font-bold text-lg  text-gray-300">Update User</h3>
            )}

            <button
              type="button"
              onClick={closeModalUser}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2  text-gray-300"
            >
              ✕
            </button>
            <div className="pb-12">
              <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6  text-gray-300"
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
                      className="block w-full p-3 rounded-md border-0 py-4  text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium leading-6  text-gray-300"
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
                      className="block w-full p-3 rounded-md border-0 py-4  text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6  text-gray-300"
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
                      className="block w-full p-3 rounded-md border-0 py-4  text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="user"
                    className="block text-sm font-medium leading-6   text-gray-300"
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
                      className="block w-full p-3 rounded-md border-0 py-4  text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {user.accion == "Crear" && (
                  <>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6  text-gray-300"
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
                          className="block w-full p-3 rounded-md border-0 py-4  text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium leading-6  text-gray-300"
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
                          className="block w-full p-3 rounded-md border-0 py-4  text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="sm:col-span-2">
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium leading-6  text-gray-300"
                  >
                    Type
                  </label>
                  <div className="mt-2">
                    <select
                      className="select select-bordered w-full max-w-xs  text-gray-300"
                      name="type"
                      id="type"
                      value={user.type}
                      onChange={handleUser}
                    >
                      <option defaultValue>Type</option>
                      <option value="User">User</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium leading-6  text-gray-300"
                  >
                    Logo
                  </label>
                  <div className="mt-4">
                    <input
                      type="file"
                      name="image"
                      id="image"
                      onChange={handlerImage}
                      className="file-input w-full max-w-xs  text-gray-300"
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
            <tr className="text-gray-300">
              <th></th>
              <th>UserName</th>
              <th>Email</th>
              <th>Name</th>
              <th>Last Name</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers?.map((user, index) => {
              return (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.user}</td>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>{user.lastName}</td>
                  <td>{user.type}</td>
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

export default User;
