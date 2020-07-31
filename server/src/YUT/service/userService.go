package service

import (
	"YUT/dbservice"
	"YUT/manager"
	"YUT/proto"
	"fmt"
	"log"
	"net/http"
)



func UserLogin(w http.ResponseWriter, r *http.Request) {

	if manager.GetUsrMgr().UserHasLogin(r) {
		fmt.Println("UserLogin HAS LOGIN")
	}

	username := r.PostFormValue("username")
	password := r.PostFormValue("password")

	var dbUser proto.DBUserInfo
	log.Println(":", username, password)
	if err := dbservice.GetUser(username, password, &dbUser); err != nil {
		fmt.Println("user not found",err)
		ResponseError("user not found", w)
		return
	}

	log.Println("has user:", dbUser)

	userInfo := &proto.NetUserInfo{
		UserName: dbUser.UserName,
	}

	err := manager.GetUsrMgr().SetUserLogin(username, w, r)
	if err != nil {
		fmt.Println(err)
		ResponseError("user login failed", w)
	} else {
		ResponseSuccess(userInfo, w)
	}
}

func UserLogout(w http.ResponseWriter, r *http.Request) {

	fmt.Println("UserLogout called")

	_ = manager.GetUsrMgr().SetUserLogout(w, r)
	ResponseSuccess(nil, w)
}