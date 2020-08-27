import React from "react"
import { Link } from 'react-router-dom';
import PageTitle from "component/pagetitle/index.jsx";
import {Button, Icon, Label, Table} from "semantic-ui-react";
import EditBlogModal from "page/blog/edit-blog/index.jsx";

import "./index.scss"

import blogService from "service/blog.jsx"
import utils from "utils/utils.jsx"

class BlogList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            blog_list: [],

            show_edit_blog: false,
            cur_blog: null
        }
    }

    componentDidMount() {
        this.loadBlogs()
    }

    loadBlogs() {
        blogService.getUserBlogs().then(res => {

            if (res.bloglist && res.bloglist.length) {
                this.setState({
                    blog_list: res.bloglist
                })
            }
        })
    }

    onEditBlog(blog) {
        this.setState({
            cur_blog: blog,
            show_edit_blog: true
        })
    }

    onPublish(blog, status) {
        blogService.publishBlog(blog.id, status).then(res => {
            if (status === 1) {
                utils.successTips("发布成功")
            } else {
                utils.successTips("已关闭")
            }

            this.loadBlogs()
        }, err => {
            utils.errorTips(err)
        })
    }

    onCloseEditDialog() {
        this.setState({
            show_edit_blog: false
        })
    }

    render() {

        let blogList = this.state.blog_list

        return (
            <div id="page-wrapper">
                <PageTitle title="博客管理"/>
                <div className="blog-list-pannel">
                    <Table celled  selectable color={"violet"} sortable={true} striped>
                        <Table.Header>
                            <Table.Row active>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>名称</Table.HeaderCell>
                                <Table.HeaderCell>分类</Table.HeaderCell>
                                <Table.HeaderCell>状态</Table.HeaderCell>
                                <Table.HeaderCell>创建时间</Table.HeaderCell>
                                <Table.HeaderCell>发布时间</Table.HeaderCell>
                                <Table.HeaderCell>最后更新时间</Table.HeaderCell>
                                <Table.HeaderCell>编辑</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                blogList.map((blog, idx) => {

                                    let ous = idx % 2 === 0;
                                    let hasPublished = blog.status > 0;

                                    let bgColor = hasPublished ? "" : "bg-color-red";
                                    return (

                                        <Table.Row key={idx} error={ous}>
                                            <Table.Cell>
                                                <Label ribbon={true} color={"blue"}>
                                                    {blog.id}
                                                </Label>
                                            </Table.Cell>
                                            <Table.Cell>{blog.name}</Table.Cell>
                                            <Table.Cell>{blog.type}</Table.Cell>
                                            <Table.Cell className={bgColor}>
                                                {
                                                    hasPublished ?
                                                        <Link to={blog.url}>
                                                            <Label ribbon color="teal">{"已发布,点击前往"}</Label>
                                                        </Link>:
                                                        "未发布"
                                                }
                                            </Table.Cell>
                                            <Table.Cell>{utils.formatDate(blog.create_tm) }</Table.Cell>
                                            <Table.Cell>{utils.formatDate(blog.publish_tm) }</Table.Cell>
                                            <Table.Cell>{blog.update_tm}</Table.Cell>
                                            <Table.Cell>
                                                <Button negative>
                                                    <Icon name='delete' />删除
                                                </Button>

                                                {
                                                    hasPublished ? <Button color={"grey"} onClick={() => this.onPublish(blog, 0)}>关闭</Button> :
                                                        <Button positive onClick={() => this.onPublish(blog, 1)}>
                                                            <Icon name='send' />发布
                                                        </Button>

                                                }
                                                <Button color={"linkedin"} onClick={() => this.onEditBlog(blog) } >
                                                    <Icon name='edit' />修改
                                                </Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                })
                            }
                        </Table.Body>
                    </Table>
                </div>

                <div>
                    <EditBlogModal show={ this.state.show_edit_blog } blog={ this.state.cur_blog } onClose={() => this.onCloseEditDialog()} reload={() => this.loadBlogs() }/>
                </div>
            </div>
        )
    }
}

export default BlogList