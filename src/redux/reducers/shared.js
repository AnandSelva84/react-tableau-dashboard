import sharedState from "./stateModels/shared";
import { TOGGLE_DRAWER } from "../actions/shared";

const sharedReducer = (state = sharedState, action) => {
  switch (action.type) {
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
