import axios from 'axios'
import { GETALLCARS } from './actionsType'
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
