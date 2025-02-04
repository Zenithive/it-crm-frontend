import { combineReducers } from "redux";

import {authReducer} from "../actions/authReducer";

const rootReducer = combineReducers({
  user:authReducer
});
export default rootReducer;