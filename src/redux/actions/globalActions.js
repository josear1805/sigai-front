import { makeRequest } from "src/helpers";
import { Dispatch } from "react";
import { types } from "src/types";

export const setUser = (payload) => {
    return {
        type: types.setUser,
        payload
    }
}

export const logout = (payload) => {
    return {
        type: types.logout,
        payload
    }
}

export const getListadosCategorias = () => dispatch => {
    makeRequest({
        method: "POST",
        path: "/indican/categoriasindicadores.php",
        body: {
            token: 1234
        }
    }).then(response => {
        if (response.estatus == 1) {
            dispatch({
                type: types.setListaCategorias,
                payload: response.categorias
            })

        }
    })
}