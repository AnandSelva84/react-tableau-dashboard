import sharedState from "./stateModels/shared";
import {
  ADD_FILTER,
  TOGGLE_DRAWER,
  SET_APP,
  DELETE_FILTER,
} from "../actions/shared";

const sharedReducer = (state = sharedState, action) => {
  switch (action.type) {
    case ADD_FILTER:
      return {
        ...state,
        filterState: [...state.filterState, action.filter],
      };
    case DELETE_FILTER:
      return {
        ...state,
        filterState: [
          ...state.filterState.filter(
            (filter) =>
              filter.id !== action.filter.id ||
              filter.value !== action.filter.value
          ),
        ],
      };
    case SET_APP:
      return {
        ...state,
        currentApp: action.app,
      };
    case TOGGLE_DRAWER:
      return {
        ...state,
        drawer: !state.drawer,
      };
    default:
      return {
        ...state,
      };
  }
};

export default sharedReducer;
