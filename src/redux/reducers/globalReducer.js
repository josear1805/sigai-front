import { types } from "src/types";

const initialState = {
    dataUser: {
        nombres: null
    }
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
        default:
            return state
    }
}