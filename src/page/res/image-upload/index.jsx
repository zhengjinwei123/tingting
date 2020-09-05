import React from "react"
import {Divider, Header, Segment, Icon, Button, Grid, Form, TextArea} from 'semantic-ui-react'

import PageTitle from "component/pagetitle/index.jsx";
import {FileUploader} from "component/fileuploader/index.jsx"

import userService from "service/user.jsx"
import utils from "utils/utils.jsx"

import "./index.scss"

export default class ImageUpload extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            desc: "",
            image_name: ""
        }
    }

    onUploadSuccess(filename) {
        this.setState({
            image_name: filename
        })
        console.log("ImageUpload onUploadSuccess", filename)
    }

    onChange(e) {
        let name = e.target.name,
            value = e.target.value;
        console.log(name, value)

        let state = this.state
        state[name] = value
        this.setState(state)
    }

    loadImages() {

    }

    onUpload() {
        userService.uploadRes("img", this.state.image_name, this.state.desc).then(res => {

            this.loadImages()
            utils.successTips("success")
        })
    }

    render() {
        return (
            <PageTitle title="图片上传">
                <div>
                    <div>
                        <Segment placeholder>
                            <Grid columns={1} stackable textAlign='center'>
                                <Grid.Row verticalAlign='middle'>
                                    <Grid.Column>
                                        <Header icon>
                                            <Icon name='cloud upload' />
                                            上传图片
                                        </Header>

                                        <Form>
                                            <Form.Field>
                                                <FileUploader onUploadSuccess={(filename) => this.onUploadSuccess(filename)}/>
                                            </Form.Field>

                                            <Form.Field>
                                                <TextArea
                                                    name={"desc"}
                                                    onChange={(e) => this.onChange(e)}
                                                    value={this.state.desc}
                                                    placeholder='图片描述...'
                                                />
                                            </Form.Field>


                                            <Button  inverted color='red' content={"确认上传"} onClick={() => this.onUpload()}/>
                                        </Form>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </div>

                    <Divider hidden />

                    <Header as='h3'>图片列表</Header>
                </div>
            </PageTitle>
        )
    }
}