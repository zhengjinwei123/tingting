import React from "react"
import PageTitle from "component/pagetitle/index.jsx";
import { Table,Button,Icon, Input, Dropdown } from 'semantic-ui-react'

import UserPasswordDialog from "page/user-password/index.jsx"
import userService from "service/user.jsx"
import utils from "utils/utils.jsx"
import globalService from "service/global.jsx";

import "./index.scss"


class UserQuery extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user_list :[],
            group_list : [],

            show_update_password: false,
            update_username: ""
        }

        this.checkChanged = this.checkChanged.bind(this)
    }

    isAdminUser(user) {
        return user.username === "admin" && user.group_id === 1;
    }

    loadUserList() {
        userService.getUserList().then(res => {

            let userList = [];
            res.userlist.map((item, idx) => {
                item.email_input = false;
                item.group_input = false;
                item.focus = false;
                item.idx = idx;
                item.last_email = item.email;
                item.last_group = item.group_id;

                userList[idx] = item;
            })


            this.setState({
                user_list: userList
            })
        }, err => {
            utils.errorTips(err)
        })
    }

    loadGroupList() {
        globalService.groupList().then(res => {
            if (res.grouplist.length) {
                this.setState({
                    group_list: res.grouplist
                })
            }

        },(err) => {
            console.log(err)
        })
    }

    componentDidMount() {

        this.loadUserList();
        this.loadGroupList();
    }


    onDbClick(user, type) {

        if (this.isAdminUser(user)) {
            return;
        }

        let user_list = this.state.user_list;
        let edit_field = (type === "e") ? "email_input" : "group_input"

        if (!user[edit_field]) {
            user[edit_field] = true;
            user_list[user.idx] = user;
        }

        this.setState({
            user_list: user_list
        })
    }

    onInputChange(e, type, user) {
        let edit_field = (type === "e") ? "email" : "group_id"

        user[edit_field] = e.target.value;
        let user_list = this.state.user_list;
        user_list[user.idx] = user;

        this.setState({
            user_list: user_list
        })
    }

    onInputBlur(e, type, user) {
        let edit_field = (type === "e") ? "email_input" : "group_input"

        user.focus = false;

        this.disableInput(edit_field, user)
    }

    onInputKeyUp(e, type, user) {
        if(e.keyCode === 13){
            let edit_field = (type === "e") ? "email_input" : "group_input"
            this.disableInput(edit_field, user)
        }
    }

    onTDClick(e, type, user) {
        let edit_field = (type === "e") ? "email_input" : "group_input"

        if (user.focus) {
            return;
        }
        this.disableInput(edit_field, user)
    }

    onInputFocus(e, type, user) {
        user.focus = true;

        let user_list = this.state.user_list;
        user_list[user.idx] = user;

        this.setState({
            user_list: user_list
        })
    }

    disableInput(edit_field, user) {
        if (user[edit_field]) {

            if (edit_field === "email_input") {
                if (!utils.validEmail(user.email)) {
                    utils.errorTips("邮箱非法")
                    return;
                }
            }

            let user_list = this.state.user_list;
            user[edit_field] = false;
            user_list[user.idx] = user;
            this.setState({
                user_list: user_list
            })
        }
    }

    checkChanged(user) {
        return ((user.email !== user.last_email) ||
            (user.group_id !== user.last_group))
    }

    onUpdate(user) {
        if (!this.checkChanged(user)) {
            utils.errorTips("没有可更新的数据");
            return;
        }

        userService.updateUser(user.username, user.email, user.group_id).then(res => {

            utils.successTips()

            user.last_group = user.group_id;
            user.last_email = user.email;

            let user_list = this.state.user_list;
            user_list[user.idx] = user;
            this.setState({
                user_list: user_list
            })

        }, error => {
            utils.errorTips(error)
        })
    }

    onGroupChange(e, group_id, user) {
        user.group_id = group_id;

        let user_list = this.state.user_list;
        user_list[user.idx] = user;
        this.setState({
            user_list: user_list
        })
    }

    onDeleteUser(user) {
        utils.confirmDialog("确认删除 " + user.username +" 吗?", (agree) => {
            if (agree) {
                userService.deleteUser(user.username).then(res => {
                    this.loadUserList();
                }, err => {
                    utils.errorTips(err)
                })
            }
        })
    }

    onUpdatePassword(user) {
        this.setState({
            show_update_password: true,
            update_username: user.username
        })

    }

    render() {
        return (
            <PageTitle title="用户列表">
                <div className="user-list-pannel">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <Table celled inverted selectable color={"grey"}>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>用户名</Table.HeaderCell>
                                        <Table.HeaderCell>邮箱</Table.HeaderCell>
                                        <Table.HeaderCell>用户组</Table.HeaderCell>
                                        <Table.HeaderCell>编辑</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {
                                        this.state.user_list.map((user, idx) => {

                                            let dataChanged = this.checkChanged(user)

                                            let groupOptions = [];
                                            let groupPlaceHolder = "";
                                            this.state.group_list.map((group, idx) => {
                                                groupOptions.push({
                                                    key: idx,
                                                    text: group.desc + "(" +group.id + ")" ,
                                                    value: group.id
                                                })

                                                if (group.id === user.group_id) {
                                                    groupPlaceHolder = group.desc + "(" +group.id + ")";
                                                }

                                                if (user.group_id === group.id) {
                                                    user.desc = group.desc;
                                                }
                                            })

                                            return (
                                                <Table.Row key={idx}>
                                                    <Table.Cell>{user.username}</Table.Cell>
                                                    <Table.Cell onDoubleClick={ () => this.onDbClick(user, "e")} onClick={ (e) => this.onTDClick(e, "e", user)}>
                                                        {
                                                            user.email_input ? <Input
                                                                    placeholder={user.email}
                                                                    onFocus={ (e) => this.onInputFocus(e, "e", user)}
                                                                    onChange={(e) => this.onInputChange(e, "e", user)}
                                                                    onBlur={(e) => this.onInputBlur(e, "e", user)}
                                                                    onKeyUp={(e) => this.onInputKeyUp(e, "e", user)}/>
                                                                : user.email
                                                        }
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {
                                                            this.isAdminUser(user) ? user.desc + "(" + user.group_id + ")" :
                                                                <Dropdown placeholder={groupPlaceHolder} search selection options={groupOptions} onChange={(e, {value}) => this.onGroupChange(e, value, user)}/>
                                                        }

                                                    </Table.Cell>
                                                    <Table.Cell textAlign='center'>
                                                        {
                                                            this.isAdminUser(user) ? "管理员用户不可修改" :
                                                                <Button.Group>
                                                                    <Button color={!dataChanged ? "brown" : "green"} disabled={ !dataChanged } onClick={ () => this.onUpdate(user)}>
                                                                        <Icon name='edit' /> 更新
                                                                    </Button>
                                                                    <Button.Or />
                                                                    <Button color='youtube' onClick={ () => this.onDeleteUser(user)}><Icon name='delete'/> 删除</Button>
                                                                    <Button.Or />
                                                                    <Button color='blue' onClick={ () => this.onUpdatePassword(user)}><Icon name='edit'/> 修改密码 </Button>
                                                                </Button.Group>
                                                        }
                                                    </Table.Cell>

                                                </Table.Row>
                                            )
                                        })
                                    }
                                </Table.Body>
                            </Table>
                        </div>
                    </div>
                </div>

                <div>
                    <UserPasswordDialog show={ this.state.show_update_password } username={ this.state.update_username }/>
                </div>
            </PageTitle>
        )
    }
}

export default UserQuery
