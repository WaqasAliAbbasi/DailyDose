import axios from "axios";
import moment from "moment";

import * as types from "../constants/ActionTypes";

export const getAllOrders = () => {
  return (dispatch, getState) => {
    const headers = {};
    const { token } = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return axios
      .get("/api/orders/", { headers })
      .then(res => {
        const orders = res.data;
        return dispatch({ type: types.RECEIVE_ORDERS, orders });
      })
      .catch(error => {
        const { response } = error;
        if (response && (response.status === 401 || response.status === 403)) {
          dispatch({ type: types.AUTHENTICATION_ERROR, data: response.data });
        }
      });
  };
};

export const placeOrder = (month, year) => {
  return (dispatch, getState) => {
    const headers = {};
    const { token } = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    const for_month = moment()
      .date(1)
      .month(month)
      .year(year)
      .format("YYYY-MM-DD");

    return axios
      .post("/api/orders/", { for_month }, { headers })
      .then(res => {
        const order = res.data;
        return dispatch({ type: types.ORDER_SUCCESSFUL, order });
      })
      .catch(error => {
        const { response } = error;
        if (response && (response.status === 401 || response.status === 403)) {
          dispatch({ type: types.AUTHENTICATION_ERROR, data: response.data });
        } else {
          dispatch({ type: types.ORDER_ERROR, message: error.message });
        }
      });
  };
};
