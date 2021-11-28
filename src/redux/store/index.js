import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "../reducers/globalSlice";
import datosIndicadorReducer from "../reducers/datosIndicadorSlice";

export const store = configureStore({
    reducer: {
        global: globalReducer,
        datosIndicador: datosIndicadorReducer,
    },
});
