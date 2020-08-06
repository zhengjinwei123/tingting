package service

import (
	"YUT/dbservice/groupService"
	"YUT/manager/userManager"
	"YUT/proto/dbproto"
	"YUT/proto/netproto"
	"net/http"
)

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

func GroupList(w http.ResponseWriter, r *http.Request) {
	_ = r.ParseForm()

	response := &netproto.NetGroupResponse{}
	response.SetResponseWriter(w)

	var dbGroupList []*dbproto.DBGroupListInfo
	err := groupService.GetGroupList(&dbGroupList)
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
