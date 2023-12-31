//EJEMPLO!!!!!!!
import {
  CARDETAIL,
  CARFILTERS,
  CLEARDETAIL,
  CREATEBRAND,
  CREATECATEGORY,
  CREATEUSER,
  DELETEBRAND,
  DELETECATEGORY,
  DISABLEUSER,
  ENABLEUSER,
  GETALLBRANDS,
  GETALLCARS,
  GETALLCATEGORIES,
  GETALLUSERS,
  GETCARBYNAME,
  UPDATEBRAND,
  UPDATECATEGORY,
  UPDATEUSER,
  GETALLSALES,
  CREATECAR,
  UPDATECAR,
  DELETECAR,
  ADDFAV,
  REMOVEFAV,
  GETALLFAVS,
  CLEARFAV,
} from "./actionsType";

const initialState = {
  allCars: [],
  auxCars: [],
  carDetail: {},
  allBrands: [],
  allCategories: [],
  allUsers: [],
  allSales: [],
  favorites: [],
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
        auxCars: actions.payload,
      };
    case CLEARDETAIL:
      return {
        ...state,
        carDetail: {},
      };
    case CARFILTERS:
      let allCars = [...state.allCars].filter(
        (elem) =>
          elem.age >= actions.payload.carYearMin &&
          elem.age <= actions.payload.carYearMax &&
          elem.price >= actions.payload.carPriceMin &&
          elem.price <= actions.payload.carPriceMax
      );
      if (actions.payload.carStatus != "all") {
        allCars = [...allCars].filter(
          (elem) => elem.status == actions.payload.carStatus
        );
      }
      if (actions.payload.brand != "all") {
        allCars = [...allCars].filter(
          (elem) => elem.idMarca._id == actions.payload.brand
        );
      }
      if (actions.payload.category != "all") {
        allCars = [...allCars].filter(
          (elem) => elem.idCategory._id == actions.payload.category
        );
      }
      return {
        ...state,
        auxCars: allCars,
      };
    case GETALLBRANDS:
      return {
        ...state,
        allBrands: actions.payload,
      };
    case GETALLCATEGORIES:
      return {
        ...state,
        allCategories: actions.payload,
      };
    case GETALLUSERS:
      return {
        ...state,
        allUsers: actions.payload,
      };
    case GETALLSALES: {
      return {
        ...state,
        allSales: actions.payload,
      };
    }
    case CREATEBRAND:
      return {
        ...state,
        allBrands: [...state.allBrands, actions.payload],
      };
    case UPDATEBRAND:
      let allBrands = [...state.allBrands];
      let brandFind = allBrands.findIndex(
        (elem) => elem._id == actions.payload._id
      );
      allBrands[brandFind] = actions.payload;
      return {
        ...state,
        allBrands: [...allBrands],
      };
    case CREATECATEGORY:
      return {
        ...state,
        allCategories: [...state.allCategories, actions.payload],
      };
    case UPDATECATEGORY:
      let allCategories = [...state.allCategories];
      let categoryFind = allCategories.findIndex(
        (elem) => elem._id == actions.payload._id
      );
      allCategories[categoryFind] = actions.payload;
      return {
        ...state,
        allCategories: [...allCategories],
      };
    case CREATEUSER:
      return {
        ...state,
        allUsers: [...state.allUsers, actions.payload.data],
      };
    case UPDATEUSER:
      let allUsers = [...state.allUsers];
      let userFind = allUsers.findIndex(
        (elem) => elem._id == actions.payload._id
      );
      allUsers[userFind] = actions.payload;
      return {
        ...state,
        allUsers: [...allUsers],
      };
    case DISABLEUSER:
      let allUsersD = [...state.allUsers];
      let userFindD = allUsersD.findIndex(
        (elem) => elem._id == actions.payload._id
      );
      allUsersD[userFindD] = actions.payload;
      return {
        ...state,
        allUsers: [...allUsersD],
      };
    case ENABLEUSER:
      let allUsersE = [...state.allUsers];
      let userFindE = allUsersE.findIndex(
        (elem) => elem._id == actions.payload._id
      );
      allUsersE[userFindE] = actions.payload;
      return {
        ...state,
        allUsers: [...allUsersE],
      };
    case DELETECATEGORY:
      let deleteCategoryArray = state.allCategories;
      const indexDeleteCategory = deleteCategoryArray.findIndex(
        (element) => element._id == actions.payload
      );
      deleteCategoryArray.splice(indexDeleteCategory, 1);
      return {
        ...state,
        allCategories: [...deleteCategoryArray],
      };
    case DELETEBRAND:
      let deleteBrandArray = state.allBrands;
      const indexDeleteBrand = deleteBrandArray.findIndex(
        (element) => element._id == actions.payload
      );
      deleteBrandArray.splice(indexDeleteBrand, 1);
      return {
        ...state,
        allBrands: [...deleteBrandArray],
      };
    case CREATECAR:
      return {
        ...state,
        allCars: [...state.allCars, actions.payload],
      };
    case UPDATECAR:
      let allCarsUpdate = [...state.allCars];
      let carFindUpdate = allCarsUpdate.findIndex(
        (elem) => elem._id == actions.payload._id
      );
      allCarsUpdate[carFindUpdate] = actions.payload;
      return {
        ...state,
        allCars: [...allCarsUpdate],
      };
    case DELETECAR:
      let allCarsDelete = [...state.allCars];
      let carFindDelete = allCarsDelete.findIndex(
        (elem) => elem._id == actions.payload._id
      );
      allCarsDelete[carFindDelete] = actions.payload;
      return {
        ...state,
        allCars: [...allCarsDelete],
      };
    case ADDFAV:
      return {
        ...state,
        favorites: [...state.favorites, actions.payload],
      };
    case REMOVEFAV:
      return {
        ...state,
        favorites: state.favorites.filter(
          (favorite) => favorite.id_car._id !== actions.payload
        ),
      };
    case GETALLFAVS:
      return {
        ...state,
        favorites: actions.payload,
      };
    case CLEARFAV:
      return {
        ...state,
        favorites: [],
      };
    default:
      return { ...state };
  }
};
export default reducer;
