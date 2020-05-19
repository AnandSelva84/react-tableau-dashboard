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
  SAVE_FILTERS,
  APPLY_FILTERS,
  CLEAR_FILTERS,
  SET_BODY_CLASS,
} from "../actions/shared";

const sharedReducer = (state = sharedState, action) => {
  switch (action.type) {
    case SET_BODY_CLASS:
      return {
        ...state,
        body_class: action.css,
      };
    case CLEAR_FILTERS:
      return {
        ...state,
        filterState: [],
      };
    case APPLY_FILTERS:
      return {
        ...state,
        appliedFilters: action.filters,
      };
    case SAVE_FILTERS:
      localStorage.setItem("filters", JSON.stringify(action.filters));
      return {
        ...state,
      };
    case FILTER_STATE_EDIT:
      console.log("edit", action);
      debugger;

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
      const afterEdit = state.filterState
        .filter((filter) => filter.lvl <= action.filter.lvl)
        .filter(
          (filter) =>
            filter.id !== action.filter.id ||
            filter.value !== action.filter.value
        );
      return {
        ...state,
        filterState: [...afterEdit],
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
