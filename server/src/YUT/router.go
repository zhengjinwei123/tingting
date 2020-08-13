package main

import (
	"YUT/service"
	"github.com/go-chi/chi"
	"net/http"
)

func UserRouter() http.Handler {
	r := chi.NewRouter()

	r.Post("/login", service.UserLogin)
	r.Post("/logout", service.UserLogout)
	r.Post("/register", service.UserRegister)
	r.Post("/menulist", service.MenuList)

	return r
}

func GlobalRouter() http.Handler {
	r := chi.NewRouter()

	r.Post("/grouplist", service.GroupList)
	r.Post("/authlist", service.AuthList)
	r.Post("/group-detail-list", service.GroupDetailList)
	return r
}