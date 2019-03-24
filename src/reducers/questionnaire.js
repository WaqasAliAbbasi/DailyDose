import * as types from "../constants/ActionTypes";

const initialState = {
  error: false,
  message: "",
  processing: false,
  success: false,
  questionnaire: {}
};

export default function questionnaire(state = initialState, action) {
  switch (action.type) {
    case types.GET_QUESTIONNAIRE:
      return {
        ...state,
        error: false,
        message: "",
        processing: false,
        success: false,
        questionnaire: action.questionnaire
      };
    case types.QUESTIONNAIRE_ERROR:
      return {
        ...state,
        error: true,
        message: action.message,
        processing: false
      };
    case types.QUESTIONNAIRE_SUBMIT_PROCESSING:
      return {
        ...state,
        error: false,
        message: "",
        processing: true,
        success: false
      };
    case types.QUESTIONNAIRE_SUBMIT_SUCCESS:
      return {
        ...state,
        error: false,
        message: "",
        processing: false,
        success: true
      };
    default:
      return state;
  }
}
