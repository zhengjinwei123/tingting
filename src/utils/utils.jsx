import CONST from "proto/consts.jsx";

class Utils {
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
        return new Promise((resolve, reject) => {
            $.ajax({
                type: options.type || "get",
                url: options.url || '',
                dataType: options.dataType || 'json',
                data: options.data || null,
                success: res => {
                    console.log("------Promise Start---")
                    console.dir(res)
                    console.log("------Promise End-----")
                    if (CONST.STATUS_SUCCESS === res.status) {
                        typeof resolve === 'function' && resolve(res.data);
                    } else if (CONST.STATUS_NOT_LOGIN === res.status) {
                        this.redirectLogin();
                    } else {
                        typeof reject === 'function' && reject(res.msg || res.data);
                    }
                },
                error: err => {
                    console.error("Promise error:", err, JSON.stringify(options))
                    typeof reject === 'function' && reject(err.statusText);
                }
            })
        })
    }

    redirectLogin() {
        console.log("redirectLogin")
        window.location.herf = '/login?redirect=' + encodeURIComponent(window.location.pathname);
    }

    getUrlParams(name) {
        let queryString = window.location.search.split('?')[1] || '',
            reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result = queryString.match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    }

    successTips(successMsg) {
        alert(successMsg || '操作成功!');
    }

    errorTips(errMsg) {
        alert(errMsg || '操作失败!');
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

    removeStorage(name) {
        window.localStorage.removeItem(name);
    }
}

export default Utils;