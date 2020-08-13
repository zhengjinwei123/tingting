import React from "react"
import { Button } from "semantic-ui-react";
import { Icon, Label, Table } from 'semantic-ui-react'


class UserAuthTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            group_detail_list: [],
            show: false
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        setTimeout(() => {
            this.setState({
                group_detail_list: this.state.group_detail_list.length === 0 ?  nextProps.groupDetailList: this.state.group_detail_list
            })
        }, 0)
    }

    onEdit(e, id, type) {
        console.log("onEdit", id, type)

    }

    render() {
        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>用户组ID</Table.HeaderCell>
                        <Table.HeaderCell>用户组名称</Table.HeaderCell>
                        <Table.HeaderCell>菜单权限</Table.HeaderCell>
                        <Table.HeaderCell>API权限</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    { this.state.group_detail_list.map((item, idx) => {
                        let menuLen = item.menus.split(',').length
                        let authLen = item.auths.split(',').length

                        return   <Table.Row key={idx}>
                            <Table.Cell>
                                {
                                    item.id === 1 ? <Label ribbon>{item.id}</Label> : <div>{item.id}</div>
                                }
                            </Table.Cell>
                            <Table.Cell>{item.desc}</Table.Cell>
                            <Table.Cell>
                                <Button id={item.id} as='div' labelPosition='right' onClick={ (e, {id}) => this.onEdit(e, id, 'menus') }>
                                    <Button color='blue'>
                                        <Icon name='edit' />
                                        修改
                                    </Button>
                                    <Label as='a' basic color='blue' pointing='left'>
                                        {
                                            menuLen
                                        }
                                    </Label>
                                </Button>
                            </Table.Cell>
                            <Table.Cell>
                                <Button id={item.id}  as='div' labelPosition='right' onClick={ (e, {id}) => this.onEdit(e, id, 'auths') }>
                                    <Button color='blue'>
                                        <Icon name='edit' />
                                        修改
                                    </Button>
                                    <Label as='a' basic color='blue' pointing='left'>
                                        {
                                            authLen
                                        }
                                    </Label>
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>
            </Table>
        )
    }
}

export default UserAuthTable