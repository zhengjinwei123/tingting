import React from "react"
import {BrowserRouter as Router, HashRouter as RouterHash, Switch, Route, Redirect} from "react-router-dom"

import Layout from "component/layout/index.jsx";
import Home from 'page/home/index.jsx';
import Error from "page/error/index.jsx";
import NotFoundPage from "page/notfound/index.jsx"
import Login from "page/login/index.jsx";
import UserNew from "page/user-new/index.jsx";
import UserAuthManage from "page/user-auth-manage/index.jsx";
import UserQuery from "page/user-query/index.jsx";
import BlogNew from "page/blog/new-blog/index.jsx"
import BlogList from "page/blog/blog-list/index.jsx";
import PubBlogView from "page/pub/blog/view/index.jsx";
import PubHomePage from "page/pub/index.jsx";
import ImageUpload from "page/res/image-upload/index.jsx"

import userService from "service/user.jsx";

import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import * as userinfoActions from "actions/userinfo.jsx";
import * as menuActions from "actions/menulist.jsx";
import UserProfile from "page/user-profile/index.jsx";

import PubViewHeader from "page/pub/header/index.jsx"


class MyPublicRouter extends React.Component {

    UNSAFE_componentWillMount() {
        document.title = process.env.WEB_NAME + " 博客在线"
    }

    render() {
        return (
            <div>
                <Route { ...this.props } />
            </div>
        )
    }
}

class MyRouter extends React.Component {

    checkAuth(pathName) {
        if (pathName === "/admin" || pathName === "/admin/login") {
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
                        <Redirect to="/admin" />
                    </div>
                )
            }

        } else {
            return (
                <div>
                    <Redirect to="/admin/login" />
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
                    <Route exact path="/admin" component={Home}/>
                    <Route path="/admin/user-new" component={UserNew} />
                    <Route path="/admin/user-auth-manage" component={UserAuthManage} />
                    <Route path="/admin/user-query" component={UserQuery} />
                    <Route path="/admin/user-profile" component={UserProfile} />
                    <Route path="/admin/blog-new" component={BlogNew} />
                    <Route path="/admin/blog-manage" component={BlogList} />
                    <Route path="/admin/photo-upload" component={ImageUpload} />
                    <Route component={Error}/>
                </Switch>
            </Layout>
        )

        let PublicRouter = (
            <PubViewHeader menuActions={ this.props.menuActions}>
                <Switch>
                    <Route exact path="/" component={PubHomePage} />
                    <Route path="/pup/blog/:blog_id" component={PubBlogView} />
                    <Route component={NotFoundPage}/>
                </Switch>
            </PubViewHeader>
        )

        if (process.env.WEBPACK_ENV === "dev") {
            return (
                <Router>
                    <Switch>
                        <Route  path="/admin/login" >
                            <Login />
                        </Route>
                        <MyRouter path="/admin" render={ props => LayoutRouter } menuList={ this.props.menuList } menuActions={ this.props.menuActions}/>
                        <MyPublicRouter path="/" render={ props => PublicRouter} menuActions={ this.props.menuActions}/>
                    </Switch>
                </Router>
            )
        } else {
            return (
                <RouterHash>
                    <Switch>
                        <Route path="/admin/login" >
                            <Login />
                        </Route>
                        <MyPublicRouter path="/" render={ props => PublicRouter} menuList={ this.props.menuList }/>
                        <MyRouter path="/admin" render={ props => LayoutRouter } menuActions={ this.props.menuActions }/>
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

