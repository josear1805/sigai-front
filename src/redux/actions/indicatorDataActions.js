import { types } from "src/types";

export const setIndicatorData = (payload) => {
    return {
        type: types.setIndicatorData,
        payload
    }
}
