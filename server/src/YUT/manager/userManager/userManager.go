package userManager

import (
	"YUT/dbservice/groupService"
	"YUT/manager"
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
}

func NewUsrSessionMgr() *UsrSessionManager {
	usrMgr := &UsrSessionManager{}
	usrMgr.menuList = make(map[string][]*proto.Menu, 0)
	return usrMgr
}

func (this *UsrSessionManager) LoadMenu(r *http.Request) {
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
	err := groupService.GetMenuList(groupId, &dbGroupInfo)
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
	this.LoadMenu(r)

	return err
}

func (this *UsrSessionManager) SetUserLogout(w http.ResponseWriter, r *http.Request) error {
	session, _ := manager.Store.Get(r, "session-key")
	userName := this.GetUserName(r)
	// clear session
	for key, _ := range session.Values {
		delete(session.Values, key)
	}
	err := session.Save(r, w)

	// clear menus
	_, ok := this.menuList[userName];
	if ok {
		delete(this.menuList, userName)
	}

	return err
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

func (this *UsrSessionManager) GetOnlineUsers() {

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
