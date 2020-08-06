import { combineReducers } from "redux"
import userinfo from "reducers/userinfo.jsx"
import menuList from "reducers/menulist.jsx";

const rootReducer =  combineReducers({
    userinfo,
    menuList
})

export default rootReducer;