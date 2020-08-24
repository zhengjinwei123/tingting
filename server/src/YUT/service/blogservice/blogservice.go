package blogservice

import (
	"YUT/dbservice/dbblogcategoryservice"
	"YUT/dbservice/dbblogservice"
	"YUT/manager/userManager"
	"YUT/proto/dbproto"
	"YUT/proto/netproto"
	"YUT/utils/orm"
	"log"
	"net/http"
)

func AddBlog(w http.ResponseWriter, r *http.Request) {
	_ = r.ParseForm()

	request := &netproto.NetBlogAddRequest{}
	err := orm.UnmarshalHttpValues(request, r.PostForm)
	if err != nil {
		log.Printf("UnmarshalHttpValues error: [%v] %v \n",r.PostForm, err)
		return
	}

	response := &netproto.NetResponse{}
	response.SetResponseWriter(w)

	username := userManager.GetUsrSessionMgr().GetUserName(r)
	err = dbblogservice.AddBlog(username, request.CategoryId, request.Content, request.BlogName, request.BlogType)

	if err != nil {
		response.Msg = err.Error()
		response.ResponseError()
		return;
	}

	response.ResponseSuccess()
}

func GetUserCategories(w http.ResponseWriter, r *http.Request) {
	_ = r.ParseForm()

	response := &netproto.NetGetUserBlogCategoryListResponse{}
	response.SetResponseWriter(w)
	username := userManager.GetUsrSessionMgr().GetUserName(r)

	var categories []*dbproto.DBBlogCategoryInfo
	err := dbblogcategoryservice.GetCategoryList(username, &categories)
	if err != nil {
		response.Msg = err.Error()
		response.ResponseError()
		return;
	}

	for _, v := range categories {
		data := netproto.NetBlogCategoryDetail{
			CategoryId: v.CategoryId,
			Category: v.Category,
		}

		response.CategoryList = append(response.CategoryList, &data)
	}

	response.ResponseSuccess()
}

func UpdateBlog(w http.ResponseWriter, r *http.Request) {
	_ = r.ParseForm()


}

func DeleteBlog(w http.ResponseWriter, r *http.Request) {
	_ = r.ParseForm()


}

func AddCategory(w http.ResponseWriter, r *http.Request) {
	_ = r.ParseForm()

	request := &netproto.NetBlogCategoryAddRequest{}

	err := orm.UnmarshalHttpValues(request, r.PostForm)
	if err != nil {
		log.Printf("UnmarshalHttpValues error: [%v] %v \n",r.PostForm, err)
		return
	}

	response := &netproto.NetResponse{}
	response.SetResponseWriter(w)

	username := userManager.GetUsrSessionMgr().GetUserName(r)
	err = dbblogcategoryservice.AddCategory(username, request.Category)
	if err != nil {
		response.Msg = err.Error()
		response.ResponseError()
		return;
	}

	response.ResponseSuccess()
}

func GetBlogList(w http.ResponseWriter, r *http.Request) {
	_ = r.ParseForm()

	response := &netproto.NetGetUserBlogListResponse{}
	response.SetResponseWriter(w)

	username := userManager.GetUsrSessionMgr().GetUserName(r)

	var dbBlogList []*dbproto.DBBlogAllInfo
	err := dbblogservice.GetUserBlogList(username, &dbBlogList)
	if err != nil {
		response.Msg = err.Error()
		response.ResponseError()
		return;
	}

	for _, v := range dbBlogList {
		detail := netproto.NetBlogAllDetail{
			Id: v.Id,
			Status: v.Status,
			BlogType: v.BlogType,
			UserName: v.UserName,
			BlogName: v.BlogName,
			BlogUrl: v.BlogUrl,
			CategoryId: v.CategoryId,
			Content: v.Content,
			CreateTm: v.CreateTm,
			UpdateTm: v.UpdateTm,
			PublishTm: v.PublishTm,
		}

		response.UserBlogList = append(response.UserBlogList, &detail)
	}

	response.ResponseSuccess()
}

func PublishBlog(w http.ResponseWriter, r *http.Request) {
	_ = r.ParseForm()


}