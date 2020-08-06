package menuManager

import (
	"YUT/proto"
	"YUT/utils"
	"flag"
	"log"
	"strconv"
	"strings"
)
var menuFile = flag.String("menuconfig", "./settings/menu.json", "")
var menuConf = newMenuJsonConfig()

type sMenuJsonConfig struct {
	MenuList [][]string `json:"menulist"`
}

func newMenuJsonConfig() *sMenuJsonConfig {
	config := &sMenuJsonConfig{}
	return config
}

var menuMap = make(map[int]*proto.Menu, 0)
func init() {
	if err := utils.LoadJsonConfig(*menuFile, menuConf); err != nil {
		log.Printf("load menu config %v failed: %v \n", *menuFile, err)
	}

	sortIndex := 1
	for _, vList := range menuConf.MenuList {

		parentMenuId := 0
		for index, v := range vList {
			vv := strings.Split(v, ",")

			if len(vv) != 4 {
				log.Printf("menu init: valid len of menu[%s] \n", v)
				continue;
			}

			id, _ := strconv.Atoi(vv[0])
			desc := vv[1]
			icon := vv[2]
			url := vv[3]

			tmenu := &proto.Menu{
				Id: id,
				Desc: desc,
				Icon: icon,
				Sort: sortIndex,
				Link: url,
			}
			if index == 0 {
				parentMenuId = id
				tmenu.ParentId = 0
			} else {
				tmenu.ParentId = parentMenuId
			}

			menuMap[tmenu.Id] = tmenu

			sortIndex += 1
		}
	}

	log.Printf("menu init sucess")
}

// export
func GetAllMenuMap() map[int]*proto.Menu {
	return menuMap
}
