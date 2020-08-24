import utils from "utils/utils.jsx";

class GlobalService {
    constructor() {
        if (!GlobalService.instance) {
            GlobalService.instance = this;
        }
        return GlobalService.instance
    }

    static getInstance() {
        if (!this.instance) {
            return this.instance = new GlobalService();
        }
        return this.instance
    }

    groupList() {
        return utils.request({
            url: '/api/global/grouplist',
            data: {}
        });
    }

    authList() {
        return utils.request({
            type: "post",
            url: "/api/global/authlist",
            data: {}
        });
    }

    groupDetailList() {
        return utils.request({
            url: '/api/global/group-detail-list',
            data: {}
        });
    }

    addGroup(group_name, menus_str, auths_str) {
        return utils.request({
            url: "/api/global/addgroup",
            data: {
                group: group_name,
                menus: menus_str,
                auths: auths_str
            }
        });
    }

    updateGroupAuth(id, menus_str, auths_str) {
        return utils.request({
            url: "/api/global/update-group-auth",
            data: {
                id: id,
                menus: menus_str,
                auths: auths_str
            }
        });
    }

    deleteGroup(id) {
        return utils.request({
            url: "/api/global/group-delete",
            data: {
                id: id
            }
        });
    }
}

export default GlobalService.getInstance()