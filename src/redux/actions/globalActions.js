import { types } from "src/types";

export const login = (payload) => {
    return {
        type: types.login,
        payload
    }
}

export const logout = (payload) => {
    return {
        type: types.logout,
        payload
    }
}