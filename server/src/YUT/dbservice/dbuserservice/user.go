package dbuserservice

import (
	"YUT/manager/mysqlManager"
	"YUT/proto/dbproto"
	"errors"
	"fmt"
)

const table_name = "t_user"

func GetUser(username string, password string, user_info *dbproto.DBUserInfo) error {
	proxy := mysqlManager.GetMysqlProxy()

	err := proxy.QueryOne(fmt.Sprintf("select * from `%s` where username='%s' and password='%s'",
		table_name, username, password), user_info)
	if err != nil {
		return err
	}

	return nil
}

func GetUserByName(username string, user_info *dbproto.DBUserInfo) error {
	proxy := mysqlManager.GetMysqlProxy()

	err := proxy.QueryOne(fmt.Sprintf("select * from `%s` where username='%s'",
		table_name, username), user_info)
	return err
}

func RegisterUser(username string, password string, email string, group_id int) error {
	proxy := mysqlManager.GetMysqlProxy()

	count, err := proxy.GetCount(fmt.Sprintf("select * from `%s` where username='%s'", table_name, username))
	if err != nil {
		return errors.New(err.Error())
	}

	if count > 0 {
		return errors.New("user " + username + " has  registered")
	}

	err = proxy.Insert(fmt.Sprintf("insert into `%s` (`username`,`password`,`email`,`group_id`) values('%s','%s','%s',%d)",
		table_name, username, password, email, group_id))

	return err
}


func GetUserList(user_list *[]*dbproto.DBUserInfo) error {
	proxy := mysqlManager.GetMysqlProxy()

	err := proxy.QueryList(fmt.Sprintf("select * from `%s`",
		table_name), user_list)
	return err
}