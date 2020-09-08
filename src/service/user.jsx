import utils from "utils/utils.jsx";
import $ from "jquery"

import CONSTS from "proto/consts.jsx"

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
            url: '/api/user/login',
            data: login_info
        });
    }

    register(register_info) {
        return utils.request({
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
            url: '/api/user/logout'
        });
    }

    getUserList() {
        return utils.request({
            url: '/api/user/list',
            data: {}
        })
    }

    updateUser(username, email, group_id) {
        return utils.request({
            url: '/api/user/update',
            data: {
                username: username,
                email: email,
                group_id: group_id
            }
        })
    }

    updateProfile(username, nickname, sex, userdesc, wx_image, zf_image) {
        return utils.request({
            url: '/api/user/update-profile',
            data: {
                username: username,
                nickname: nickname,
                userdesc: userdesc,
                sex: sex,
                wx_image: wx_image,
                zf_image: zf_image
            }
        })
    }

    deleteRes(id) {
        return utils.request({
            url: '/api/user/res-delete',
            data: {
                id,
            }
        })
    }


    uploadResImage(res_name, res_desc) {
        return this.uploadRes(CONSTS.RES_TYPES.IMAGE, res_name, res_desc)
    }
    uploadMusic(res_name, res_desc) {
        return this.uploadRes(CONSTS.RES_TYPES.MUSIC, res_name, res_desc)
    }
    uploadVideo(res_name, res_desc) {
        return this.uploadRes(CONSTS.RES_TYPES.VIDEO, res_name, res_desc)
    }
    // res_type = img1/music2/video3
    uploadRes(res_type, res_name, res_desc) {
        return utils.request({
            url: '/api/user/upload-res',
            data: {
                res_type: res_type,
                res_name: res_name,
                res_desc: res_desc
            }
        })
    }

    getImageList(cur_page) {
        return this.getResListPageNate(CONSTS.RES_TYPES.IMAGE, cur_page)
    }

    getResListPageNate(res_type, cur_page) {
        return utils.request({
            url: '/api/user/reslist-pagenate',
            data: {
                res_type: res_type,
                cur_page: cur_page
            }
        })
    }

    getProfile(username, show_loading) {
        return utils.request({
            url: '/pub/user/profile',
            data: {
                username: username,
            }
        }, show_loading)
    }

    deleteUser(username) {
        return utils.request({
            url: '/api/user/delete',
            data: {
                username: username,
            }
        })
    }

    updatePassword(username, password) {
        return utils.request({
            url: '/api/user/update-password',
            data: {
                username: username,
                password: password
            }
        })
    }

    getMenus() {
        return utils.request({
            url: '/api/user/menulist'
        });
    }

    delImage(image_name) {
        return utils.request({
            url: '/api/user/del-image',
            data: {
                image_name: image_name,
            }
        });
    }
}

export default UserService.getInstance()