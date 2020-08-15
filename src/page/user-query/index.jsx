import React from "react"
import PageTitle from "component/pagetitle/index.jsx";
import { Table,Button,Icon, Input } from 'semantic-ui-react'

import userService from "service/user.jsx"
import utils from "utils/utils.jsx"

import "./index.scss"

class UserQuery extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user_list :[]
        }
    }

    componentDidMount() {
        userService.getUserList().then(res => {

            let userList = [];
            res.userlist.map((item, idx) => {
                item.email_input = false;
                item.group_input = false;
                item.focus = false;
                item.idx = idx;

                userList[idx] = item;
            })


            this.setState({
                user_list: userList
            })
        }, err => {
            utils.errorTips(err)
        })
    }

    onDbClick(user, type) {
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
            let user_list = this.state.user_list;
            user[edit_field] = false;
            user_list[user.idx] = user;
            this.setState({
                user_list: user_list
            })
        }
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="用户列表"/>
                <div className="user-list-pannel">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <Table celled inverted selectable color={"grey"}>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>用户名</Table.HeaderCell>
                                        <Table.HeaderCell>邮箱</Table.HeaderCell>
                                        <Table.HeaderCell>用户组ID</Table.HeaderCell>
                                        <Table.HeaderCell>编辑</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {
                                        this.state.user_list.map((user, idx) => {
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
                                                    <Table.Cell onDoubleClick={ () => this.onDbClick(user, "g")} onClick={ (e) => this.onTDClick(e, "g", user)}>
                                                        {
                                                            user.group_input ? <Input
                                                                    placeholder={user.group_id}
                                                                    onChange={(e) => this.onInputChange(e, "g", user)}
                                                                    onBlur={(e) => this.onInputBlur(e, "g", user)}
                                                                    onKeyUp={(e) => this.onInputKeyUp(e, "g", user)}/>
                                                                : user.group_id
                                                        }
                                                    </Table.Cell>
                                                    <Table.Cell textAlign='center'>
                                                        <Button.Group>
                                                            <Button color='green' disabled={true}>
                                                                <Icon name='edit' /> 更新
                                                            </Button>
                                                            <Button.Or />
                                                            <Button color='youtube'><Icon name='delete' /> 删除</Button>
                                                        </Button.Group>
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
            </div>
        )
    }
}

export default UserQuery
