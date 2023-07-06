import axios from 'axios'
import { CARDETAIL, GETALLCARS,GETCARBYNAME } from './actionsType'
// ACA VAN TODAS LAS ACTIONS
//ejemplo

export const getAllCars=()=>{
    return async (dispatch)=>{
        try {
            const {data}= await axios.get('/cars');
            return dispatch({
                type:GETALLCARS,
                payload:data
            })
        } catch (error) {
            alert(error.response.data.error)
        }
    }
}

export const getCarById=(id)=>{
    return async (dispatch)=>{
        try {
            const {data}= await axios.get(`/cars/${id}`);
            return dispatch({
                type:CARDETAIL,
                payload:data
            })
        } catch (error) {
            alert(error.response.data.error)
        }
    }
}
export const getCarByName=(name)=>{
    return async (dispatch)=>{
        try {
            const {data}= await axios.get(`/cars/name/?name=${name}`);
            return dispatch({
                type:GETCARBYNAME,
                payload:data
            })
        } catch (error) {
            alert(error.response.data.error)
        }
    }
}
