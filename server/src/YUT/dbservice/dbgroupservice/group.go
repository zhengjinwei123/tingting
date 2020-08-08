package dbgroupservice

import (
	"YUT/manager/mysqlManager"
	"YUT/proto/dbproto"
	"fmt"
)

const table_name = "t_group"

func GetMenuList(groupId int, group_info *dbproto.DBGroupInfo) error {
	proxy := mysqlManager.GetMysqlProxy()

	err := proxy.QueryOne(fmt.Sprintf("select * from `%s` where id='%d'",
		table_name, groupId), group_info)
	if err != nil {
		return err
	}

	return nil
}

func GetGroupList(group_list *[]*dbproto.DBGroupListInfo) error {
	proxy := mysqlManager.GetMysqlProxy()

	err := proxy.QueryList(fmt.Sprintf("select id,`desc` from `%s`",
		table_name), group_list)

	if err != nil {
		return err
	}

	return nil
}

func GetAuthList(groupId int, group_info *dbproto.DBGroupInfo) error {
	return GetMenuList(groupId, group_info)
}