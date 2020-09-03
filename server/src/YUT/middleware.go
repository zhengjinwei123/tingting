package main

import (
	"YUT/manager/userManager"
	"YUT/proto/netproto"
	"context"
	"github.com/go-chi/chi"
	"log"
	"net/http"
	"strconv"
)

func ApiMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		_ = r.ParseForm()

		var d string = ""
		if r.Method == "POST" {
			d = r.PostForm.Encode()
		}

		log.Printf("request ===> url:[%s] method:[%s] data:[%s]", r.URL.Path, r.Method, d)

		if r.Method != "POST" {
			resp := &netproto.NetNotLoginResponse{}
			resp.Msg = "Not Support Method:" + r.Method
			resp.ResponseError(w)
			return
		}

		if !userManager.GetUsrSessionMgr().UserHasLogin(r) {
			if r.URL.Path != "/api/user/login" &&
				r.URL.Path != "/api/user/logout" &&
				r.URL.Path != "/api/user/upload-image" {
				resp := &netproto.NetNotLoginResponse{}
				resp.Msg = "Not Allow Request, Please Login First"
				resp.ResponseError(w)
				return
			}
		} else {
			// 已经登录 权限合法性判断
			if r.URL.Path != "/api/user/logout" {
				if !userManager.GetUsrSessionMgr().CheckAuth(r) {
					resp := &netproto.NetNoAuthResponse{}
					resp.Msg = r.URL.Path +  ": No Auth, Please Contact To Admin Manager"
					resp.ResponseError(w)
					return
				}
			}
		}

		next.ServeHTTP(w, r)
	})
}

func PubBlogMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		blog_id := chi.URLParam(r, "blog_id")

		log.Println("PubBlogMiddleware:", blog_id)
		// redis 缓存获取,缓存存在,直接返回

		id, err := strconv.Atoi(blog_id)
		if err != nil {
			resp := &netproto.NetInvalidParamResponse{}
			resp.Msg = "invalid blog_id type." + err.Error()
			resp.ResponseError(w)
			return
		}
		log.Println("PubBlogMiddleware:", blog_id)

		ctx := context.WithValue(r.Context(), "id", id)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}