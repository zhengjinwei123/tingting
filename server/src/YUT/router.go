package main

import (
	"YUT/service/blogservice"
	"YUT/service/globalservice"
	"YUT/service/userservice"
	"github.com/go-chi/chi"
	"net/http"
)

func UserRouter() http.Handler {
	r := chi.NewRouter()

	r.Post("/login", userservice.UserLogin)
	r.Post("/logout", userservice.UserLogout)
	r.Post("/register", userservice.UserRegister)
	r.Post("/menulist", userservice.MenuList)
	r.Post("/list", userservice.UserList)
	r.Post("/update", userservice.Update)
	r.Post("/delete", userservice.Delete)
	r.Post("/update-password", userservice.UpdatePassword)
	r.Post("/upload-image", userservice.UploadImage)
	r.Post("/del-image", userservice.DelImage)
	r.Post("/update-profile", userservice.UpdateProfile)

	return r
}

func GlobalRouter() http.Handler {
	r := chi.NewRouter()

	r.Post("/grouplist", globalservice.GroupList)
	r.Post("/authlist", globalservice.AuthList)
	r.Post("/group-detail-list", globalservice.GroupDetailList)
	r.Post("/addgroup", globalservice.GroupAdd)
	r.Post("/update-group-auth", globalservice.GroupAuthUpdate)
	r.Post("/group-delete", globalservice.GroupDelete)
	return r
}

func BlogRouter() http.Handler {
	r := chi.NewRouter()

	r.Post("/new", blogservice.AddBlog)
	r.Post("/update", blogservice.UpdateBlog)
	r.Post("/delete", blogservice.DeleteBlog)
	r.Post("/publish", blogservice.PublishBlog)
	r.Post("/add-category", blogservice.AddCategory)
	r.Post("/user-blogs", blogservice.GetBlogList)
	r.Post("/user-categories", blogservice.GetUserCategories)
	r.Post("/user-blogs-pagenate", blogservice.GetBlogPageNateSearch)

	return r
}