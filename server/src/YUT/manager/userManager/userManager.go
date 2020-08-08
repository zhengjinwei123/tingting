package userManager

import (
	"YUT/dbservice/dbgroupservice"
	"YUT/manager"
	"YUT/manager/authManager"
	"YUT/manager/menuManager"
	"YUT/proto"
	"YUT/proto/dbproto"
	"log"
	"net/http"
	"strconv"
	"strings"
	"sync"
)


type UsrSessionManager struct {
	menuList map[string][]*proto.Menu
	authList map[string]map[string]*proto.ReqUrl
}

func NewUsrSessionMgr() *UsrSessionManager {
	usrMgr := &UsrSessionManager{}
	usrMgr.menuList = make(map[string][]*proto.Menu, 0)
	usrMgr.authList = make(map[string]map[string]*proto.ReqUrl, 0)

	return usrMgr
}

func (this *UsrSessionManager) loadAuth(r *http.Request) {
	userName := this.GetUserName(r)
	if userName == "" {
		return
	}

	_, ok := this.authList[userName];
	if ok {
		return
	}

	groupId := this.GetUserGroupId(r)

	var dbGroupInfo dbproto.DBGroupInfo
	err := dbgroupservice.GetAuthList(groupId, &dbGroupInfo)
	if err != nil {
		log.Printf("GetAuthList err %s\n", err.Error())
		return
	}
	authIds := strings.Split(dbGroupInfo.AuthStr, ",")
	if len(authIds) == 0 {
		log.Printf(" GetAuthList err: auths id is empty\n")
		return
	}

	this.authList[userName] = make(map[string]*proto.ReqUrl, 0)

	for _, idStr := range authIds {
		id, _ := strconv.Atoi(idStr)

		req, err := authManager.GetAuthManager().GetAuthById(id)
		if err != nil {
			continue
		}

		t := &proto.ReqUrl{
			Id: id,
			Url: req.Url,
			Desc: req.Desc,
		}
		this.authList[userName][req.Url] = t
	}
}

func (this *UsrSessionManager) clearAuth(userName string) {
	// clear menus
	_, ok := this.authList[userName];
	if ok {
		delete(this.authList, userName)
	}
}


func (this *UsrSessionManager) loadMenu(r *http.Request) {
	userName := this.GetUserName(r)
	if userName == "" {
		return
	}

	groupId := this.GetUserGroupId(r)

	_, ok := this.menuList[userName];
	if ok {
		return
	}

	var dbGroupInfo dbproto.DBGroupInfo
	err := dbgroupservice.GetMenuList(groupId, &dbGroupInfo)
	if err != nil {
		log.Printf(" GetMenuList err %s\n", err.Error())
		return
	}

	menuIds := strings.Split(dbGroupInfo.MenuStr, ",")
	if len(menuIds) == 0 {
		log.Printf(" GetMenuList err: menu id is empty\n")
		return
	}

	allMenuMap := menuManager.GetAllMenuMap()

	this.menuList[userName] = make([]*proto.Menu, 0)

	for _, idStr := range menuIds {
		id, _ := strconv.Atoi(idStr)
		_, ok := allMenuMap[id]
		if ok {
			this.menuList[userName] = append(this.menuList[userName], allMenuMap[id])
		}
	}
}

func (this *UsrSessionManager) clearMenu(userName string) {
	// clear menus
	_, ok := this.menuList[userName];
	if ok {
		delete(this.menuList, userName)
	}
}

func (this *UsrSessionManager) clearSessions(w http.ResponseWriter, r *http.Request) error {
	session, _ := manager.Store.Get(r, "session-key")

	// clear session
	for key, _ := range session.Values {
		delete(session.Values, key)
	}
	return session.Save(r, w)
}


func (this *UsrSessionManager) GetMenuList(r *http.Request) []*proto.Menu {
	userName := this.GetUserName(r)
	data, ok := this.menuList[userName];
	if ok {
		return data
	}
	return nil
}

func (this *UsrSessionManager) SetUserLogin(userName string, groupId int, w http.ResponseWriter, r *http.Request) error {
	session, _ := manager.Store.Get(r, "session-key")
	session.Values["username"] = userName
	session.Values["group_id"] = groupId
	err := session.Save(r, w)

	// load menu
	this.loadMenu(r)
	// load auth
	this.loadAuth(r)

	return err
}

func (this *UsrSessionManager) SetUserLogout(w http.ResponseWriter, r *http.Request) error {
	userName := this.GetUserName(r)
	this.clearMenu(userName)
	this.clearAuth(userName)

	return this.clearSessions(w, r)
}

func (this *UsrSessionManager) UserHasLogin(r *http.Request) bool {
	userName := manager.GetSession("username", r)
	userNameStr := userName.(string)
	if userNameStr == "" {
		return false
	}
	return true
}

func (this *UsrSessionManager) GetUserName(r *http.Request) string {
	userName := manager.GetSession("username", r)
	userNameStr := userName.(string)
	return userNameStr
}

func (this *UsrSessionManager) GetUserGroupId(r *http.Request) int {
	groupIdStr := manager.GetSession("group_id", r)
	groupId := groupIdStr.(int)
	return groupId
}

func (this *UsrSessionManager) CheckAuth(r *http.Request) bool {
	userName := this.GetUserName(r)
	url := r.URL.Path

	_, exists := this.authList[userName]
	if !exists {
		return false
	}
	_, exists = this.authList[userName][url]
	if !exists {
		return false
	}
	return true
}

 // export
var usrSessionMgr *UsrSessionManager
var usrMgrMu sync.Mutex
func GetUsrSessionMgr() *UsrSessionManager {
	if usrSessionMgr == nil {
		usrMgrMu.Lock()
		defer usrMgrMu.Unlock()
		if usrSessionMgr == nil {
			usrSessionMgr = NewUsrSessionMgr()
		}
	}
	return usrSessionMgr
}
