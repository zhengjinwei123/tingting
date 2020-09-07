package configManager

import (
	"YUT/utils"
	"errors"
	"flag"
	"fmt"
	l4g "github.com/alecthomas/log4go"
)

type xmlMysql struct {
	Host string `xml:"host"`
	Port int `xml:"port"`
	Database string `xml:"database"`
	UserName string `xml:"username"`
	Password string `xml:"password"`
}

type ServerConfig struct {
	Http string `xml:"http"`
	SecretKey string `xml:"secret_key"`
	Mysql xmlMysql `xml:"mysql"`
}

func (this *ServerConfig) GetMysqlAddr() string {
	return fmt.Sprintf("%s:%s@tcp(%s:%d)/%s", this.Mysql.UserName,
		this.Mysql.Password, this.Mysql.Host, this.Mysql.Port, this.Mysql.Database)
}

func NewServerConfig() *ServerConfig {
	tmp := &ServerConfig{}
	return tmp
}

// export

var svrConf = NewServerConfig()
var configFile = flag.String("config", "./settings/config.xml", "")
func GetServerConfig() (*ServerConfig, error) {
	if err := utils.LoadXmlConfig(*configFile, svrConf); err != nil {
		return nil, errors.New(fmt.Sprintf("load server config %v failed: %v \n", *configFile, err))
	}
	return svrConf, nil
}

var logXml = flag.String("l4g", "./settings/log.xml", "")
func InitL4g() {
	l4g.LoadConfiguration(*logXml)
	l4g.Debug("l4g start...")
}
func CloseL4g() {
	l4g.Close()
}