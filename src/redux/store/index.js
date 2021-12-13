import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "../reducers/globalSlice";
import datosIndicadorReducer from "../reducers/datosIndicadorSlice";
import fichaIndicadorReducer from "../reducers/fichaIndicadorSlice";

export const store = configureStore({
    reducer: {
        global: globalReducer,
        datosIndicador: datosIndicadorReducer,
        fichaIndicador: fichaIndicadorReducer,
    },
});
