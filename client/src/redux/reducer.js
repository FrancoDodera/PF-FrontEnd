//EJEMPLO!!!!!!!
import { CARDETAIL, CARFILTERS, CLEARDETAIL, GETALLBRANDS, GETALLCARS, GETALLCATEGORIES, GETCARBYNAME } from "./actionsType";

const initialState={
    allCars:[],
    auxCars:[],
    carDetail:{},
    allBrands:[],
    allCategories:[]
}

const reducer=(state=initialState,actions)=>{
    switch(actions.type){
        case GETALLCARS:
            return {
                ...state,
                allCars:actions.payload,
                auxCars:actions.payload
            }
        case CARDETAIL:
            return{
                ...state,
                carDetail:actions.payload
            }
        case GETCARBYNAME:
            return {
                ...state,
              auxCars: [actions.payload],
            };
        case CLEARDETAIL:
            return{
                ...state,
                carDetail:{}
            }
        case CARFILTERS:
            let allCars=[...state.allCars].filter(
                (elem)=>elem.age >= actions.payload.carYearMin && elem.age <= actions.payload.carYearMax 
                && elem.price >=actions.payload.carPriceMin && elem.price <= actions.payload.carPriceMax
            )
            if(actions.payload.carStatus != 'all'){
                allCars=[...allCars].filter((elem)=>elem.status==actions.payload.carStatus)
            }
            if(actions.payload.brand !='all'){
                allCars=[...allCars].filter((elem)=>elem.idMarca._id==actions.payload.brand)
            }
            if(actions.payload.category !='all'){
                allCars=[...allCars].filter((elem)=>elem.idCategory._id==actions.payload.category)
            }
            return{
                ...state,
                auxCars:allCars
            }
        case GETALLBRANDS:
            return{
                ...state,
                allBrands:actions.payload
            }
        case GETALLCATEGORIES:
            return{
                ...state,
                allCategories:actions.payload
            }
        default:
            return {...state}
    }
}
export default reducer;
