import { combineReducers } from "redux";
import notes from "./notes";
import auth from "./auth";
import products from "./products";
import box from "./box";

const ponyApp = combineReducers({
  notes,
  auth,
  products,
  box
});

export default ponyApp;
