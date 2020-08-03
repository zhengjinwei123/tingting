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
/*--------------------------------------------------------------------------*/

var svrConf = NewServerConfig()
var configFile = flag.String("config", "./settings/config.xml", "")
func GetServerConfig() (*serverConfig, error) {
	if err := utils.LoadConfig(*configFile, svrConf); err != nil {
		return nil, errors.New(fmt.Sprintf("load config %v failed: %v \n", *configFile, err))
	}
	return svrConf, nil
}

var myProxy = NewMysqlProxy()
func GetMysqlProxy() *mysqlProxy {
	return myProxy
}
