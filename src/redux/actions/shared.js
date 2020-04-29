export const TOGGLE_DRAWER = "TOGGLE_DRAWER";
export const SET_APP = "SET_APP";
export const ADD_FILTER = "ADD_FILTER";
export const DELETE_FILTER = "DELETE_FILTER";
export const SET_DARK_MODE = "SET_DARK_MODE";

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

export const setApp = (app) => ({
  type: SET_APP,
  app,
});
