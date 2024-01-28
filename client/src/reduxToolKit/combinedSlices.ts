import { combineReducers } from "@reduxjs/toolkit";
import authLoginReducer from "./features/auth/authLogin.slice";
import authRegisterReducer from "./features/auth/authRegister.slice";
import generalReducer from "./features/general/index";

const reducers = combineReducers({
  loggedInUser: authLoginReducer,
  createdUser: authRegisterReducer,
  generalState: generalReducer,
});

export { reducers };
