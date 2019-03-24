import axios from "axios";

import * as types from "../constants/ActionTypes";

export const getQuestionnaire = id => {
  return (dispatch, getState) => {
    const headers = {};
    const { token } = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return axios
      .get(`/api/questionnaire/`, { headers })
      .then(res => {
        const questionnaire = res.data;
        return dispatch({ type: types.GET_QUESTIONNAIRE, questionnaire });
      })
      .catch(error => {
        const { response } = error;
        if (response && (response.status === 401 || response.status === 403)) {
          dispatch({ type: types.AUTHENTICATION_ERROR, data: response.data });
        } else {
          dispatch({ type: types.QUESTIONNAIRE_ERROR, message: error.message });
        }
      });
  };
};

export const submitQuestionnaire = form => {
  return (dispatch, getState) => {
    const headers = {};
    const { token } = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    console.log(form);

    dispatch({ type: types.QUESTIONNAIRE_SUBMIT_PROCESSING });

    return axios
      .post(`/api/questionnaire_submit/`, { headers })
      .then(res => {
        return dispatch({ type: types.QUESTIONNAIRE_SUBMIT_SUCCESS });
      })
      .catch(error => {
        const { response } = error;
        if (response && (response.status === 401 || response.status === 403)) {
          dispatch({ type: types.AUTHENTICATION_ERROR, data: response.data });
        } else {
          dispatch({ type: types.QUESTIONNAIRE_ERROR, message: error.message });
        }
      });
  };
};
