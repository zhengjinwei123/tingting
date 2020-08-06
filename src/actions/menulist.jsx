import CONSTS from "proto/consts.jsx"

export function menuUpdate(data) {
    return {
        type: CONSTS.ACTIONS.MENU_CHANGE,
        data
    }
}

export function menuInit(data) {
    return {
        type: CONSTS.ACTIONS.MENU_INIT,
        data
    }
}