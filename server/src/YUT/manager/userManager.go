package manager

import (
	"net/http"
	"time"
)


type UsrSessionManager struct {
	UserMap map[string]int64
}

func NewUsrSessionMgr() *UsrSessionManager {
	usrMgr := &UsrSessionManager{}

	usrMgr.UserMap = make(map[string]int64, 0)

	return usrMgr
}

func (this *UsrSessionManager) SetUserLogin(userName string, w http.ResponseWriter, r *http.Request) error {
	session, _ := Store.Get(r, "session-key")
	session.Values["username"] = userName
	err := session.Save(r, w)

	if err == nil {
		this.UserMap[userName] = time.Now().Unix()
	}

	return err
}

func (this *UsrSessionManager) SetUserLogout(w http.ResponseWriter, r *http.Request) error {
	session, _ := Store.Get(r, "session-key")

	userName := GetSession("username", r)
	username1 := userName.(string)

	for key, _ := range session.Values {
		delete(session.Values, key)
	}
	err := session.Save(r, w)

	if err == nil {
		delete(this.UserMap, username1)
	}

	return err
}

func (this *UsrSessionManager) UserHasLogin(r *http.Request) bool {
	userName := GetSession("username", r)
	userNameStr := userName.(string)
	if userNameStr == "" {
		username := r.PostFormValue("username")
		if username != "" {
			_, ok := this.UserMap[username]
			if ok {
				delete(this.UserMap, username)
			}
		}
		return false
	}
	return true
}

func (this *UsrSessionManager) GetOnlineUsers() {

}
