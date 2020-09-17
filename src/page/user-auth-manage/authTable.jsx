import React from "react"
import { Icon, Label, Table, Button } from 'semantic-ui-react'
import GroupAuthEditModal from "page/user-auth-manage/group-auth-edit-modal/index.jsx";
import globalService from "service/global.jsx";

import utils from "utils/utils.jsx"


class UserAuthTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            group_detail_list: [],
            show: false,

            showEditModal: false,

            edit_id: 0,
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        setTimeout(() => {
            this.setState({
                group_detail_list: nextProps.groupDetailList
            })
        }, 0)
    }

    closeDialog() {

        this.setState({
            showEditModal: false
        })
    }

    onEdit(e, id) {
        this.setState({
            showEditModal: true,
            edit_id: id
        })
    }

    updatePage() {
        globalService.groupDetailList().then(res => {
            this.setState({
                group_detail_list: res.grouplist
            })
            console.log("group_detail_list:", res.grouplist)
        }, err => {
            console.error(err)
        })
    }

    onDelete(id) {
        utils.confirmDialog("确认删除吗？", (agree) => {
            if (agree) {
                globalService.deleteGroup(id).then(res => {
                    this.updatePage()
                    utils.successTips("success")
                }, error => {
                    utils.errorTips(error)
                })
            }
        })
    }

    render() {
        return (
            <div>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>用户组ID</Table.HeaderCell>
                            <Table.HeaderCell>用户组名称</Table.HeaderCell>
                            <Table.HeaderCell>权限</Table.HeaderCell>
                            <Table.HeaderCell>编辑</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        { this.state.group_detail_list.map((item, idx) => {
                            let checked_menus = item.menus.split(',');
                            let checked_auths = item.auths.split(',');

                            let menuLen = checked_menus.length
                            let authLen = checked_auths.length

                            let desc = "菜单:" + menuLen + " | API:" + authLen

                            return   <Table.Row key={idx}>
                                <Table.Cell>
                                    {
                                        <Label ribbon>{item.id}</Label>
                                    }
                                </Table.Cell>
                                <Table.Cell>{item.desc}</Table.Cell>
                                <Table.Cell>
                                    <Button id={item.id} as='div' labelPosition='right' onClick={ (e, {id}) => this.onEdit(e, id) } disabled={item.id === 1 ? true : false}>
                                        <Button color='blue'>
                                            <Icon name='edit' />
                                            修改
                                        </Button>
                                        <Label as='a' basic color='blue' pointing='left'>
                                            {
                                                desc
                                            }
                                        </Label>
                                    </Button>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button color='youtube' onClick={() => this.onDelete(item.id)} disabled={item.id === 1 ? true : false}>
                                        <Icon name='delete' /> 删除
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        })}
                    </Table.Body>
                </Table>
                <div>
                    <GroupAuthEditModal show={ this.state.showEditModal }
                                        closeDialog={() => this.closeDialog() }
                                        group_id={this.state.edit_id}
                                        group_detail_list={this.state.group_detail_list}
                                        updatePage={() => this.updatePage() }/>
                </div>

            </div>

        )
    }
}

export default UserAuthTable