import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { makeRequest } from "src/helpers";

const initialState = {
    loadingGeneral: true,
    dataUser: {
        token: null
    },
    listaCategorias: [],
    error: {
        dataUser: false,
    },
    listaMenu: [],
};

export const setUser = createAsyncThunk("dataUser", async (token) => {
    const response = await makeRequest({
        method: "POST",
        path: "/indican/datosusuario.php"
    });

    if (response.estatus == 1) {
        response.datosUsuario.token = token

    } else {
        localStorage.removeItem("user");
    }
 
    return response.datosUsuario;
});

export const setListadosCategorias = createAsyncThunk("listadosCategorias", async () => {
    const response = await makeRequest({
        path: "/indican/categoriasindicadores.php",
        method: "POST",
    });
    return response.categorias;
});

export const setListaMenu = createAsyncThunk("listaMenu", async () => {
    const response = await makeRequest({
        method: "POST",
        path: "/indican/menu.php",
    });
    return response.listaMenu;
});

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        /* User */
        builder.addCase(setUser.pending, (state, action) => {
            state.loadingGeneral = true;
        });
        builder.addCase(setUser.fulfilled, (state, action) => {
            state.loadingGeneral = false;
            state.dataUser = action.payload;
        });
        builder.addCase(setUser.rejected, (state, action) => {
            state.error.dataUser = true;
        });
        /* Lista Categorias */
        builder.addCase(setListadosCategorias.fulfilled, (state, action) => {
            state.listaCategorias = action.payload;
        });
        /* Lista Menu */
        builder.addCase(setListaMenu.fulfilled, (state, action) => {
            state.listaMenu = action.payload;
        });
    },
});

// export const { setDefault } = globalSlice.actions;

export default globalSlice.reducer;
