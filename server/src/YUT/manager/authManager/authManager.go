package authManager

import (
	"YUT/proto"
	"YUT/utils"
	"errors"
	"flag"
	"fmt"
	"log"
	"strconv"
	"strings"
)

var authFile = flag.String("authconfig", "./settings/menu.json", "")
var requestConf = newRequestJsonConfig()

var g_authM *authManager = nil

type requestJsonConfig struct {
	RequestList [][]string `json:"requestlist"`
}

func newRequestJsonConfig() *requestJsonConfig {
	return &requestJsonConfig{}
}

func newAuthManager() *authManager {
	authM := &authManager{}
	authM.hasInit = false
	authM.reqMap = make(map[int]*proto.ReqUrl, 0)

	return authM
}

func GetAuthManager() *authManager {
	if g_authM == nil {
		g_authM = newAuthManager()
	}
	return g_authM
}

type authManager struct {
	reqMap map[int]*proto.ReqUrl
	hasInit bool
}

func (this *authManager) Load() error {
	if this.hasInit == true {
		return nil
	}
	if err := utils.LoadJsonConfig(*authFile, requestConf); err != nil {
		log.Printf("load requestUrl config %v failed: %v \n", *authFile, err)
		return err
	}

	for _, vList := range requestConf.RequestList {
		for _, v := range vList {
			vv := strings.Split(v, ",")

			if len(vv) != 3 {
				log.Printf("requestUrl init: valid len of menu[%s] \n", v)
				continue;
			}

			id, _ := strconv.Atoi(vv[0])
			url := strings.TrimSpace(vv[1])
			desc := vv[2]

			url = "/api" + url

			_, exists := this.reqMap[id];
			if exists {
				log.Printf("requestUrl init:repeated of url: %s \n", url)
				continue
			}

			reqUrl := &proto.ReqUrl{
				Id: id,
				Url: url,
				Desc: desc,
			}
			this.reqMap[id] = reqUrl
		}
	}

	log.Printf("request url init sucess")
	return nil
}

func (this *authManager) GetAuthById(id int) (*proto.ReqUrl, error) {
	_, exists := this.reqMap[id];
	if exists {
		return this.reqMap[id], nil
	}
	return nil, errors.New(fmt.Sprintf("GetUrlById not found id: %d",id))
}