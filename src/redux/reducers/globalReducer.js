import { types } from "src/types";

const initialState = {
    dataUser: {
        nombres: null
    },
    listaCategorias: [],
}

export const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.setUser:
            return {
                ...state,
                dataUser: action.payload
            }
        case types.logout:
            return {
                ...state,
                dataUser: {}
            }
        case types.setListaCategorias:
            return {
                ...state,
                listaCategorias: action.payload
            }
        default:
            return state
    }
}