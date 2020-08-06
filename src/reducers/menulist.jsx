import CONSTS from "proto/consts.jsx"

const initialState = {}

export default function menuList(state = initialState, action) {
    switch(action.type) {
        case CONSTS.ACTIONS.MENU_CHANGE:
            return action.data
        case CONSTS.ACTIONS.MENU_INIT:
            return action.data
        default:
            return state
    }
}