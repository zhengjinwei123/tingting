package userservice

import (
	"YUT/manager"
	"YUT/proto"
	"fmt"
)

const table_name = "t_user"

func GetUser(username string, password string, user_info *proto.DBUserInfo) error {
	proxy := manager.GetMysqlProxy()

	err := proxy.QueryOne(fmt.Sprintf("select username,password from `%s` where username='%s' and password='%s'",
		table_name, username, password), user_info)
	if err != nil {
		return err
	}

	return nil
}

func RegisterUser(username string, password string, email string) error {
	proxy := manager.GetMysqlProxy()

	err := proxy.Insert(fmt.Sprintf("insert into `%s` (`username`,`password`,`email`) values('%s','%s','%s')",
		table_name, username, password, email))

	return err
}