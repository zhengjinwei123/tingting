import React from "react"
import {Link, withRouter} from "react-router-dom";

import "./index.scss"
import PageTitle from "component/pagetitle/index.jsx";

class UserAuthManage extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
       return (
           <div id="page-wrapper">
               <PageTitle title="用户权限管理"/>
           </div>
       )
    }
}
export default withRouter(UserAuthManage)
