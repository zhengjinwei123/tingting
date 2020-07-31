package manager

import (
	"YUT/utils"
	"errors"
	"flag"
	"fmt"
	"sync"
)

var usrMgr *UsrManager
var usrMgrMu sync.Mutex
func GetUsrMgr() *UsrManager {
	if usrMgr == nil {
		usrMgrMu.Lock()
		defer usrMgrMu.Unlock()
		if usrMgr == nil {
			usrMgr = NewUsrMgr()
		}
	}
	return usrMgr
}

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
