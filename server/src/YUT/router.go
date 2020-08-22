package main

import (
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