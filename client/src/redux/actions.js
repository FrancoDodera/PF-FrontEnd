
import axios from 'axios'
import { CARDETAIL, CLEARDETAIL, GETALLCARS,GETCARBYNAME,CARFILTERS, GETALLBRANDS, GETALLCATEGORIES } from './actionsType'


// ACA VAN TODAS LAS ACTIONS
//ejemplo

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

}
}
export const getAllBrands=()=>{
    return async (dispatch)=>{
        try {
            const {data}= await axios.get('/marca/all');
            return dispatch({
                type:GETALLBRANDS,
                payload:data
            })
        } catch (error) {
            alert(error.response.data.error)
        }
    }
}
export const getAllCategories=()=>{
    return async (dispatch)=>{
        try {
            const {data}= await axios.get('/category/all');
            return dispatch({
                type:GETALLCATEGORIES,
                payload:data
            })
        } catch (error) {
            alert(error.response.data.error)
        }
    }
}

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
}
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
}
}
export const clearDetail=()=>{
    return {
        type:CLEARDETAIL
    }
}
export const carFilters=(filter)=>{
    return{
        type:CARFILTERS,
        payload:filter
    }
}


