import React from "react"
import {BrowserRouter as Router, HashRouter as RouterHash, Switch, Route, Redirect} from "react-router-dom"

import Layout from "component/layout/index.jsx";
import Home from 'page/home/index.jsx';
import Error from "page/error/index.jsx";
import Login from "page/login/index.jsx";
import UserNew from "page/user-new/index.jsx";
import UserAuthManage from "page/user-auth-manage/index.jsx";
import UserQuery from "page/user-query/index.jsx";
import BlogNew from "page/blog/new-blog/index.jsx"

import userService from "service/user.jsx";

import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import * as userinfoActions from "actions/userinfo.jsx";
import * as menuActions from "actions/menulist.jsx";


class MyRouter extends React.Component {

    checkAuth(pathName) {
        if (pathName === "/" || pathName === "/login") {
            return true;
        }

        for (let k in this.props.menuList.menuList) {

            for (let kk in this.props.menuList.menuList[k]) {
                if (this.props.menuList.menuList[k][kk].link === pathName) {
                    return true;
                }
            }
        }
        return false;
    }

    render() {
        let userHasLogin = userService.checkUserHasLogin();
        let pathName = this.props.location.pathname;

        let hasAuth = this.checkAuth(pathName)

        if (userHasLogin) {
            if (hasAuth) {
                return (
                    <div>
                        <Route { ...this.props } />
                    </div>
                )
            } else {
                return (
                    <div>
                        <Redirect to="/" />
                    </div>
                )
            }

        } else {
            return (
                <div>
                    <Redirect to="/login" />
                </div>
            )
        }
    }
}

class RouterMap extends React.Component {
    render() {
        let LayoutRouter = (
            <Layout menuActions={ this.props.menuActions } menuList={ this.props.menuList }>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/user-new" component={UserNew} />
                    <Route path="/user-auth-manage" component={UserAuthManage} />
                    <Route path="/user-query" component={UserQuery} />
                    <Route path="/blog-new" component={BlogNew} />
                    <Route component={Error}/>
                </Switch>
            </Layout>
        )

        if (process.env.WEBPACK_ENV === "dev") {
            return (
                <Router>
                    <Switch>
                        <Route path="/login" >
                            <Login />
                        </Route>
                        <MyRouter path="/" render={ props => LayoutRouter } menuList={ this.props.menuList }/>
                    </Switch>
                </Router>
            )
        } else {
            return (
                <RouterHash>
                    <Switch>
                        <Route path="/login" >
                            <Login />
                        </Route>
                        <MyRouter path="/" render={ props => LayoutRouter }/>
                    </Switch>
                </RouterHash>
            )
        }
    }
}


function mapStateToProps(state) {
    return {
        userinfo: state.userinfo,
        menuList: state.menuList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userinfoActions: bindActionCreators(userinfoActions, dispatch),
        menuActions: bindActionCreators(menuActions, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RouterMap)

