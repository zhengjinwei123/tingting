package userservice

import (
	"YUT/dbservice/dbuserservice"
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
		log.Printf("UnmarshalHttpValues error: [%v] %v \n",r.PostForm, err)
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
	if err := dbuserservice.GetUser(request.UserName, request.Password, &dbUser); err != nil {
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
		log.Printf("UnmarshalHttpValues error: [%v] %v \n",r.PostForm, err)
		return
	}

	response := &netproto.NetResponse{}
	response.SetResponseWriter(w)

	err = dbuserservice.RegisterUser(request.UserName, request.Password, request.Email, request.GroupId)
	if err != nil {
		response.Msg = err.Error();
		response.ResponseError()
		return
	}

	response.ResponseSuccess()
}

func MenuList(w http.ResponseWriter, r *http.Request) {
	_ = r.ParseForm()

	response := &netproto.NetMenuListResponse {}
	response.SetResponseWriter(w)

	menuList := userManager.GetUsrSessionMgr().GetMenuList(r)

	for _, v := range menuList {
		t := &netproto.Menu {
			Id: v.Id,
			Icon: v.Icon,
			Desc: v.Desc,
			Sort: v.Sort,
			ParentId: v.ParentId,
			Link: v.Link,
		}
		response.MenuList = append(response.MenuList, t)
	}

	response.ResponseSuccess()
}

func UserList(w http.ResponseWriter, r *http.Request) {
	_ = r.ParseForm()

	response := &netproto.NetUserListResponse {}
	response.SetResponseWriter(w)

	var dbUserList []*dbproto.DBUserInfo

	err := dbuserservice.GetUserList(&dbUserList)
	if err != nil {
		response.Msg = err.Error();
		response.ResponseError()
		return
	}

	for _, v := range dbUserList {
		t := &netproto.NetUserDetail {
			UserName: v.UserName,
			GroupId: v.GroupId,
			Email: v.Email,
		}
		response.UserList = append(response.UserList, t)
	}

	response.ResponseSuccess()
}

func Update(w http.ResponseWriter, r *http.Request) {
	_ = r.ParseForm()

	request := &netproto.NetUserUpdateRequest{}


	err := orm.UnmarshalHttpValues(request, r.PostForm)
	if err != nil {
		log.Printf("UnmarshalHttpValues error: [%v] %v \n",r.PostForm, err)
		return
	}

	response := &netproto.NetResponse{}
	response.SetResponseWriter(w)

	if request.UserName == "admin" {
		response.Msg = "not auth"
		response.ResponseError()
		return
	}

	err = dbuserservice.UserUpdate(request.UserName, request.Email, request.GroupId)
	if err != nil {
		response.Msg = err.Error();
		response.ResponseError()
		return
	}

	response.ResponseSuccess()
}

func Delete(w http.ResponseWriter, r *http.Request) {
	_ = r.ParseForm()

	request := &netproto.NetUserDeleteRequest{}


	err := orm.UnmarshalHttpValues(request, r.PostForm)
	if err != nil {
		log.Printf("UnmarshalHttpValues error: [%v] %v \n",r.PostForm, err)
		return
	}

	response := &netproto.NetResponse{}
	response.SetResponseWriter(w)

	if request.UserName == "admin" {
		response.Msg = "not auth"
		response.ResponseError()
		return
	}

	err = dbuserservice.UserDelete(request.UserName)
	if err != nil {
		response.Msg = err.Error();
		response.ResponseError()
		return
	}

	response.ResponseSuccess()
}

func UpdatePassword(w http.ResponseWriter, r *http.Request) {
	_ = r.ParseForm()

	request := &netproto.NetUserUpdatePasswordRequest{}


	err := orm.UnmarshalHttpValues(request, r.PostForm)
	if err != nil {
		log.Printf("UnmarshalHttpValues error: [%v] %v \n",r.PostForm, err)
		return
	}

	response := &netproto.NetResponse{}
	response.SetResponseWriter(w)

	if request.UserName == "admin" {
		response.Msg = "not auth"
		response.ResponseError()
		return
	}

	err = dbuserservice.UserUpdatePassword(request.UserName, request.Password)
	if err != nil {
		response.Msg = err.Error();
		response.ResponseError()
		return
	}

	response.ResponseSuccess()
}
