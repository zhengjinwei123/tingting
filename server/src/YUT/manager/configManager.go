package manager

import (
	"fmt"
)

type xmlMysql struct {
	Host string `xml:"host"`
	Port int `xml:"port"`
	Database string `xml:"database"`
	UserName string `xml:"username"`
	Password string `xml:"password"`
}

type serverConfig struct {
	Http string `xml:"http"`
	SecretKey string `xml:"secret_key"`
	Mysql xmlMysql `xml:"mysql"`
}

func (this *serverConfig) GetMysqlAddr() string {
	return fmt.Sprintf("%s:%s@tcp(%s:%d)/%s", this.Mysql.UserName,
		this.Mysql.Password, this.Mysql.Host, this.Mysql.Port, this.Mysql.Database)
}

func NewServerConfig() *serverConfig {
	tmp := &serverConfig{}
	return tmp
}