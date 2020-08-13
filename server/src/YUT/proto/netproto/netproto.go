package netproto

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

	//log.Printf("response:data [%v] [%s] \n", resp, ret_json)

	_, err := io.WriteString(w, string(ret_json))
	if err != nil {
		log.Printf("outputJson error: %s \n", ret_json)
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
// NotLogin
type NetNotLoginResponse struct {
	NetResponse
}

func (this *NetNotLoginResponse) ResponseError() {
	outputJson(*this, NET_STATUS_NOT_LOGIN, this.writer)

}

func (this *NetNotLoginResponse) ResponseSuccess() {
	outputJson(*this, 0, this.writer)
}

// NoAuth
type NetNoAuthResponse struct {
	NetResponse
}
func (this *NetNoAuthResponse) ResponseError() {
	outputJson(*this, NET_STATUS_NO_AUTH, this.writer)

}

func (this *NetNoAuthResponse) ResponseSuccess() {
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
	outputJson(*this, NET_STATUS_UNKNOWN, this.writer)

}

func (this *NetUserLoginResponse) ResponseSuccess() {
	outputJson(*this, 0, this.writer)
}


// register
type NetUserRegisterRequest struct {
	UserName string `http:"username"`
	Email string `http:"email"`
	Password string `http:"password"`
	GroupId int `http:"group_id"`
}

type NetUserRegisterResponse struct {
	NetResponse
}

func (this *NetUserRegisterResponse) ResponseError() {
	outputJson(*this, NET_STATUS_UNKNOWN, this.writer)

}

func (this *NetUserRegisterResponse) ResponseSuccess() {
	outputJson(*this, 0, this.writer)
}

// get menu
type Menu struct {
	Id int `json:"id"`
	Desc string `json:"desc"`
	Icon string `json:"icon"`
	ParentId int `json:"parent_id"`
	Link string `json:"link"`
	Sort int `json:"sort"`
}

type NetMenuListResponse struct {
	NetResponse

	MenuList []*Menu `json:"menulist"`
}

func (this *NetMenuListResponse) ResponseError() {
	outputJson(*this, NET_STATUS_UNKNOWN, this.writer)
}

func (this *NetMenuListResponse) ResponseSuccess() {
	outputJson(*this, 0, this.writer)
}

// get group list
type Group struct {
	Id int `json:"id"`
	Desc string `json:"desc"`
}

type NetGroupResponse struct {
	NetResponse

	GroupList []*Group `json:"grouplist"`
}

func (this *NetGroupResponse) ResponseError() {
	outputJson(*this, NET_STATUS_UNKNOWN, this.writer)
}

func (this *NetGroupResponse) ResponseSuccess() {
	outputJson(*this, 0, this.writer)
}

// get auth list
type Auth struct {
	Id int `json:"id"`
	Desc string `json:"desc"`
	Url string `json:"url"`
}
type NetAuthListResponse struct {
	NetResponse

	AuthList []*Auth `json:"authlist"`
	MenuList []*Auth `json:"menulist"`
}

func (this *NetAuthListResponse) ResponseError() {
	outputJson(*this, NET_STATUS_UNKNOWN, this.writer)
}

func (this *NetAuthListResponse) ResponseSuccess() {
	outputJson(*this, 0, this.writer)
}

// get group detail list
type GroupDetail struct {
	Id int `json:"id"`
	Desc string `json:"desc"`
	Menus string `json:"menus"`
	Auths string `json:"auths"`
}

type NetGroupDetailListResponse struct {
	NetResponse

	GroupList []*GroupDetail `json:"grouplist"`
}

func (this *NetGroupDetailListResponse) ResponseError() {
	outputJson(*this, NET_STATUS_UNKNOWN, this.writer)
}

func (this *NetGroupDetailListResponse) ResponseSuccess() {
	outputJson(*this, 0, this.writer)
}