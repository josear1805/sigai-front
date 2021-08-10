import { types } from "src/types";

const initialState = {
    auth: {}
}

export const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.login:
            return {
                ...state,
                auth: {
                    name: action.payload.name,
                    token: action.payload.token
                }
            }
        case types.logout:
            return {
                ...state,
                auth: {}
            }
        default:
            return state
    }
}