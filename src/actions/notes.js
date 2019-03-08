import axios from "axios";

import * as types from "../constants/ActionTypes";

export const fetchNotes = () => {
  return (dispatch, getState) => {
    const headers = {};
    const { token } = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return axios
      .get("/api/notes/", { headers })
      .then(res => {
        return dispatch({ type: types.FETCH_NOTES, notes: res.data });
      })
      .catch(error => {
        const { response } = error;
        if (response && (response.status === 401 || response.status === 403)) {
          dispatch({ type: types.AUTHENTICATION_ERROR, data: response.data });
        }
      });
  };
};

export const addNote = text => {
  return (dispatch, getState) => {
    const headers = {};
    const { token } = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return axios
      .post("/api/notes/", { text }, { headers })
      .then(res => {
        return dispatch({ type: types.ADD_NOTE, note: res.data });
      })
      .catch(error => {
        const { response } = error;
        if (response && (response.status === 401 || response.status === 403)) {
          dispatch({ type: types.AUTHENTICATION_ERROR, data: response.data });
        }
      });
  };
};

export const updateNote = (index, text) => {
  return (dispatch, getState) => {
    const headers = {};
    const { token } = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    const noteId = getState().notes[index].id;
    return axios
      .put(`/api/notes/${noteId}/`, { text }, { headers })
      .then(res => {
        return dispatch({ type: types.UPDATE_NOTE, note: res.data, index });
      })
      .catch(error => {
        const { response } = error;
        if (response && (response.status === 401 || response.status === 403)) {
          dispatch({ type: types.AUTHENTICATION_ERROR, data: response.data });
        }
      });
  };
};

export const deleteNote = index => {
  return (dispatch, getState) => {
    const headers = {};
    const { token } = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    const noteId = getState().notes[index].id;
    return axios
      .delete(`/api/notes/${noteId}/`, { headers })
      .then(res => {
        return dispatch({ type: types.DELETE_NOTE, index });
      })
      .catch(error => {
        const { response } = error;
        if (response && (response.status === 401 || response.status === 403)) {
          dispatch({ type: types.AUTHENTICATION_ERROR, data: response.data });
        }
      });
  };
};
