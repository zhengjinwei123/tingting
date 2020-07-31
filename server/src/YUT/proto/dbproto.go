package proto

type DBUserInfo struct {
	UserName string `db:"username"`
	Password string `db:"password"`
}
