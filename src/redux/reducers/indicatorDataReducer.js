import { types } from "src/types";

const initialState = {
    listaVicePresidencias: [],
    idVicePresidencia: 0,
    listaGerenciasMostrar: [],
    idGerencia: 0,
    listaIndicadoresMostrar: [],
}

export const indicatorDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.setIndicatorData:
            return Object.assign({}, state, action.payload)
        default:
            return state
    }
}