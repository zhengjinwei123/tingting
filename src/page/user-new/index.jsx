import React from "react"
import {Link, withRouter} from "react-router-dom";

import "./index.scss"
import PageTitle from "component/pagetitle/index.jsx";

class UserNew extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="新建用户"/>
                <div className="container">
                    <div className="panel panel-default">
                        <div className="panel-heading">用户注册</div>
                        <div className="panel-body">
                            <form className="form-vertical" role="form">
                                <div className="form-group">
                                    <label htmlFor="email">用户名:</label>
                                    <input type="email" className="form-control" id="email" placeholder="输入用户名" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pwd">密  码:</label>
                                    <input type="password" className="form-control" id="pwd" placeholder="输入密码" />
                                </div>

                                <button type="submit" className="btn btn-primary btn-block">注册</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(UserNew)
