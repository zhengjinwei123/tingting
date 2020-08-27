package dbblogservice

import (
	"YUT/manager/mysqlManager"
	"YUT/proto/dbproto"
	"errors"
	"fmt"
	"time"
)

const table_name = "t_blog"

func AddBlog(username string, category_id int, content string, blog_name string, blog_type int) error {
	proxy := mysqlManager.GetMysqlProxy()

	err := proxy.Insert(fmt.Sprintf("insert into `%s` (`username`,`category_id`, `name`,`content`,`create_tm`,`type`) values('%s', '%d', '%s','%s',%d,%d)",
		table_name, username, category_id, blog_name, content, time.Now().Unix(), blog_type))

	return err
}

func UpdateBlog(blog_id int, content string, blog_name string, category_id int) error {
	proxy := mysqlManager.GetMysqlProxy()
	err, n := proxy.Update(fmt.Sprintf("update `%s` set `name`='%s', `content`='%s', `category_id`=%d where `id`=%d",
		table_name, blog_name, content, category_id, blog_id))
	if err != nil {
		return err
	}

	if n <= 0 {
		return errors.New("update failed: data not changed")
	}
	return nil
}

func GetBlog(blog_id int, blogInfo *dbproto.DBBlogAllInfo) error {
	proxy := mysqlManager.GetMysqlProxy()

	err := proxy.QueryOne(fmt.Sprintf("select * from `%s` where id=%d",
		table_name, blog_id), blogInfo)

	return err
}

func GetUserBlogList(username string, blogList *[]*dbproto.DBBlogAllInfo) error {
	proxy := mysqlManager.GetMysqlProxy()

	err := proxy.QueryList(fmt.Sprintf("select * from `%s`",
		table_name), blogList)
	return err
}

func PublishBlog(blog_id int, url string, status int) error {
	proxy := mysqlManager.GetMysqlProxy()
	err, n := proxy.Update(fmt.Sprintf("update `%s` set `status`=%d, `publish_tm`=%d, `url`='%s' where `id`=%d",
		table_name, status, time.Now().Unix(), url, blog_id))
	if err != nil {
		return err
	}

	if n <= 0 {
		return errors.New("update failed: data not changed")
	}
	return nil
}