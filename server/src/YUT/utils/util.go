package utils

import (
	"crypto/md5"
	"encoding/hex"
	"encoding/xml"
	"fmt"
	"io/ioutil"
)

var (
	md5Hash = md5.New()
)

func LoadConfig(filename string, v interface{}) error {
	if contents, err := ioutil.ReadFile(filename); err != nil {
		return err
	} else {
		if err = xml.Unmarshal(contents, v); err != nil {
			return err
		}
		return nil
	}
}

func MD5(str string) string {
	md5Hash.Reset()
	md5Hash.Write([]byte(str))
	return hex.EncodeToString(md5Hash.Sum(nil))
}

func Password(password string) string {
	md5_sign := MD5(password)
	return md5_sign
}

func CheckSign(data string, secret_key string, sign string) bool {
	sign_str := fmt.Sprintf("%s#%s", data, secret_key)

	md5_sign := MD5(sign_str)

	return md5_sign == sign
}