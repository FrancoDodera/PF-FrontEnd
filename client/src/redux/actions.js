import axios from "axios";
import Swal from "sweetalert2";
import {
  CARDETAIL,
  CLEARDETAIL,
  GETALLCARS,
  GETCARBYNAME,
  CARFILTERS,
  GETALLBRANDS,
  GETALLCATEGORIES,
  GETALLUSERS,
  CREATEBRAND,
  UPDATEBRAND,
  CREATECATEGORY,
  UPDATECATEGORY,
  CREATEUSER,
  UPDATEUSER,
  DISABLEUSER,
  ENABLEUSER,
  DELETECATEGORY,
  DELETEBRAND,
  CREATECAR,
  DELETECAR,
  UPDATECAR,
  GETALLSALES,
  ADDFAV,
  REMOVEFAV,
  GETALLFAVS,
  CLEARFAV,
} from "./actionsType";

// ACA VAN TODAS LAS ACTIONS

//CARS

export const getAllCars = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/cars");
      return dispatch({
        type: GETALLCARS,
        payload: data,
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};
export const getCarById = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/cars/${id}`);
      return dispatch({
        type: CARDETAIL,
        payload: data,
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};
export const getCarByName = (name) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/cars/name/?name=${name}`);
      return dispatch({
        type: GETCARBYNAME,
        payload: data,
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};

export const createCar = (body) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/cars/addCar", body);
      if (data.data._id) {
        Swal.fire({
          icon: "success",
          title: "Car created",
          position: "top-end",
          showConfirmButton: false,
          timer: 500,
        });
        return dispatch({
          type: CREATECAR,
          payload: data.data,
        });
      }
    } catch (error) {
      alert("error" + error);
    }
  };
};

export const updateCar = (body) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put("/cars/updateCar", body);
      if (data.data._id) {
        Swal.fire({
          icon: "success",
          title: "Car updated",
          position: "top-end",
          showConfirmButton: false,
          timer: 500,
        });
        return dispatch({
          type: UPDATECAR,
          payload: data.data,
        });
      }
    } catch (error) {
      alert(error);
    }
  };
};

