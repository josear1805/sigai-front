import { combineReducers } from "redux";
import { globalReducer } from "./globalReducer";
import { indicatorDataReducer } from "./indicatorDataReducer";

export default  combineReducers({
    global: globalReducer,
    indicatorData: indicatorDataReducer,
});