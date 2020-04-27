import { createStore, combineReducers } from "redux";
import sharedReducer from "./reducers/shared";

const rootReducer = combineReducers({
  sharedReducer,
});

const store = createStore(rootReducer);
store.subscribe(() => {
  console.log("store ", store.getState());
});

export default store;