export const deleteCar = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/cars/${id}`);
      if (data._id) {
        Swal.fire({
          icon: "success",
          title: "updated",
          position: "top-end",
          showConfirmButton: false,
          timer: 500,
        });
        return dispatch({
          type: DELETECAR,
          payload: data,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "error",
          position: "top-end",
          showConfirmButton: false,
          timer: 500,
        });
      }
    } catch (error) {
      alert(error);
    }
  };
};

export const clearDetail = () => {
  return {
    type: CLEARDETAIL,
  };
};
export const carFilters = (filter) => {
  return {
    type: CARFILTERS,
    payload: filter,
  };
};

//CATEGORIES

export const getAllCategories = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/category/all");
      return dispatch({
        type: GETALLCATEGORIES,
        payload: data,
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};
export const createCategory = (body) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/category", body);
      if (data._id) {
        Swal.fire({
          icon: "success",
          title: "category created",
          position: "top-end",
          showConfirmButton: false,
          timer: 500,
        });
      }
      return dispatch({
        type: CREATECATEGORY,
        payload: data,
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};
export const updateCategory = (body) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/category/${body.id}`, {
        name: body.name,
        description: body.description,
      });
      if (data._id) {
        Swal.fire({
          icon: "success",
          title: "brand updated",
          position: "top-end",
          showConfirmButton: false,
          timer: 500,
        });
      }
      return dispatch({
        type: UPDATECATEGORY,
        payload: data,
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};
export const deleteCategory = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/category/${id}`);
      if (data.deleted) {
        Swal.fire({
          icon: "success",
          title: data.message,
          position: "top-end",
          showConfirmButton: false,
          timer: 500,
        });
        return dispatch({
          type: DELETECATEGORY,
          payload: id,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: data.message,
          position: "top-end",
          showConfirmButton: false,
          timer: 500,
        });
      }
    } catch (error) {
      alert(error);
    }
  };
};

//BRANDS
export const getAllBrands = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/marca/all");
      return dispatch({
        type: GETALLBRANDS,
        payload: data,
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};
export const createBrand = (body) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/marca", body);
      if (data._id) {
        Swal.fire({
          icon: "success",
          title: "brand created",
          position: "top-end",
          showConfirmButton: false,
          timer: 500,
        });
      }
      return dispatch({
        type: CREATEBRAND,
        payload: data,
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};
export const updateBrand = (body) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/marca/${body.id}`, {
        name: body.name,
        description: body.description,
      });
      if (data._id) {
        Swal.fire({
          icon: "success",
          title: "brand updated",
          position: "top-end",
          showConfirmButton: false,
          timer: 500,
        });
      }
      return dispatch({
        type: UPDATEBRAND,
        payload: data,
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};
export const deleteBrand = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/marca/${id}`);
      if (data.deleted) {
        Swal.fire({
          icon: "success",
          title: data.message,
          position: "top-end",
          showConfirmButton: false,
          timer: 500,
        });
        return dispatch({
          type: DELETEBRAND,
          payload: id,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: data.message,
          position: "top-end",
          showConfirmButton: false,
          timer: 500,
        });
      }
    } catch (error) {
      alert(error);
    }
  };
};

//USERS

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/user/getAllUsers");
      return dispatch({
        type: GETALLUSERS,
        payload: data,
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};
export const createUser = (body) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/user/addUser", body);
      if (data.data._id) {
        Swal.fire({
          icon: "success",
          title: "User created",
          position: "top-end",
          showConfirmButton: false,
          timer: 500,
        });
      }
      return dispatch({
        type: CREATEUSER,
        payload: data,
      });
    } catch (error) {
      alert(error);
    }
  };
};
export const updateUser = (body) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put("/user/upgrade", body);
      if (data._id) {
        Swal.fire({
          icon: "success",
          title: "User updated",
          position: "top-end",
          showConfirmButton: false,
          timer: 500,
        });
      }
      return dispatch({
        type: UPDATEUSER,
        payload: data,
      });
    } catch (error) {
      alert(error);
    }
  };
};
export const disableUser = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/user/deleteUser/${id}`);
      if (data._id) {
        Swal.fire({
          icon: "success",
          title: "User disabled",
          position: "top-end",
          showConfirmButton: false,
          timer: 500,
        });
      }
      return dispatch({
        type: DISABLEUSER,
        payload: data,
      });
    } catch (error) {
      alert(error);
    }
  };
};
export const enableUser = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/user/renoveUser/${id}`);
      if (data._id) {
        Swal.fire({
          icon: "success",
          title: "User Enabled",
          position: "top-end",
          showConfirmButton: false,
          timer: 500,
        });
      }
      return dispatch({
        type: ENABLEUSER,
        payload: data,
      });
    } catch (error) {
      alert(error);
    }
  };
};

//SALES

export const getAllSales = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/sale");
      return dispatch({
        type: GETALLSALES,
        payload: data,
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};

//FAVORITES

export const addFav = (iduser, idcar) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/favorites", {
        id_user: iduser,
        id_car: idcar,
      });
      if (data.message) {
        Swal.fire({
          icon: "success",
          title: data.message,
          position: "top-end",
          showConfirmButton: false,
          timer: 500,
        });
        return dispatch({
          type: ADDFAV,
          payload: data.data,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const removeFav = (id_user, id_car) => {
  return async (dispatch) => {
    try {
      const body = { id_user, id_car };
      const { data } = await axios.post("/favorites/delete", body);
      if (data.deleted) {
        Swal.fire({
          icon: "success",
          title: data.message,
          position: "top-end",
          showConfirmButton: false,
          timer: 500,
        });
        return dispatch({
          type: REMOVEFAV,
          payload: id_car,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllFavs = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/favorites/${id}`);
      return dispatch({
        type: GETALLFAVS,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const clearFavs = () => {
  return {
    type: CLEARFAV,
  };
};
