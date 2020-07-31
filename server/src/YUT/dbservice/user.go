package dbservice

import (
	"YUT/manager"
	"YUT/proto"
	"fmt"
)

const table_name = "t_user"

func GetUser(username string, password string, user_info *proto.DBUserInfo) error {
	proxy := manager.GetMysqlProxy()

	err := proxy.QueryOne(fmt.Sprintf("select username,password from t_user where username='%s' and password='%s'", username, password), user_info)
	if err != nil {
		return err
	}

	return nil
}