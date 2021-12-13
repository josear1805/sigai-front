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

export const fichaIndicadorSlice = createSlice({
    name: "fichaIndicador",
    initialState,
    reducers: {
        setFichaIndicador: (state, action) => {
            return action.payload;
        },
    },
});

export const { 
    setFichaIndicador,
} = fichaIndicadorSlice.actions;

export default fichaIndicadorSlice.reducer;
