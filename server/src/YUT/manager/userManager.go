package manager

import "net/http"


type UsrManager struct {

}

func NewUsrMgr() *UsrManager {
	usrMgr := &UsrManager{}

	return usrMgr
}

func (UsrMgr *UsrManager) SetUserLogin(userName string, w http.ResponseWriter, r *http.Request) error {
	session, _ := Store.Get(r, "session-key")
	session.Values["username"] = userName
	err := session.Save(r, w)
	return err
}

func (UsrMgr *UsrManager) SetUserLogout(w http.ResponseWriter, r *http.Request) error {
	session, _ := Store.Get(r, "session-key")

	for key, _ := range session.Values {
		delete(session.Values, key)
	}
	err := session.Save(r, w)
	return err
}

func (UsrMgr *UsrManager) UserHasLogin(r *http.Request) bool {
	userName := GetSession("username", r)
	userNameStr := userName.(string)
	if userNameStr == "" {
		return false
	}
	return true
}
