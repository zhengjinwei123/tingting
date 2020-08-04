import React from "react";
import { Link, withRouter } from "react-router-dom";

import userService from "service/user.jsx";
import utils from "utils/utils.jsx";

class NavTop extends React.Component {
    constructor(props) {
        super(props);

        let userInfo = userService.getUserInfo();

        this.state = {
            username : userInfo.username,
        }
    }

    onLogout() {
        userService.logout().then((data) => {
            userService.setUserLogout()
            this.props.history.push("/login");
        }, err => {
            console.error(err)
            utils.errorTips(err)
        })
    }

    render() {

        return (
            <div className="navbar navbar-default top-navbar">
                <div className="navbar-header">
                    <Link to="/" className="">榆过天晴</Link>
                </div>

                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" href="javascript:;">
                            <i className="fa fa-user fa-fw"></i>
                            {
                                <span>欢迎 { this.state.username }</span>
                            }
                            <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li>
                                <a onClick={() => {this.onLogout()}}>
                                    <i className="fa fa-sign-out fa-fw"></i>
                                    <span>退出登录</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
}

export default withRouter(NavTop);