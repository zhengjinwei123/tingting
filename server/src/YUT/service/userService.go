package service

import (
	"YUT/dbservice/userservice"
	"YUT/manager"
	"YUT/proto"
	"YUT/utils/orm"
	"log"
	"net/http"
)


func UserLogin(w http.ResponseWriter, r *http.Request) {
	_ = r.ParseForm()
	request := &proto.NetUserLoginRequest{}

	err := orm.UnmarshalHttpValues(request, r.PostForm)
	if err != nil {
		log.Fatalf("UnmarshalHttpValues error: [%v] %v \n",r.PostForm, err)
		return
	}

	response := &proto.NetUserLoginResponse{}
	response.SetResponseWriter(w)
	response.UserName = request.UserName

	if manager.GetUsrSessionMgr().UserHasLogin(r) {
		response.Msg = "user has login";
		response.ResponseError();
		return;
	}

	var dbUser proto.DBUserInfo
	if err := userservice.GetUser(request.UserName, request.Password, &dbUser); err != nil {
		response.Msg = "user [" +request.UserName + "] not found"
		response.ResponseError();
		return
	}

	err = manager.GetUsrSessionMgr().SetUserLogin(request.UserName, w, r)
	if err != nil {
		response.Msg = "user has login failed"
		response.ResponseError()
		return
	}

	response.ResponseSuccess()
}

func UserLogout(w http.ResponseWriter, r *http.Request) {
	response := proto.NetUserLoginResponse{
		UserName: "",
	}
	response.SetResponseWriter(w)

	_ = manager.GetUsrSessionMgr().SetUserLogout(w, r)
	response.ResponseSuccess()
}

func UserRegister(w http.ResponseWriter, r *http.Request) {
	_ = r.ParseForm()

	request := &proto.NetUserRegisterRequest{}


	err := orm.UnmarshalHttpValues(request, r.PostForm)
	if err != nil {
		log.Fatalf("UnmarshalHttpValues error: [%v] %v \n",r.PostForm, err)
		return
	}

	response := &proto.NetUserRegisterResponse{}
	response.SetResponseWriter(w)

	err = userservice.RegisterUser(request.UserName, request.Password, request.Email)
	if err != nil {
		response.Msg = err.Error();
		response.ResponseError()
		return
	}

	response.ResponseSuccess()
}