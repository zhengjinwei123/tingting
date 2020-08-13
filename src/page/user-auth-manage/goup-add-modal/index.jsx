import React from 'react'

import PropTypes from "prop-types"
import {Button, Modal, Container, Form, Checkbox} from "semantic-ui-react";

import AuthItems from "component/auth-items/index.jsx"

import "./index.scss"
import globalService from "service/global.jsx";

class GroupAddModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,

            menus: [],
            auths: {},
            auth_parents: {},
        }

        this.setShow = this.setShow.bind(this)
    }

    setShow(show) {
        this.setState({
            show: show
        })
    }

    componentDidMount() {
        globalService.authList().then(res => {
            console.log("get auth")
            res.menulist = res.menulist.sort(function (a, b)  {

                return a.id - b.id;
            })

            let authMap = {}
            let authParent = {}
            res.authlist.map((item)=> {
                let id = parseInt(item.id / 1000);
                let e = item.id % 1000;

                if (e === 0 && item.url === "/api#") {
                    authParent[id] = item;
                } else {
                    authMap[id] = authMap[id] || [];
                    authMap[id].push(item)
                }
            })


            this.setState({
                menus: res.menulist,
                auths: authMap,
                auth_parents: authParent
            })

            // console.log("authParent", authParent)
            // console.log("authMap" , authMap)
            // console.log("menuList" , res.menulist)

        },(err) => {
            console.log(err)
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            show: nextProps.show
        })
    }
    render() {
        return (
            <Modal
                centered={false}
                size = "large"
                onClose={ () => this.setShow(false) }
                open = { this.state.show }
            >
                <Modal.Header>新增用户组</Modal.Header>
                <Modal.Content scrolling={true}>
                    <Container>
                        <Form>
                            <Form.Field>
                                <label>用户组名称</label>
                                <input placeholder='用户组名称' />
                            </Form.Field>
                            <Form.Field>
                                <label>权限列表</label>

                                <AuthItems menus={ this.state.menus} auths={ this.state.auths} auth_parents={ this.state.auth_parents } />
                            </Form.Field>

                        </Form>
                    </Container>
                </Modal.Content>
                <Modal.Actions>
                    <Button type='submit'>Submit</Button>
                    <Button positive onClick={ () => this.setShow(false) }>
                        关闭
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

GroupAddModal.defaultProps = {
    show: false
}

GroupAddModal.propTypes = {
    show: PropTypes.bool.isRequired
}

export default GroupAddModal