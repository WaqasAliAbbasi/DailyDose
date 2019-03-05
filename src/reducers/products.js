import * as types from "../constants/ActionTypes";

const initialState = [];

export default function notes(state = initialState, action) {
  switch (action.type) {
    case types.RECEIVE_PRODUCTS:
      return [...action.products];

    default:
      return state;
  }
}
