package main

import (
	"log"
	"net/http"
)

func LoggerMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		r.PostFormValue("u")

		var d string = ""
		if r.Method == "POST" {
			d = r.PostForm.Encode()
		} else if r.Method == "GET" {
			d = r.Form.Encode()
		}

		log.Printf("url:[%s] method:[%s] data:[%s]", r.URL, r.Method, d)

		next.ServeHTTP(w, r)
	})
}