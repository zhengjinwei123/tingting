package manager

import (
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

type sMenu struct {
	Id int
	Desc string
	Icon string
}

type sMenuList struct {
	Menus map[int][]sMenu
}

func newMenuList() (*sMenuList) {
	menuList := &sMenuList{
		Menus: make(map[int][]sMenu, 0),
	}
	return menuList
}

var menuList = newMenuList()
func init() {
	if err := utils.LoadJsonConfig(*menuFile, menuConf); err != nil {
		log.Printf("load menu config %v failed: %v \n", *menuFile, err)
	}

	for _, vList := range menuConf.MenuList {

		parentMenuId := 0
		for index, v := range vList {
			vv := strings.Split(v, ",")

			if len(vv) != 3 {
				log.Printf("menu init: valid len of menu[%s] \n", v)
				continue;
			}

			id, _ := strconv.Atoi(vv[0])
			desc := vv[1]
			icon := vv[2]

			tmenu := &sMenu{
				Id: id,
				Desc: desc,
				Icon: icon,
			}
			if index == 0 {
				parentMenuId = id
				menuList.Menus[parentMenuId]  = make([]sMenu, 0)
			}

			menuList.Menus[parentMenuId] = append(menuList.Menus[parentMenuId], *tmenu)
		}
	}

	log.Printf("menu init sucess")
}