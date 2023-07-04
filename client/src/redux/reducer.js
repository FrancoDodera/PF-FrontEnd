
//EJEMPLO!!!!!!!
import { GETALLCARS } from "./actionsType";

const initialState={
    allCars:[],
    auxCars:[]
}

const reducer=(state=initialState,actions)=>{
    switch(actions.type){
        case GETALLCARS:
            return {
                ...state,
                allCars:actions.payload,
                auxCars:actions.payload
            }
        default:
            return {...state}
    }
}
export default reducer;