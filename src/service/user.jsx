import utils from "utils/utils.jsx";
import $ from "jquery"

class UserService {
    constructor() {
        if (!UserService.instance) {
            UserService.instance = this;
        }
        return UserService.instance
    }

    static getInstance() {
        if (!this.instance) {
            return this.instance = new UserService();
        }
        return this.instance
    }

    login(login_info) {
        return utils.request({
            type: 'post',
            url: '/api/user/login',
            data: login_info
        });
    }

    register(register_info) {
        return utils.request({
            type: 'post',
            url : '/api/user/register',
            data: register_info
        });
    }

    setUserLogin(userInfo) {
        utils.setStorage('user_info', userInfo);
    }

    setUserLogout() {
        utils.removeStorage('user_info')
    }

    checkUserHasLogin() {
        let userInfo = utils.getStorage('user_info')
        if (userInfo != null && $.isPlainObject(userInfo)) {
            return true;
        }
        return false;
    }

    getUserInfo() {
        let userInfo = utils.getStorage('user_info')
        if (userInfo != null && $.isPlainObject(userInfo)) {
            return userInfo;
        }
        return null;
    }

    checkLoginInfo(login_info) {
        let username = $.trim(login_info.username),
            password = $.trim(login_info.password);

        if (typeof username !== "string" || username.length === 0) {
            return {
                status: false,
                msg: '用户名不能为空!'
            }
        }
        if (typeof password !== "string" || password.length === 0) {
            return {
                status: false,
                msg: '密码不能为空!'
            }
        }
        return {
            status : true,
            msg : '验证通过'
        }
    }

    logout() {
        return utils.request({
            type: 'post',
            url: '/api/user/logout'
        });
    }

    getUserList() {
        return utils.request({
            type: 'post',
            url: '/api/user/list',
            data: {}
        })
    }

    updateUser(username, email, group_id) {
        return utils.request({
            type: 'post',
            url: '/api/user/update',
            data: {
                username: username,
                email: email,
                group_id: group_id
            }
        })
    }

    deleteUser(username) {
        return utils.request({
            type: 'post',
            url: '/api/user/delete',
            data: {
                username: username,
            }
        })
    }

    updatePassword(username, password) {
        return utils.request({
            type: 'post',
            url: '/api/user/update-password',
            data: {
                username: username,
                password: password
            }
        })
    }

    getMenus() {
        return utils.request({
            type: 'post',
            url: '/api/user/menulist'
        });
    }
}

export default UserService.getInstance()