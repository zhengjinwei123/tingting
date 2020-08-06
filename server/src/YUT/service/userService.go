package service

import (
	"YUT/dbservice/userservice"
	"YUT/manager/userManager"
	"YUT/proto/dbproto"
	"YUT/proto/netproto"
	"YUT/utils/orm"
	"log"
	"net/http"
)


func UserLogin(w http.ResponseWriter, r *http.Request) {
	_ = r.ParseForm()
	request := &netproto.NetUserLoginRequest{}

	err := orm.UnmarshalHttpValues(request, r.PostForm)
	if err != nil {
		log.Fatalf("UnmarshalHttpValues error: [%v] %v \n",r.PostForm, err)
		return
	}

	response := &netproto.NetUserLoginResponse{}
	response.SetResponseWriter(w)
	response.UserName = request.UserName

	if userManager.GetUsrSessionMgr().UserHasLogin(r) {
		response.Msg = "user has login";
		response.ResponseError();
		return;
	}

	var dbUser dbproto.DBUserInfo
	if err := userservice.GetUser(request.UserName, request.Password, &dbUser); err != nil {
		response.Msg = "user [" +request.UserName + "] not found"
		response.ResponseError();
		return
	}

	err = userManager.GetUsrSessionMgr().SetUserLogin(request.UserName, dbUser.GroupId, w, r)
	if err != nil {
		response.Msg = "user login failed"
		response.ResponseError()
		return
	}

	response.ResponseSuccess()
}

func UserLogout(w http.ResponseWriter, r *http.Request) {
	response := netproto.NetUserLoginResponse{
		UserName: "",
	}
	response.SetResponseWriter(w)

	_ = userManager.GetUsrSessionMgr().SetUserLogout(w, r)
	response.ResponseSuccess()
}

func UserRegister(w http.ResponseWriter, r *http.Request) {
	_ = r.ParseForm()

	request := &netproto.NetUserRegisterRequest{}


	err := orm.UnmarshalHttpValues(request, r.PostForm)
	if err != nil {
		log.Fatalf("UnmarshalHttpValues error: [%v] %v \n",r.PostForm, err)
		return
	}

	response := &netproto.NetUserRegisterResponse{}
	response.SetResponseWriter(w)

	err = userservice.RegisterUser(request.UserName, request.Password, request.Email, request.GroupId)
	if err != nil {
		response.Msg = err.Error();
		response.ResponseError()
		return
	}

	response.ResponseSuccess()
}