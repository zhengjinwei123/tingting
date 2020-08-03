import React from "react";
import { withRouter } from "react-router-dom";

import NavTop from "component/navtop/index.jsx";
import NavSide from "component/navside/index.jsx";
import $ from "jquery";
import "./theme.css"
import "./index.scss"
import "./sidebar-menu.css"
import userService from "service/user.jsx";



class Layout extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate() {
        if (!userService.checkUserHasLogin()) {
            console.log("checkUserHasLogin false")
            this.props.history.push("/")
            return false;
        }
        console.log("checkUserHasLogin true")
        return true;
    }

    render() {
        return (
            <div id="wrapper">
                <NavTop />
                <NavSide />
                { this.props.children }
            </div>
        )
    }
}

export default withRouter(Layout);