import React from "react"
import { Button, Form, Label, Modal, Input, Icon } from 'semantic-ui-react'
import "./index.scss"
import utils from "utils/utils.jsx";
import userService from "service/user.jsx";

import {withRouter} from "react-router-dom"


class RegistUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,

            username: "",
            email: "",
            password: ""
        }
    }
    open(t) {
        this.setState({
            show: t
        })

        if (t === false) {
            this.props.onClose();
        }
    }

    componentDidMount() {

    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        if (this.state.show === nextProps.show) {
            return;
        }

        this.setState({
            show:  nextProps.show
        })
    }

    onChange(e) {
        let inputName = e.target.name,
            inputValue = e.target.value;

        this.setState({
            [inputName] : inputValue
        })
    }

    onRegister() {
        if (!utils.validUserName(this.state.username)) {
            utils.errorTips("用户名长度必须>=3");
            return;
        }
        if (!utils.validEmail(this.state.email)) {
            utils.errorTips("无效的邮箱类型");
            return;
        }
        if (!utils.validPassword(this.state.password)) {
            utils.errorTips("密码长度必须>=6");
            return;
        }
        userService.pupRegister({
            username: this.state.username,
            password: this.$md5(this.state.password),
            email: this.state.email,
            group_id: 0
        }).then(res => {
            utils.successTips("注册成功")
            this.open(false)
            this.props.history.push("/admin/login")

        }, (err) => {
            utils.errorTips(err)
        });
    }

    render() {
        return (
                <Modal
                    className={"register-modal"}
                    closeOnDimmerClick={false}
                    size={"small"}
                    open={this.state.show}
                >
                    <Label as='a' color='red' corner={"right"} icon={"delete"} onClick={() => this.open(false)}/>
                    <Modal.Header>注册</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>用户名</label>
                                <Input iconPosition='left' placeholder='用户名'>
                                    <Icon name='user' />
                                    <input name="username" onChange={(e) => this.onChange(e)}/>
                                </Input>

                            </Form.Field>
                            <Form.Field>
                                <label>邮箱</label>
                                <Input iconPosition='left' placeholder='Email'>
                                    <Icon name='at' />
                                    <input name="email" placeholder={"邮箱"}  onChange={(e) => this.onChange(e)}/>
                                </Input>
                            </Form.Field>

                            <Form.Field>
                                <label>密码</label>
                                <Input iconPosition='left' placeholder='password'>
                                    <Icon name='key' />
                                    <input type="password"name="password"  onChange={(e) => this.onChange(e)}/>
                                </Input>
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={() => this.open(false)}>
                            取消
                        </Button>
                        <Button type='submit'  onClick={() => this.onRegister()}>确认</Button>
                    </Modal.Actions>
                </Modal>
        )
    }
}

export default withRouter(RegistUser)