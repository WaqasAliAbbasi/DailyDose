import axios from "axios";

import * as types from "../constants/ActionTypes";

export const getAllProducts = () => {
  return (dispatch, getState) => {
    const headers = {};
    const { token } = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return axios
      .get("/api/products/", { headers })
      .then(res => {
        const products = res.data;
        return dispatch({ type: types.RECEIVE_PRODUCTS, products });
      })
      .catch(error => {
        const { response } = error;
        if (response.status === 401 || response.status === 403) {
          dispatch({ type: types.AUTHENTICATION_ERROR, data: response.data });
        }
      });
  };
};
