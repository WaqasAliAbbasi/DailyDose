import * as types from "../constants/ActionTypes";

const initialState = {
  error: false,
  success: false,
  message: "",
  orderList: []
};

export default function orders(state = initialState, action) {
  switch (action.type) {
    case types.RECEIVE_ORDERS:
      return {
        ...state,
        success: true,
        orderList: [...action.orders]
      };
    case types.ORDER_SUCCESSFUL:
      return {
        ...state,
        error: false,
        success: true,
        message: `Order successfully placed with order #${action.order.id}`,
        orderList: [...state.orderList, action.order]
      };
    case types.ORDER_ERROR:
      return {
        ...state,
        error: true,
        success: false,
        message: action.message
      };
    default:
      return state;
  }
}
