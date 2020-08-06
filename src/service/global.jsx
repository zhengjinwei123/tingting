import utils from "utils/utils.jsx";

class Global {
    constructor() {
        if (!Global.instance) {
            Global.instance = this;
        }
        return Global.instance
    }

    static getInstance() {
        if (!this.instance) {
            return this.instance = new Global();
        }
        return this.instance
    }

    groupList() {
        return utils.request({
            type: 'post',
            url: '/api/global/grouplist',
            data: {}
        });
    }
}

export default Global.getInstance()