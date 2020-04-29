import sharedState from "./stateModels/shared";
import {
  ADD_FILTER,
  TOGGLE_DRAWER,
  SET_APP,
  DELETE_FILTER,
  SET_DARK_MODE,
} from "../actions/shared";

const sharedReducer = (state = sharedState, action) => {
  switch (action.type) {
    case SET_DARK_MODE:
      return {
        ...state,
        darkMode: action.state,
      };
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
