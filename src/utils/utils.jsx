import CONST from "proto/consts.jsx";

import userService from "service/user.jsx";

import Child from "component/alert/child.jsx"
import Dialog  from "component/alert/index.jsx"

class Utils{
    constructor() {
        if (!Utils.instance) {
            Utils.instance = this;
        }

        return Utils.instance;
    }

    static getInstance() {
        if (!this.instance) {
            return this.instance = new Utils();
        }
        return this.instance;
    }

    request(options) {
        console.log("request:", options)
        return new Promise((resolve, reject) => {

            if (options.url !== "/api/user/login") {
                if (!userService.checkUserHasLogin()) {
                    reject("error: please login first")
                    return
                }
            }

            $.ajax({
                type: options.type || "get",
                url: options.url || '',
                dataType: options.dataType || 'json',
                data: options.data || null,
                success: res => {
                    console.log("------Promise Start---")
                    console.dir(res)
                    console.log("------Promise End-----")
                    if (CONST.STATUS.STATUS_SUCCESS === res.status) {
                        typeof resolve === 'function' && resolve(res.data);
                    } else if (CONST.STATUS.STATUS_NOT_LOGIN === res.status) {
                        this.redirectLogin();
                    } else {
                        typeof reject === 'function' && reject(res.data.msg);
                    }
                },
                error: err => {
                    console.error("Promise error:", err, JSON.stringify(options))

                    typeof reject === 'function' && reject(err.statusText);

                    if (err.status === 504) {
                        console.error("504,服务器出错了!!!!")
                    }
                }
            })
        })
    }

    redirectLogin() {
        console.log("redirectLogin")
        this.clearStorage();

        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
    }

    redirect(url) {
        window.open(url, "top")
    }

    getUrlParams(name) {
        let queryString = window.location.search.split('?')[1] || '',
            reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result = queryString.match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    }

    successTips(successMsg) {

        Dialog.open({
            childrens: [Child],
            props: {
                content: successMsg,
                tips: "成功",
                open: true,
                type: "info" // info danger warning
            },
            closeDialog: function() {
                console.log("closeDialog successTips")
            },
        })
    }

    errorTips(errMsg) {
        // window.alert(errMsg || '操作失败!');

        Dialog.open({
            childrens: [Child],
            props: {
                content: errMsg,
                tips: "提示",
                open: true,
                type: "danger" // info danger warning
            },
            closeDialog: function() {
                console.log("closeDialog errorTips")
            },
        })

    }

    setStorage(name, value) {
        let dataType = typeof value;
        if (dataType === 'object') {
            window.localStorage.setItem(name, JSON.stringify(value));
        } else if (['number', 'string', 'boolean'].indexOf(dataType) >= 0) {
            window.localStorage.setItem(name, value);
        } else {
            alert("该类型不能用于本地存储");
        }
    }

    getStorage(name) {
        let data = window.localStorage.getItem(name);
        if (data) {
            let rawData = '';
            let error = null;
            try {
                rawData = JSON.parse(data);
            } catch (e) {
                error = e;
            }
            if (error) {
                return data;
            }
            return rawData;
        }
        return '';
    }

    clearStorage() {
        window.localStorage.clear();
    }

    removeStorage(name) {
        window.localStorage.removeItem(name);
    }

    validEmail(email) {
        return /^\w+([\.\-]\w+)*\@\w+([\.\-]\w+)*\.\w+$/.test(email);
    }

    validUserName(username) {
        let len = username.length
        return len >= 3;
    }

    validPassword(password) {
        let len = password.length
        return len >= 6;
    }
}

export default (Utils.getInstance());