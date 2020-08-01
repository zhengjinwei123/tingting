import React from 'react';
import ReactDom from 'react-dom';

import {BrowserRouter as Router, HashRouter as RouterHash, Switch, Route, Redirect} from "react-router-dom"

import Layout from "component/layout/index.jsx";
import Home from 'page/home/index.jsx';
import Error from "page/error/index.jsx";
import Login from "page/login/index.jsx";
import UserNew from "page/user-new/index.jsx";

import md5 from "js-md5"

import UserService from "service/user.jsx";

let userService = UserService.getInstance();
React.Component.prototype.$md5 = md5


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

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let LayoutRouter = (
            <Layout>
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
                        <Route path="/login" component={ Login } />
                        <MyRouter path="/" render={ props => LayoutRouter }/>
                    </Switch>
                </Router>
            )
        } else {
            return (
                <RouterHash>
                    <Switch>
                        <Route path="/login" component={ Login } />
                        <MyRouter path="/" render={ props => LayoutRouter }/>
                    </Switch>
                </RouterHash>
            )
        }
    }
}

ReactDom.render(
    <App />,
    document.getElementById('app')
)