import React from "react"
import {BrowserRouter as Router, HashRouter as RouterHash, Switch, Route, Redirect} from "react-router-dom"

import Layout from "component/layout/index.jsx";
import Home from 'page/home/index.jsx';
import Error from "page/error/index.jsx";
import Login from "page/login/index.jsx";
import UserNew from "page/user-new/index.jsx";

import userService from "service/user.jsx";

import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import * as userinfoActions from "actions/userinfo.jsx";
import * as menuActions from "actions/menulist.jsx";



class MyRouter extends React.Component {

    render() {
        let userHasLogin = userService.checkUserHasLogin();

        return (
            <div>
                {
                    userHasLogin ? <Route { ...this.props }></Route> : <Redirect to="/login"></Redirect>
                }
            </div>
        )
    }
}

class RouterMap extends React.Component {
    render() {
        let LayoutRouter = (
            <Layout menuActions={ this.props.menuActions } menuList={ this.props.menuList }>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/user-new" component={UserNew} />
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
                        {/*<Route path="/login" component={ Login } />*/}
                        <MyRouter path="/" render={ props => LayoutRouter }/>
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

