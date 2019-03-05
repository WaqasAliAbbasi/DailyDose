import * as types from "../constants/ActionTypes";

const initialState = [];

export default function notes(state = initialState, action) {
  let noteList = state.slice();
  switch (action.type) {
    case types.FETCH_NOTES:
      return [...action.notes];

    case types.ADD_NOTE:
      return [...state, action.note];

    case types.UPDATE_NOTE:
      let noteToUpdate = noteList[action.index];
      noteToUpdate.text = action.note.text;
      noteList.splice(action.index, 1, noteToUpdate);
      return noteList;

    case types.DELETE_NOTE:
      noteList.splice(action.index, 1);
      return noteList;

    default:
      return state;
  }
}
