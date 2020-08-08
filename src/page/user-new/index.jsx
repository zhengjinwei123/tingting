import React from "react"
import {Link, withRouter} from "react-router-dom";

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
            group: '',
            groupList: []
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
            email: this.state.email
        }).then(res => {
            utils.successTips("注册成功")
        }, (err) => {
            utils.errorTips(err)
        });
    }

    componentWillMount() {
        globalService.groupList().then(res => {
            console.log("user new get group", res)

            this.setState({
                groupList: res.grouplist
            })
        },(err) => {
            console.log(err)
        })
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="新建用户"/>
                <div className="container">
                    <div className="panel panel-default register-pannel">
                        <div className="panel-heading">用户注册</div>
                        <div className="panel-body">
                            <form className="form-vertical">
                                <div className="form-group">
                                    <label htmlFor="username">用户名:</label>
                                    <input type="input"
                                           className="form-control"
                                           name="username"
                                           placeholder="输入用户名"
                                           onChange={ e => this.onInputChange(e) } />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">电子邮箱:</label>
                                    <input type="email"
                                           className="form-control"
                                           name="email"
                                           placeholder="输入电子邮箱"
                                           onChange={ e => this.onInputChange(e) }/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">密  码:</label>
                                    <input type="password"
                                           className="form-control"
                                           name="password"
                                           placeholder="输入密码"
                                           onChange={ e => this.onInputChange(e) } />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">用户组:</label>
                                    <select className="form-control" name="group" onChange={ e => this.onInputChange(e) }>

                                        {
                                            this.state.groupList.map((item, idx) => {
                                                return (
                                                    <option value={item.id} key={idx}>{item.id} - { item.desc }</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>

                                <button type="submit" className="btn btn-primary btn-block" onClick={e => this.onRegister(e) }>注册</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(UserNew)
