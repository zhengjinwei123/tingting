package service

import (
	"encoding/json"
	"io"
	"net/http"
)

type SResponse struct {
	Data interface{} `json:"data"`
	Status int `json:"status"`
}

func outputJson(data interface{}, status int, w http.ResponseWriter) {
	resp := &SResponse{
		Data: data,
		Status: status,
	}
	ret_json, _ := json.Marshal(resp)
	_, err := io.WriteString(w, string(ret_json))
	if err != nil {
		panic(err)
	}
}

func ResponseSuccess(data interface{}, w http.ResponseWriter) {
	outputJson(data, 0, w)
}

func ResponseError(error string, w http.ResponseWriter) {
	outputJson(error, 101, w)
}