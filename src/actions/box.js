import axios from "axios";

import * as types from "../constants/ActionTypes";

export const getCurrentBox = () => {
  return (dispatch, getState) => {
    const headers = {};
    const { token } = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return axios
      .get("/api/box_items/", { headers })
      .then(res => {
        const items = res.data;
        return dispatch({ type: types.RECEIVE_BOX, items });
      })
      .catch(error => {
        const { response } = error;
        if (response && (response.status === 401 || response.status === 403)) {
          dispatch({ type: types.AUTHENTICATION_ERROR, data: response.data });
        }
      });
  };
};

export const addBoxItem = id => {
  return (dispatch, getState) => {
    const headers = {};
    const { token } = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return axios
      .post("/api/box_items/", { product_id: id }, { headers })
      .then(res => {
        dispatch({ type: types.ADD_BOX_ITEM, item: res.data });
      })
      .catch(error => {
        const { response } = error;
        if (response && (response.status === 401 || response.status === 403)) {
          dispatch({ type: types.AUTHENTICATION_ERROR, data: response.data });
        }
      });
  };
};

export const removeBoxItem = id => {
  return (dispatch, getState) => {
    const headers = {};
    const { token } = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return axios
      .delete(`/api/box_items/${id}/`, { headers })
      .then(res => {
        dispatch({ type: types.REMOVE_BOX_ITEM, id });
      })
      .catch(error => {
        const { response } = error;
        if (response && (response.status === 401 || response.status === 403)) {
          dispatch({ type: types.AUTHENTICATION_ERROR, data: response.data });
        }
      });
  };
};
