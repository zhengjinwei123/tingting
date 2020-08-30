package dbpagehelper

import (
	"YUT/dbservice/dbblogservice"
	"YUT/proto/dbproto"
	"errors"
)

const PER_PAGE_NUM  = 5

type DBPageHelper struct {
	LastId int
	CurPage int

	totalCount int
	totalPage int
	hasInit bool
}

func NewPageHelper(last_id int, cur_page int) *DBPageHelper {
	return &DBPageHelper{
		LastId: last_id,
		CurPage: cur_page,
		totalPage: 0,
		totalCount: 0,
		hasInit: false,
	}
}

func (this *DBPageHelper) TotalPage() int {
	if this.hasInit {
		return this.totalPage
	}

	page_count := this.totalCount / PER_PAGE_NUM
	e_count := this.totalCount % PER_PAGE_NUM
	if e_count > 0 {
		page_count += 1
	}

	this.totalPage = page_count
	this.hasInit = true

	return page_count
}


func (this *DBPageHelper) SearchBlog(username string, blogList *[]*dbproto.DBBlogAllInfo) error {
	total_count, err := dbblogservice.PageNateTotalCount(username)
	if err != nil {
		return err
	}

	this.totalCount = total_count

	total_page := this.TotalPage()
	if total_page < this.CurPage {
		return errors.New("page not exists")
	}

	err = dbblogservice.PageNateSearchUserBlog(username, this.LastId, PER_PAGE_NUM, blogList)
	return err
}