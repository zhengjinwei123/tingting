import React from "react";

import "./index.scss";
import utils from "utils/utils.jsx";
import userService from "service/user.jsx";
import {Redirect} from "react-router-dom";


class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            redirect: utils.getUrlParams('redirect') || '/'
        }
    }

    componentWillMount() {
        document.title = "登录 YUT"
    }

    onSubmit() {
        // 去服务器验证账号和密码
        let loginInfo = {
            username : this.state.username,
            password: this.$md5(this.state.password)
        },
            checkResult = userService.checkLoginInfo(loginInfo);

        if (checkResult.status) {
            userService.login(loginInfo).then(res => {
                userService.setUserLogin(res);
                this.props.history.push(this.state.redirect);
            }, (err) => {
                utils.errorTips(err)
            });
        } else {
            utils.errorTips(checkResult.msg)
        }
    }

    onInputKeyUp(e) {
        if(e.keyCode === 13){
            this.onSubmit();
        }
    }

    onInputChange(e){
        let inputValue  = e.target.value,
            inputName   = e.target.name;
        this.setState({
            [inputName] : inputValue
        });
    }

    render() {
      return (

          <div>
              {
                  userService.checkUserHasLogin() ? <Redirect to="/"></Redirect> :
                      <div className="col-md-4 col-md-offset-4 login-wrapper">
                          <div className="panel panel-default login-panel">
                              <div className="panel-heading">欢迎登录 -YUT 管理后台</div>
                              <div className="panel-body">
                                  <div>
                                      <div className="form-group">
                                          <input type="text"
                                                 name="username"
                                                 className="form-control"
                                                 placeholder="请输入用户名"
                                                 onKeyUp={e => this.onInputKeyUp(e)}
                                                 onChange={e => this.onInputChange(e)}/>
                                      </div>
                                      <div className="form-group">
                                          <input type="password"
                                                 name="password"
                                                 className="form-control"
                                                 placeholder="请输入密码"
                                                 onKeyUp={e => this.onInputKeyUp(e)}
                                                 onChange={e => this.onInputChange(e)}/>
                                      </div>
                                      <button className="btn btn-lg btn-success btn-block"
                                              onClick={e => {this.onSubmit(e)}}>登录</button>
                                  </div>
                              </div>
                          </div>
                      </div>
              }
          </div>
      )
    }
}

export default Login;