import  authReducer  from "./authReducer";
import { combineReducers } from "redux";
import countReducer from "./countReducer";

const rootReducer = combineReducers({
  authReducer,
  countReducer,
});

export default rootReducer;
