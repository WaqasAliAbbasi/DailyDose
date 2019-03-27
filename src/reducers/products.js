import * as types from "../constants/ActionTypes";

const initialState = {
  products: [],
  recommendedProducts: []
};

export default function products(state = initialState, action) {
  switch (action.type) {
    case types.RECEIVE_PRODUCTS:
      return {
        ...state,
        products: action.products
      };
    case types.RECEIVE_RECOMMENDED_PRODUCTS:
      return {
        ...state,
        recommendedProducts: action.products
      };
    default:
      return state;
  }
}
