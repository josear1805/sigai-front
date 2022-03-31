import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listaUsuarios: [],
    listaGerencias: [],
    listaVicePresidencias: [],
    idVicePresidencia: null,
    listaGerenciasMostrar: [],
    idGerencia: null,
    listaUsuariosMostrar: [],
}

export const usuariosSlice = createSlice({
    name: "usuarios",
    initialState,
    reducers: {
        setUsuarios: (state, action) => {
            return action.payload;
        },
    },
});

export const { 
    setUsuarios,
} = usuariosSlice.actions;

export default usuariosSlice.reducer;
