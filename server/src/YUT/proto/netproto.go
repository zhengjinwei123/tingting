package proto

import (
	"encoding/json"
	"io"
	"log"
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

	log.Printf("response:data [%v] [%s] \n", resp, ret_json)

	_, err := io.WriteString(w, string(ret_json))
	if err != nil {
		panic(err)
	}
}

/*--------------------------------网络response 基类------------------------------------------------*/
type NetResponse struct {
	writer http.ResponseWriter

	Msg string `json:"msg"`
}

func (this *NetResponse) SetResponseWriter(w http.ResponseWriter) {
	this.writer = w
}

/*--------------------------------网络response 子类------------------------------------------------*/
// common
type NetNotLoginResponse struct {
	NetResponse
}

func (this *NetNotLoginResponse) ResponseError() {
	outputJson(*this, 101, this.writer)

}

func (this *NetNotLoginResponse) ResponseSuccess() {
	outputJson(*this, 0, this.writer)
}

// login
type NetUserLoginRequest struct {
	UserName string `http:"username"`
	Password string `http:"password"`
}

type NetUserLoginResponse struct {
	NetResponse

	UserName string `json:"username"`
}

func (this *NetUserLoginResponse) ResponseError() {
	outputJson(*this, -1, this.writer)

}

func (this *NetUserLoginResponse) ResponseSuccess() {
	outputJson(*this, 0, this.writer)
}


// register
type NetUserRegisterRequest struct {
	UserName string `http:"username"`
	Email string `http:"email"`
	Password string `http:"password"`
}

type NetUserRegisterResponse struct {
	NetResponse

}

func (this *NetUserRegisterResponse) ResponseError() {
	outputJson(*this, -1, this.writer)

}

func (this *NetUserRegisterResponse) ResponseSuccess() {
	outputJson(*this, 0, this.writer)
}