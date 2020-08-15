import React from "react"
import {Link, withRouter} from "react-router-dom";
import { Button } from "semantic-ui-react";

import "./index.scss"
import PageTitle from "component/pagetitle/index.jsx";
import globalService from "service/global.jsx";
import UserAuthTable from "page/user-auth-manage/authTable.jsx";
import GroupAddModal from "page/user-auth-manage/goup-add-modal/index.jsx";


class UserAuthManage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            group_detail_list: [],

            showAdd: false,
        }

        this.showAdd = this.showAdd.bind(this)
    }

    componentDidMount() {
        globalService.groupDetailList().then(res => {
            this.setState({
                group_detail_list: res.grouplist
            })
            console.log("group_detail_list:", res.grouplist)
        }, err => {
            console.error(err)
        })
    }

    showAdd() {
        this.setState({
            showAdd: true
        })
    }

    render() {
        return (
           <div id="page-wrapper">
               <PageTitle title="用户权限管理"/>
               <div className="auth-pannel">
                   <div className="panel panel-default">
                       <div className="panel-heading">
                           <Button inverted color='violet' onClick={this.showAdd}>
                               新增用户组
                           </Button>
                       </div>
                       <div className="panel-body">
                           <UserAuthTable groupDetailList={ this.state.group_detail_list }/>
                       </div>
                   </div>
               </div>

               <div>
                   <GroupAddModal show={ this.state.showAdd }/>
               </div>
           </div>
       )
    }
}
export default withRouter(UserAuthManage)
