package main

import (
	"YUT/manager"
	"YUT/proto"
	"log"
	"net/http"
)

func LoggerMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_ = r.ParseForm()

		if r.Method != "POST" {
			resp := &proto.NetNotLoginResponse{}
			resp.SetResponseWriter(w)
			resp.Msg = "Not Support Method:" + r.Method
			resp.ResponseError()
			return
		}

		if !manager.GetUsrSessionMgr().UserHasLogin(r) {
			if r.URL.Path != "/api/user/login" &&
				r.URL.Path != "/api/user/logout" {
				resp := &proto.NetNotLoginResponse{}
				resp.SetResponseWriter(w)
				resp.Msg = "Not Allow Request, Please Login First"
				resp.ResponseError()
				return
			}
		}

		var d string = ""
		if r.Method == "POST" {
			d = r.PostForm.Encode()
		}

		log.Printf("request ===> url:[%s] method:[%s] data:[%s]", r.URL.Path, r.Method, d)

		next.ServeHTTP(w, r)
	})
}