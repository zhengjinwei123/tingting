package main

import (
	"YUT/manager/userManager"
	"YUT/proto/netproto"
	"log"
	"net/http"
)

func LoggerMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_ = r.ParseForm()

		var d string = ""
		if r.Method == "POST" {
			d = r.PostForm.Encode()
		}

		log.Printf("request ===> url:[%s] method:[%s] data:[%s]", r.URL.Path, r.Method, d)

		if r.Method != "POST" {
			resp := &netproto.NetNotLoginResponse{}
			resp.SetResponseWriter(w)
			resp.Msg = "Not Support Method:" + r.Method
			resp.ResponseError()
			return
		}

		if !userManager.GetUsrSessionMgr().UserHasLogin(r) {
			if r.URL.Path != "/api/user/login" &&
				r.URL.Path != "/api/user/logout" {
				resp := &netproto.NetNotLoginResponse{}
				resp.SetResponseWriter(w)
				resp.Msg = "Not Allow Request, Please Login First"
				resp.ResponseError()
				return
			}
		} else {
			// 已经登录 权限合法性判断
			if r.URL.Path != "/api/user/logout" {
				if !userManager.GetUsrSessionMgr().CheckAuth(r) {
					resp := &netproto.NetNoAuthResponse{}
					resp.SetResponseWriter(w)
					resp.Msg = "No Auth, Please Contact To Admin Manager"
					resp.ResponseError()
					return
				}
			}
		}

		next.ServeHTTP(w, r)
	})
}