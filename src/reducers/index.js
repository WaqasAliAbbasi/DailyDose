import { combineReducers } from "redux";
import notes from "./notes";
import auth from "./auth";
import products from "./products";

const ponyApp = combineReducers({
  notes,
  auth,
  products
});

export default ponyApp;
