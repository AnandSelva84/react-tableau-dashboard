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
  SET_ALL_ARE_SELECTED,
  SET_CURRENT_MAIN_FILTER,
  SET_ALL_CHECKED_ARRAY,
  SET_VIEWED_FILTERS,
  SET_UNCOMPLETED_FILTERS,
  TOGGLE_RESET_BUTTON,
  SHOW_MESSAGE,
  POP_HISTORY,
  PUSH_HISTORY,
  DATA_FETCHED,
  SET_LOGO_URL,
  SHOW_REPORT_FILTERS,
  SET_CURRENT_LOCATION,
} from "../actions/shared";

const sharedReducer = (state = sharedState, action) => {
  const initialfilter = {
    ID: state.currentMainFilter,
    applied: true,
    filter_id: null,
    id: "Hierarchies",
    lvl: 0,
    parentId: null,
    value: state.currentMainFilter,
  };

  // history: HistoryObject[], times: number
  const popHistory = (history, times) => {
    for (let index = 0; index < times; index++) {
      history.pop();
    }
    return history;
  };

  switch (action.type) {
    case SET_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: action.location,
      };
    case SHOW_REPORT_FILTERS:
      return {
        ...state,
        showReport: !state.showReport,
      };
    case SET_LOGO_URL:
      return {
        ...state,
        logoUrl: action.url,
      };
    case DATA_FETCHED:
      return {
        ...state,
        dataFetched: true,
      };
    case POP_HISTORY:
      const popedHistory = popHistory(state.historyStack, action.times);
      return {
        ...state,
        historyStack: popedHistory,
      };

    case PUSH_HISTORY:
      let arr = state.historyStack;
      arr.push(action.obj);
      return {
        ...state,
        historyStack: arr,
      };
    case SHOW_MESSAGE:
      return {
        ...state,
        snack: {
          ...action.snack,
        },
      };
    case TOGGLE_RESET_BUTTON:
      return {
        ...state,
        resetState: !state.resetState,
      };
    case SET_UNCOMPLETED_FILTERS:
      return {
        ...state,
        unCompleted: action.filters,
      };
    case SET_VIEWED_FILTERS:
      return {
        ...state,
        storedViewedFilters: action.filters,
      };
    case SET_ALL_CHECKED_ARRAY:
      return {
        ...state,
        allCheckArray: action.array,
      };
    case SET_ALL_ARE_SELECTED:
      const { hasAll, title } = action.filter;
      const newHasAll = hasAll
        ? [...state.hasAllSelected, action.filter]
        : [...state.hasAllSelected.filter((filter) => filter.title !== title)];

      return {
        ...state,
        hasAllSelected: [...newHasAll],
      };

    case SET_CURRENT_MAIN_FILTER:
      return {
        ...state,
        currentMainFilter: action.name,
      };
    case SET_BODY_CLASS:
      return {
        ...state,
        body_class: action.css,
      };
    case CLEAR_FILTERS:
      return {
        ...state,
        filterState: [initialfilter],
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
        savedFilters: action.filters,
      };
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
      console.log("action", action.filter);

      const hasParentTest = (id) => {
        state.filterState.find((value) => value.ID === id);
      };
      const hasParent = state.filterState.find(
        (filter) => hasParentTest(filter.parentId) && filter.lvl !== 0
      );
      console.log(!!hasParent);

      const filterd = state.filterState
        // .filter((filter) => filter.lvl <= action.filter.lvl)
        .filter((filter) => filter.ID !== action.filter.ID);
      const hasSameParent = state.filterState.find(
        (filter) => filter.id === action.filter.id
      );
      // const newFilterState =
      //   !!hasSameParent && action.filter.lvl === 0
      //     ? [...filterd, action.filter]
      //     : [...state.filterState, action.filter];

      const newFilterState = [...filterd, action.filter];
      if (action.filter.lvl === 0) {
        return {
          ...state,
          filterState: [action.filter],
        };
      }

      return {
        ...state,
        filterState: newFilterState,
      };
    case DELETE_FILTER:
      let afterEdit = state.filterState
        // .filter((filter) => filter.lvl <= action.filter.lvl)
        .filter((filter) => filter.ID !== action.filter.ID);

      const chosenIds = afterEdit.map((f) => f.ID);

      console.log(
        "values has changed parentIds in after filter",
        afterEdit.filter(
          (f) => chosenIds.includes(f.parentId) || f.parentId === null
        )
      );

      if (action.filter.value === "All") {
        afterEdit = state.filterState
          .filter((filter) => filter.lvl <= action.filter.lvl)
          .filter((filter) => filter.id !== action.filter.id);
      }
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
