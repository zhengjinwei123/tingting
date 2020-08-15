package service

import (
	"YUT/dbservice/dbgroupservice"
	"YUT/manager/authManager"
	"YUT/manager/menuManager"
	"YUT/manager/userManager"
	"YUT/proto/dbproto"
	"YUT/proto/netproto"
	"YUT/utils/orm"
	"log"
	"net/http"
)

func GroupList(w http.ResponseWriter, r *http.Request) {
	_ = r.ParseForm()

	response := &netproto.NetGroupResponse{}
	response.SetResponseWriter(w)

	var dbGroupList []*dbproto.DBGroupInfo
	err := dbgroupservice.GetGroupList(&dbGroupList)
	if err != nil {
		response.Msg = err.Error()
		response.ResponseError()
		return
	}

	for _, v := range dbGroupList {
		groupInfo := &netproto.Group{
			Id: v.GroupId,
			Desc: v.Desc,
		}
		response.GroupList = append(response.GroupList, groupInfo)
	}

	response.ResponseSuccess()
}

func GroupDetailList(w http.ResponseWriter, r *http.Request) {
	_ = r.ParseForm()
	response := &netproto.NetGroupDetailListResponse{}
	response.SetResponseWriter(w)

	var dbGroupList []*dbproto.DBGroupInfo
	err := dbgroupservice.GetGroupList(&dbGroupList)
	if err != nil {
		response.Msg = err.Error()
		response.ResponseError()
		return
	}
	for _, v := range dbGroupList {
		groupDetail := &netproto.GroupDetail{
			Id: v.GroupId,
			Desc: v.Desc,
			Menus: v.MenuStr,
			Auths: v.AuthStr,
		}
		response.GroupList = append(response.GroupList, groupDetail)
	}

	response.ResponseSuccess()
}

func GroupAdd(w http.ResponseWriter, r *http.Request) {
	_ = r.ParseForm()

	request := &netproto.NetGroupAddRequest{}

	err := orm.UnmarshalHttpValues(request, r.PostForm)
	if err != nil {
		log.Printf("UnmarshalHttpValues error: [%v] %v \n",r.PostForm, err)
		return
	}

	response := &netproto.NetGroupAddResponse{}
	response.SetResponseWriter(w)

	err = dbgroupservice.AddGroup(request.GroupName, request.Menus, request.Auths)
	if err != nil {
		response.Msg = err.Error();
		response.ResponseError()
		return
	}

	response.ResponseSuccess()
}

func GroupAuthUpdate(w http.ResponseWriter, r *http.Request) {
	_ = r.ParseForm()

	request := &netproto.NetGroupAuthUpdateRequest{}

	err := orm.UnmarshalHttpValues(request, r.PostForm)
	if err != nil {
		log.Printf("UnmarshalHttpValues error: [%v] %v \n",r.PostForm, err)
		return
	}

	response := &netproto.NetGroupAuthUpdateResponse{}
	response.SetResponseWriter(w)

	err = dbgroupservice.GroupAuthUpdate(request.GroupId, request.Menus, request.Auths)
	if err != nil {
		response.Msg = err.Error();
		response.ResponseError()
		return
	}

	userManager.GetUsrSessionMgr().ReloadGroupAuth(r, request.GroupId)

	response.ResponseSuccess()
}

func AuthList(w http.ResponseWriter, r *http.Request) {
	_ = r.ParseForm()
	response := &netproto.NetAuthListResponse{}
	response.SetResponseWriter(w)

	auth_map := authManager.GetAuthManager().GetAuthMap()

	for _, vList := range auth_map {
		for _, v := range vList {
			auth := &netproto.Auth{
				Id: v.Id,
				Desc: v.Desc,
				Url: v.Url,
			}

			response.AuthList = append(response.AuthList, auth)
		}
	}

	menue_map := menuManager.GetAllMenuMap()
	for _, v := range menue_map {
		auth := &netproto.Auth{
			Id: v.Id,
			Desc: v.Desc,
			Url: "",
		}

		response.MenuList = append(response.MenuList, auth)
	}

	response.ResponseSuccess()
}
