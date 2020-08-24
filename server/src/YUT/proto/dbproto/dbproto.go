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
	Desc string `db:"desc"`
	AuthStr string `db:"auths"`
}

type DBGroupListInfo struct {
	GroupId int `db:"id"`
	Desc string `db:"desc"`
}

type DBBlogCategoryInfo struct {
	CategoryId int `db:"category_id"`
	Category string `db:"desc"`
}

type DBBlogAllInfo struct {
	Id int `db:"id"`
	Status int `db:"status"`
	BlogType int `db:"type"`
	UserName string `db:"username"`
	BlogName string `db:"name"`
	BlogUrl string `db:"url"`
	CategoryId int `db:"category_id"`
	Content string `db:"content"`
	CreateTm int `db:"create_tm"`
	PublishTm int `db:"publish_tm"`
	UpdateTm string `db:"update_tm"`
}