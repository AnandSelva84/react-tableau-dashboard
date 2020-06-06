export const TOGGLE_DRAWER = "TOGGLE_DRAWER";
export const SET_APP = "SET_APP";
export const ADD_FILTER = "ADD_FILTER";
export const DELETE_FILTER = "DELETE_FILTER";
export const SET_DARK_MODE = "SET_DARK_MODE";
export const SET_APP_LOADING = "SET_APP_LOADING";
export const SET_APPLICATION = "SET_APPLICATION";
export const SET_FILTERS = "SET_FILTERS";
export const FILTER_STATE_EDIT = "FILTER_STATE_EDIT";
export const SAVE_FILTERS = "SAVE_FILTERS";
export const APPLY_FILTERS = "APPLY_FILTERS";
export const SET_ALL_CHECKED_ARRAY = "SET_ALL_CHECKED_ARRAY";
export const CLEAR_FILTERS = "CLEAR_FILTERS";
export const SET_BODY_CLASS = "SET_BODY_CLASS";
export const SET_ALL_ARE_SELECTED = "SET_ALL_ARE_SELECTED";
export const SET_CURRENT_MAIN_FILTER = "SET_CURRENT_MAIN_FILTER";

export const setAllCheckArray = (array) => ({
  type: SET_ALL_CHECKED_ARRAY,
  array,
});

export const setCurrentMainFilter = (name) => ({
  type: SET_CURRENT_MAIN_FILTER,
  name,
});

export const setBodyClass = (css) => ({
  type: SET_BODY_CLASS,
  css,
});

export const clearFilter = () => ({
  type: CLEAR_FILTERS,
});

export const applyFilters = (filters) => ({
  type: APPLY_FILTERS,
  filters,
});

export const saveFilters = (filters) => ({
  type: SAVE_FILTERS,
  filters,
});

export const editFilterState = (filterState) => ({
  type: FILTER_STATE_EDIT,
  filterState,
});

export const setFilters = (filters) => ({
  type: SET_FILTERS,
  filters,
});

export const setApp = (app) => ({
  type: SET_APPLICATION,
  app,
});

export const setAppLoading = (state) => ({
  type: SET_APP_LOADING,
  state,
});

//state is boolean
export const setDarkMode = (state) => ({
  type: SET_DARK_MODE,
  state,
});

export const addFilter = (filter) => ({
  //filter : {id : string , value : srting}
  type: ADD_FILTER,
  filter,
});

export const deleteFilter = (filter) => ({
  type: DELETE_FILTER,
  filter,
});

export const toggleDrawer = () => ({
  type: TOGGLE_DRAWER,
});

//filter : {hasAll : boolean , title : string}
export const setAllAreSelected = (filter) => ({
  type: SET_ALL_ARE_SELECTED,
  filter,
});
