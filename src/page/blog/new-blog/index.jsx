import React from "react"

import PageTitle from "component/pagetitle/index.jsx";
import MyMarkdownEditor from "page/blog/new-blog/markdownEditor.jsx"
import {Button, Icon} from "semantic-ui-react";

import AddBlogModal from "page/blog/new-blog/addBlogModal.jsx";

import "./index.scss"

const init_markdown = "markdown editor"

import blogService from "service/blog.jsx"
import utils from "utils/utils.jsx"

class BlogEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            markdown_data: init_markdown,

            show_add_modal: false
        }
    }

    savePage(complate) {

        let data = this.MarkdownEditorRef.getData()
        this.setState({
            markdown_data: data
        }, () => {
            if (complate) { complate() }
        })
    }

    upLoadBlog() {
        this.setState({
            show_add_modal: true
        })
    }

    onSave(blog_name, category_id) {
        this.savePage(() => {
            let content = this.state.markdown_data;
            blogService.addBlog(blog_name, 2, category_id, content).then(res => {

                utils.successTips("success")
                this.setState({
                    show_add_modal: false
                })
            }, err => {
                utils.errorTips(err)
            })
        });
    }

    closeAddDialog() {
        this.setState({
            show_add_modal: false
        })
    }

    render() {
        return (
            <PageTitle title="写博客">
                <div>
                    <Button.Group>
                        <Button color={"google plus"} onClick={() => this.upLoadBlog() }>
                            <Icon name={"upload"}/>上传博客</Button>
                    </Button.Group>
                </div>

                <MyMarkdownEditor
                    data={this.state.markdown_data }
                    onRef={(ref) => { this.MarkdownEditorRef = ref} }
                />

                <div>
                    <AddBlogModal
                        saveBlog={(blog_name, category_id) => this.onSave(blog_name, category_id)}
                        show={ this.state.show_add_modal}
                        closeDialog={() => this.closeAddDialog() }
                    />
                </div>
            </PageTitle>
        )
    }
}

export default BlogEditor