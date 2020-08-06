package groupService

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