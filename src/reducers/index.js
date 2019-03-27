import { combineReducers } from "redux";
import auth from "./auth";
import products from "./products";
import box from "./box";
import orders from "./orders";
import questionnaire from "./questionnaire";

const reducers = combineReducers({
  auth,
  products,
  box,
  orders,
  questionnaire
});

export default reducers;
