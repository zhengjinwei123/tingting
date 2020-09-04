import React from "react"
import {withRouter} from "react-router-dom";

import {FileUploader} from "component/fileuploader/index.jsx";
import {Button, Card, Divider, Form, Grid, Image, Label, Segment} from 'semantic-ui-react'

import "./index.scss"
import PageTitle from "component/pagetitle/index.jsx";
import utils from "utils/utils.jsx";
import ProfileCard from "component/profilecard/index.jsx";

import userService from "service/user.jsx"


class UserProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nickname: "",
            sex: 1,
            userdesc: "",
            wx_img: "",
            zf_img: "",
        }
    }

    onInputChange(e) {
        let inputValue = e.target.value,
            inputName = e.target.name;

        // console.log(inputName, inputValue)

        if (inputName === "userdesc" && inputValue.trim().length > 50) {
            utils.errorTips("简介长度太长了，不能超过50个文字")
            return
        }

        if (inputName === "nickname" && inputValue.trim().length > 10) {
            utils.errorTips("昵称长度太长了，不能超过10个文字")
            return
        }

        this.setState({
            [inputName] : inputValue
        })
    }
    onSexChange(e, data) {
        console.log("sex", data.value)
        this.setState({
            sex: data.value
        })
    }


    onUploadSuccess(type, filename) {

        if (type === "wx") {
            this.setState({
                wx_img: filename
            })
        } else {
            this.setState({
                zf_img: filename
            })
        }


        console.log("onUploadSuccess onUploadImage", type, filename)
    }

    onSubmit() {

        if (this.state.nickname === "") {
            utils.errorTips("请填写昵称")
            return;
        }

        if (this.state.userdesc === "") {
            utils.errorTips("请填写简介")
            return;
        }

        if (this.state.wx_img === "") {
            utils.errorTips("请上传微信二维码")
            return;
        }
        if (this.state.zf_img === "") {
            utils.errorTips("请上传微信支付二维码")
            return;
        }

        let username = userService.getUserInfo().username

        userService.updateProfile(username, this.state.nickname,
            this.state.sex, this.state.userdesc,
            this.state.wx_img, this.state.zf_img).then(res => {

            this.profileCardRef.reload();

                utils.successTips("更新成功")
        }, err => {

        })
    }

    render() {

        let username = userService.getUserInfo().username

        return (
            <div id="page-wrapper">
                <PageTitle title="基础信息录入"/>

                <Segment>
                    <Grid columns={2}>
                        <Grid.Column>
                            <Form>
                                <Form.Input
                                    name={"nickname"}
                                    icon='user'
                                    iconPosition='left'
                                    label='昵称'
                                    placeholder='昵称'
                                    onChange={ e => this.onInputChange(e) }
                                />
                                <Form.TextArea
                                    name={"userdesc"}
                                    label='简介'
                                    placeholder='简介'
                                    onChange={ e => this.onInputChange(e) }
                                />
                                <Form.Dropdown
                                    name={"sex"}
                                    label='性别'
                                    placeholder='选择性别'
                                    fluid
                                    selection
                                    defaultValue={1}
                                    options={[
                                        {
                                            key: 'm',
                                            text: '男',
                                            value: 1,
                                        },
                                        {
                                            key: 'f',
                                            text: '女',
                                            value: 0,
                                        }
                                    ]}
                                    onChange={ (e,data) => this.onSexChange(e, data) }
                                />

                                <Form.Field>
                                    <label>微信二维码:</label>
                                    <FileUploader onUploadSuccess={(filename) => this.onUploadSuccess("wx", filename)}/>
                                </Form.Field>


                                <Form.Field>
                                    <label>微信支付收钱码:</label>
                                    <FileUploader onUploadSuccess={(filename) => this.onUploadSuccess("zf", filename)}/>
                                </Form.Field>

                                <br/>
                                <Form.Button content='更新' primary onClick={() => this.onSubmit() } />

                            </Form>
                        </Grid.Column>

                        <Grid.Column  verticalAlign='top' width={5} relaxed={"very"} floated='right'>
                            <ProfileCard author={username} onRef={(ref) => this.profileCardRef = ref }/>
                        </Grid.Column>
                    </Grid>

                    <Divider vertical>Or</Divider>
                </Segment>
            </div>
        )
    }
}
export default withRouter(UserProfile)
