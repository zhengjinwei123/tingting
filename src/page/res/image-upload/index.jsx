import React from "react"
import {Divider, Header, Segment, Icon, Button, Grid, Form, TextArea, Table, Label, Pagination, Image} from 'semantic-ui-react'

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
            image_name: "",

            res_list: [],
            cur_page: 1,
            total_page: 0,
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

        let state = this.state
        state[name] = value
        this.setState(state)
    }

    loadImages() {

        userService.getImageList(this.state.cur_page).then(res => {
            if (res.datalist && res.datalist.length) {
                this.setState({
                    res_list: res.datalist,
                    cur_page: res.cur_page,
                    total_page: res.total_page,
                })
            } else {
                this.setState({
                    res_list: [],
                    cur_page: 1,
                    total_page: 0
                })
            }
        })
    }

    onUpload() {
        if (!this.fileUpLoaderRef.isSuccess()) {
            utils.errorTips("请先上传")
            return
        }

        if (this.state.desc.length <=0 || this.state.desc.length > 30) {
            utils.errorTips("描述长度非法")
            return
        }

        userService.uploadResImage(this.state.image_name, this.state.desc).then(res => {

            this.fileUpLoaderRef.resetAll()

            this.loadImages()
            utils.successTips("success")
        })
    }

    componentDidMount() {
        this.loadImages()
    }

    onDelete(id) {

        utils.confirmDialog("确认删除？", (agree) => {
            if (agree) {
                userService.deleteRes(id).then(res => {
                    this.loadImages()
                    utils.successTips("success")
                })
            }
        }, "删除图片")

    }

    onEdit(resInfo) {
        console.log("onEdit", resInfo)
    }

    onPageChange(e, data) {
        this.setState({
            cur_page: data.activePage,
        }, () => {
            this.loadImages()
        })
    }

    render() {
        const resList = this.state.res_list
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
                                                <FileUploader onRef={(ref) => this.fileUpLoaderRef = ref} onUploadSuccess={(filename) => this.onUploadSuccess(filename)}/>
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

                    <Divider hidden/>

                    <Header as='h3'>图片列表</Header>

                    <div className="blog-list-pannel">
                        <Table celled  selectable color={"violet"} sortable={true} striped>
                            <Table.Header>
                                <Table.Row active>
                                    <Table.HeaderCell>ID</Table.HeaderCell>
                                    <Table.HeaderCell>名称</Table.HeaderCell>
                                    <Table.HeaderCell>描述</Table.HeaderCell>
                                    <Table.HeaderCell>缩略图</Table.HeaderCell>
                                    <Table.HeaderCell>创建时间</Table.HeaderCell>
                                    <Table.HeaderCell>最后更新时间</Table.HeaderCell>
                                    <Table.HeaderCell>编辑</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {
                                    resList.map((res, idx) => {

                                        let ous = idx % 2 === 0;

                                        let url = utils.uploadedImageHost(res.url)

                                        return (

                                            <Table.Row key={idx} error={ous}>
                                                <Table.Cell>
                                                    <Label ribbon={true} color={"blue"}>
                                                        {res.id}
                                                    </Label>
                                                </Table.Cell>
                                                <Table.Cell>{res.res_name}</Table.Cell>
                                                <Table.Cell>{res.res_desc}</Table.Cell>
                                                <Table.Cell>
                                                    <Image size="mini" src={url}/>
                                                </Table.Cell>
                                                <Table.Cell>{utils.formatDate(res.create_tm) }</Table.Cell>
                                                <Table.Cell>{res.update_tm}</Table.Cell>
                                                <Table.Cell>
                                                    <Button negative onClick={() => this.onDelete(res.id)}>
                                                        <Icon name='delete' />删除
                                                    </Button>
                                                    <Button color={"linkedin"} onClick={() => this.onEdit(res) } >
                                                        <Icon name='edit' />修改
                                                    </Button>
                                                </Table.Cell>
                                            </Table.Row>
                                        )
                                    })
                                }
                            </Table.Body>
                        </Table>
                        <div className={"float-right"}>
                            <Pagination
                                onPageChange={(e, data) => this.onPageChange(e, data)}
                                defaultActivePage={this.state.cur_page}
                                ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                                firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                                lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                                prevItem={{ content: <Icon name='angle left' />, icon: true }}
                                nextItem={{ content: <Icon name='angle right' />, icon: true }}
                                totalPages={this.state.total_page}
                            />
                        </div>
                    </div>
                </div>
            </PageTitle>
        )
    }
}