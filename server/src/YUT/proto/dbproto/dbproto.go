package dbproto

type DBUserInfo struct {
	UserName string `db:"username"`
	Password string `db:"password"`
	Email string `db:"email"`
	GroupId int `db:"group_id"`
}

type DBGroupInfo struct {
	GroupId int `db:"id"`
	MenuStr string `db:"menus"`
}