import React from "react"
import {Link, withRouter} from "react-router-dom";
import { Tab,Input,Icon, Image} from 'semantic-ui-react'

import {ProgressFileUploader, FileUploader} from "component/fileuploader/index.jsx";


import "./index.scss"
import PageTitle from "component/pagetitle/index.jsx";
import $ from "jquery"
import userService from "service/user.jsx";
import globalService from "service/global.jsx";
import utils from "utils/utils.jsx"

class UserNew extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            email: '',
            group_id: '',
            groupList: [],

            activeIndex: 0,

            nickname: "",
            sex: "",
            userdesc: "",
            wx_img: "",
            zf_img: "",
        }
    }

    onInputChange(e) {
        let inputValue = e.target.value,
            inputName = e.target.name;

        console.log(inputName, inputValue)

        this.setState({
            [inputName] : inputValue
        })
    }

    onRegister(e) {
        e.preventDefault();

        if (!utils.validUserName(this.state.username)) {
            utils.errorTips("用户名长度必须>=3");
            return;
        }
        if (!utils.validEmail(this.state.email)) {
            utils.errorTips("无效的邮箱类型");
            return;
        }
        if (!utils.validPassword(this.state.password)) {
            utils.errorTips("密码长度必须>=6");
            return;
        }
        userService.register({
            username: this.state.username,
            password: this.$md5(this.state.password),
            email: this.state.email,
            group_id: this.state.group_id
        }).then(res => {
            utils.successTips("注册成功")
        }, (err) => {
            utils.errorTips(err)
        });
    }

    componentDidMount() {
        globalService.groupList().then(res => {
            console.log("user new get group", res)

            if (res.grouplist.length) {
                this.setState({
                    groupList: res.grouplist
                })

                this.setState({
                    group_id: res.grouplist[0].id
                })
            }

        },(err) => {
            console.log(err)
        })
    }

    handleTabChange(e, activeIndex) {
        this.setState({
            activeIndex: activeIndex
        })
    }

    onNextStep() {
        this.setState({
            activeIndex: this.state.activeIndex + 1
        })
    }

    onUploadSuccess(type, filename) {

        if (type === "wx") {
            this.setState({
                wx_img: filename
            })
        } else {

        }
        console.log("onUploadSuccess onUploadImage", type, filename)
    }
    render() {

        let panes = [
            {
                menuItem: "注册用户",
                render: () => <div className="container">
                    <div className="panel panel-default register-pannel">
                        <div className="panel-heading">用户注册</div>
                        <div className="panel-body">
                            <form className="form-vertical">
                                <div className="form-group">
                                    <label htmlFor="username">用户名:</label>
                                    <div className="input-group margin-bottom-sm">
                                        <span className="input-group-addon"><i className="fa fa-user fa-fw"></i></span>
                                        <input type="input"
                                               className="form-control"
                                               name="username"
                                               placeholder="输入用户名"
                                               onChange={ e => this.onInputChange(e) } />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">电子邮箱:</label>
                                    <div className="input-group margin-bottom-sm">
                                        <span className="input-group-addon"><i className="fa fa-envelope-o fa-fw"></i></span>
                                        <input type="email"
                                               className="form-control"
                                               name="email"
                                               placeholder="输入电子邮箱"
                                               onChange={ e => this.onInputChange(e) }/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">密  码:</label>
                                    <div className="input-group margin-bottom-sm">
                                        <span className="input-group-addon"><i className="fa fa-key fa-fw"></i></span>
                                        <input type="password"
                                               className="form-control"
                                               name="password"
                                               placeholder="输入密码"
                                               onChange={ e => this.onInputChange(e) } />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">用户组:</label>
                                    <div className="input-group margin-bottom-sm">
                                        <span className="input-group-addon"><i className="fa fa-snapchat fa-fw"></i></span>
                                        <select className="form-control" name="group_id" onChange={ e => this.onInputChange(e) }>

                                            {
                                                this.state.groupList.map((item, idx) => {
                                                    return (
                                                        <option value={item.id} key={idx}>{item.id} - { item.desc }</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-primary btn-block" onClick={(e) => this.onRegister(e) }>确认注册</button>
                            </form>
                        </div>

                    </div>
                </div>
            },
            {
                menuItem: "录入基础信息",
                render: () => <div className="container">
                    <div className="panel panel-default register-pannel">
                        <div className="panel-heading">基础信息</div>
                        <div className="panel-body">
                            <div className="form-vertical">
                                <div className="form-group">
                                    <label htmlFor="nickname">昵称:</label>
                                    <div className="input-group margin-bottom-sm">
                                        <span className="input-group-addon"><i className="fa fa-address-card"></i></span>
                                        <input type="input"
                                               className="form-control"
                                               name="nickname"
                                               placeholder="输入昵称"
                                               onChange={ e => this.onInputChange(e) } />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="userdesc">简介:</label>
                                    <div className="input-group margin-bottom-sm">
                                        <span className="input-group-addon"><i className="fa fa-file-text"></i></span>
                                        <input type="input"
                                               className="form-control"
                                               name="userdesc"
                                               placeholder="输入简介"
                                               onChange={ e => this.onInputChange(e) }/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="sex">性别:</label>
                                    <div className="input-group margin-bottom-sm">
                                        <span className="input-group-addon"><i className="fa fa-transgender"></i></span>
                                        <select className="form-control" name="sex" onChange={ e => this.onInputChange(e) }>
                                            <option value={1} >男</option>
                                            <option value={0} >女</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>微信二维码:</label>
                                    <FileUploader onUploadSuccess={(filename) => this.onUploadSuccess("wx", filename)}/>
                                </div>


                                <div className="form-group">
                                    <label>微信支付收钱码:</label>
                                    <FileUploader onUploadSuccess={(filename) => this.onUploadSuccess("zf", filename)}/>
                                </div>

                                <button type="submit" className="btn btn-primary btn-block" onClick={() => this.onNextStep() }>确认</button>
                            </div>
                        </div>

                    </div>
                </div>
            }
        ]
        return (
            <div id="page-wrapper">
                <PageTitle title="新建用户"/>

                <Tab
                    panes={panes}
                    activeIndex={this.state.activeIndex}
                    onTabChange={(e, {activeIndex}) => this.handleTabChange(e, activeIndex)}
                />


            </div>
        )
    }
}
export default withRouter(UserNew)
