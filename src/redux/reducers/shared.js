import sharedState from "./stateModels/shared";
import {
  ADD_FILTER,
  TOGGLE_DRAWER,
  SET_APP,
  DELETE_FILTER,
  SET_DARK_MODE,
  SET_APP_LOADING,
  SET_APPLICATION,
  SET_FILTERS,
  FILTER_STATE_EDIT,
} from "../actions/shared";

const sharedReducer = (state = sharedState, action) => {
  switch (action.type) {
    case FILTER_STATE_EDIT:
      return {
        ...state,
        filterState: action.filterState,
      };
    case SET_FILTERS:
      return {
        ...state,
        newFilters: action.filters,
      };
    case SET_APPLICATION:
      return {
        ...state,
        app: action.app,
      };
    case SET_APP_LOADING:
      return {
        ...state,
        appIsLoading: action.state,
      };
    case SET_DARK_MODE:
      return {
        ...state,
        darkMode: action.state,
      };
    case ADD_FILTER:
      const filterd = state.filterState.filter(
        (filter) => filter.id !== action.filter.id
      );
      const hasSameParent = state.filterState.find(
        (filter) => filter.id === action.filter.id
      );
      const newFilterState =
        !!hasSameParent && action.filter.lvl === 0
          ? [...filterd, action.filter]
          : [...state.filterState, action.filter];
      return {
        ...state,
        filterState: newFilterState,
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
