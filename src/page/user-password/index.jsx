import React from "react"
import {Button, Container, Form, Modal} from "semantic-ui-react";

import utils from "utils/utils.jsx"
import userService from "service/user.jsx"
import "./index.scss"

class UserPasswordDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            show: false,

            username: "",
            password1: "",
            password2: ""
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            show: nextProps.show,
            username: nextProps.username
        })
    }

    close() {
        this.setState({
            show: false
        })
    }

    onUpdate() {

        if (!utils.validPassword(this.state.password1)) {
            utils.errorTips("密码长度不合法")
            return
        }

        if (this.state.password1 !== this.state.password2) {
            utils.errorTips("两次输入的密码不一致!")
            return
        }

        userService.updatePassword(this.state.username, this.$md5(this.state.password1)).then(res => {
            utils.successTips("修改成功")
            this.close();
        }, err => {
            utils.errorTips(err)
        })
    }

    onPasswordChange(type, e) {
        if (type === 1) {
            this.setState({
                password1: e.target.value
            })
        } else {
            this.setState({
                password2: e.target.value
            })
        }
    }

    render() {
        return (
            <div>
                <Modal
                    dimmer={"blurring"}
                    className={"password-dialog"}
                    open={ this.state.show }
                    closeOnDimmerClick={false}
                >
                    <Modal.Header>{"修改密码"}</Modal.Header>
                    <Modal.Content>
                        <Container>
                            <Form>
                                <Form.Field>
                                    <label>用户名</label>
                                    <input disabled={true} value={this.state.username}/>
                                    <label>密码</label>
                                    <input type="password" placeholder={"请输入密码"} onChange={(e) => this.onPasswordChange(1, e) }/>
                                    <label>再次输入密码</label>
                                    <input type="password" placeholder={"请输入密码"} onChange={(e) => this.onPasswordChange(2, e) }/>
                                </Form.Field>
                            </Form>
                        </Container>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={() => this.close()}>
                            关闭
                        </Button>
                        <Button positive onClick={() =>this.onUpdate()}>
                            确认修改
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default UserPasswordDialog;