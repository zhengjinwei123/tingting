package manager

import (
	"YUT/utils"
	"errors"
	"flag"
	"fmt"
	"sync"
)

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
/*-------------------------server config-------------------------------------------------*/

var svrConf = NewServerConfig()
var configFile = flag.String("config", "./settings/config.xml", "")
func GetServerConfig() (*serverConfig, error) {
	if err := utils.LoadXmlConfig(*configFile, svrConf); err != nil {
		return nil, errors.New(fmt.Sprintf("load server config %v failed: %v \n", *configFile, err))
	}
	return svrConf, nil
}

/* mysql */
var myProxy = NewMysqlProxy()
func GetMysqlProxy() *mysqlProxy {
	return myProxy
}

/*-------------------------menu config-------------------------------------------------*/
func GetMenuList() *sMenuList {
	return menuList
}
