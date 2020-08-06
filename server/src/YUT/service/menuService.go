package service

import (
	"YUT/manager/userManager"
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