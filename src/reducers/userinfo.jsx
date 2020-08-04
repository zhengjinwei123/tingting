import CONSTS from "proto/consts.jsx"

const initialState = {}

export default function userinfo(state = initialState, action) {
    switch(action.type) {
        case CONSTS.ACTIONS.USERINFO_LOGIN:
            return action.data
        default:
            return state
    }
}