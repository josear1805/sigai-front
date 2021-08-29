import { types } from "src/types";

const initialState = {
    dataUser: {}
}

export const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.login:
            return {
                ...state,
                dataUser: action.payload
            }
        case types.logout:
            return {
                ...state,
                dataUser: {}
            }
        default:
            return state
    }
}