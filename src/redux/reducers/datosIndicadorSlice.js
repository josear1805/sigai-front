import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listaIndicadores: [],
    listaGerencias: [],
    listaVicePresidencias: [],
    idVicePresidencia: 0,
    listaGerenciasMostrar: [],
    idGerencia: 0,
    listaIndicadoresMostrar: [],
}

export const datosIndicadorSlice = createSlice({
    name: "datosIndicador",
    initialState,
    reducers: {
        setIndicatorData: (state, action) => {
            return action.payload;
        },
    },
});

export const { 
    setIndicatorData,
} = datosIndicadorSlice.actions;

export default datosIndicadorSlice.reducer;
