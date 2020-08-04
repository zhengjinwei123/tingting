import CONSTS from "proto/consts.jsx"

export function login(data) {
    return {
        type: CONSTS.ACTIONS.USERINFO_LOGIN,
        data
    }
}