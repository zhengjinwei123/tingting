import React from "react"
import {withRouter} from "react-router-dom";

import {FileUploader} from "component/fileuploader/index.jsx";
import { Divider, Form, Grid, Icon, Segment} from 'semantic-ui-react'

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
            wx_img_name: "",
            zf_img_name: ""
        }
    }

    componentDidMount() {

        this.profileCardRef.reload((profile) => {
            this.setState({
                nickname: profile.nickname,
                sex: profile.sex,
                userdesc: profile.userdesc,
                wx_img: profile.wx_image,
                zf_img: profile.zf_image,
                wx_img_name: profile.wx_image_name,
                zf_img_name: profile.zf_image_name,
            })
        });
    }

    onInputChange(e) {
        let inputValue = e.target.value,
            inputName = e.target.name;

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
        this.setState({
            sex: data.value
        })
    }


    onUploadSuccess(type, filename) {

        if (type === "wx") {
            this.setState({
                wx_img_name: filename
            })
        } else {
            this.setState({
                zf_img_name: filename
            })
        }
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

        if (this.state.wx_img_name === "") {
            utils.errorTips("请上传微信二维码")
            return;
        }
        if (this.state.zf_img_name === "") {
            utils.errorTips("请上传微信支付二维码")
            return;
        }

        let username = userService.getUserInfo().username

        userService.updateProfile(username, this.state.nickname,
            this.state.sex, this.state.userdesc,
            this.state.wx_img_name, this.state.zf_img_name).then(res => {

            this.profileCardRef.reload();

                utils.successTips("更新成功")
        })
    }

    render() {

        let username = userService.getUserInfo().username

        return (
            <PageTitle title="基础信息录入">
                <Segment>
                    <Grid columns={2}>
                        <Grid.Column>
                            <Form>
                                <Form.Input
                                    defaultValue={this.state.nickname}
                                    name={"nickname"}
                                    icon='user'
                                    iconPosition='left'
                                    label='昵称'
                                    placeholder='昵称'
                                    onChange={ e => this.onInputChange(e) }
                                />
                                <Form.TextArea
                                    defaultValue={this.state.userdesc}
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
                                    value={this.state.sex}
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
                                    <FileUploader onUploadSuccess={(filename) => this.onUploadSuccess("wx", filename)} defaultValue={this.state.wx_img_name} defaultImage={this.state.wx_img}/>
                                </Form.Field>


                                <Form.Field>
                                    <label>微信支付收钱码:</label>
                                    <FileUploader onUploadSuccess={(filename) => this.onUploadSuccess("zf", filename)} defaultValue={this.state.zf_img_name} defaultImage={this.state.zf_img}/>
                                </Form.Field>

                                <br/>
                                <Form.Button content='更新' primary onClick={() => this.onSubmit() } />

                            </Form>
                        </Grid.Column>

                        <Grid.Column  verticalAlign='top' width={5} relaxed={"very"} floated='right'>
                            <ProfileCard author={username} onRef={(ref) => this.profileCardRef = ref }/>
                        </Grid.Column>
                    </Grid>

                    <Divider vertical>
                        <Icon name={"settings"}/>
                    </Divider>
                </Segment>
            </PageTitle>
        )
    }
}
export default withRouter(UserProfile)
