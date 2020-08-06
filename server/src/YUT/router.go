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
