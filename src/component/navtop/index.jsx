import React from "react";
import {Link, Redirect, withRouter} from "react-router-dom";

import userService from "service/user.jsx";
import utils from "utils/utils.jsx";

import "./index.scss"

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

            this.props.menuActions.menuInit({})
        }, err => {
            console.error(err)
            utils.errorTips(err)
        })
    }

    onOutBtnClick(e) {
        e.preventDefault();

        let linkAddr = e.target.value;
        console.log(linkAddr)

        utils.redirect(linkAddr)
    }

    render() {

        let outLinkAddr = [
            {
                link: "https://github.com/zhengjinwei123",
                desc: "游戏首页",
                color: "btn-info"
            },
            {
                link: "https://github.com/zhengjinwei123",
                desc: "博客首页",
                color: "btn-success"
            },
            {
                link: "https://github.com/zhengjinwei123",
                desc: "Github",
                color: "btn-warning"
            },
            {
                link: "https://blog.csdn.net/dai_jing",
                desc: "CSDN",
                color: "btn-info"
            }
        ]

        return (
            <div className="navbar navbar-default top-navbar">
                <div className="navbar-header">
                    <div className="nav-center">

                        {
                            outLinkAddr.map((item, idx) => {
                                let btnColor = "btn " + item.color;
                                return  (
                                    <button key={idx} type="button" className={ btnColor } value={item.link} onClick={ e => this.onOutBtnClick(e) }>{item.desc}</button>
                                )
                            })
                        }
                    </div>
                </div>


                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" href="javascript:;">
                            <i className="fa fa-user fa-fw fa-2x text-yellow"></i>
                            {
                                <span>欢迎 <span className="text-red">{ this.state.username }</span></span>
                            }
                            <i className="fa fa-caret-down" style={{color: "green"}}></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li>
                                <a onClick={() => {this.onLogout()}}>
                                    <i className="fa fa-sign-out fa-fw text-yellow"></i>
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