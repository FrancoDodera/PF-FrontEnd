//EJEMPLO!!!!!!!
import {
  CARDETAIL,
  CLEARDETAIL,
  GETALLCARS,
  GETCARBYNAME,
} from "./actionsType";

const initialState = {
  allCars: [],
  auxCars: [],
  carDetail: {},
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case GETALLCARS:
      return {
        ...state,
        allCars: actions.payload,
        auxCars: actions.payload,
      };
    case CARDETAIL:
      return {
        ...state,
        carDetail: actions.payload,
      };
    case GETCARBYNAME:
      return {
        ...state,
        auxCars: [actions.payload],
      };
    case CLEARDETAIL:
      return {
        ...state,
        carDetail: {},
      };
    default:
      return { ...state };
  }
};

export default reducer;
