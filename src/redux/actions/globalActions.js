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