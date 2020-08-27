import React from "react"

import BaseModal from "component/basic/modal/index.jsx";

import "./index.scss"
import {Button, Container, Form, Icon, Modal} from "semantic-ui-react";

import MyBraftEditor from "page/blog/new-blog/braftEditor.jsx";
import MyMarkdownEditor from "page/blog/new-blog/markdownEditor.jsx"

import ModalHeader from "component/basic/modal-header/index.jsx"
import blogService from "service/blog.jsx";
import utils from "utils/utils.jsx";


class EditBlogModal extends BaseModal {
    constructor(props) {
        super(props);

        this.state = {
            blog: null,
            categories: []
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        super.UNSAFE_componentWillReceiveProps(nextProps);

        this.setState({
            blog: nextProps.blog
        })
    }

    componentDidMount() {
        if (this.props.blog) {
            this.setState({
                blog: this.props.blog
            })
        }


        this.loadCategories();
    }

    loadCategories() {
        blogService.getCategories().then(res => {
            if (res.categories && res.categories.length) {
                this.setState({
                    categories: res.categories
                })
            }

        }, err => {
            utils.errorTips(err)
        })
    }

    onUpdate() {

        const blog = this.state.blog
        let content = this.editorRef.getData()
        blogService.updateBlog(blog.id, blog.name, blog.category_id, content).then(res => {
            utils.successTips("更新成功")

            this.props.reload();
        }, err => {
            utils.errorTips(err)
        })
    }

    onChangeEditor(data) {

    }

    onChangeCategory(value) {
        let blog = this.state.blog
        blog.category_id = value
        this.setState({
            blog
        })
    }

    onChangeBlogName(e) {
        let value = e.target.value;
        let blog = this.state.blog
        blog.name = value
        this.setState({
            blog
        })
    }

    render() {

        const blog = this.state.blog ? this.state.blog : this.props.blog;
        if (!blog) {
            return (
                <div>
                </div>
            )
        }

        let categoryOptions = [];
        this.state.categories.map((value, idx) => {
            categoryOptions.push({
                key: idx,
                text: value.desc+"("+value.category_id+")",
                value: value.category_id
            })
        })

        return (
            <Modal
                closeOnDimmerClick={false}
                centered={true}
                size = "fullscreen"
                onClose={ () => this.setShow(false) }
                open = { this.state.show }
            >
                <Modal.Header>
                    <ModalHeader title={"修改博客"} onClose={() => this.setShow(false)}/>
                </Modal.Header>
                <Modal.Content className={"content"} scrolling={true}>
                    <Form>
                        <Form.Field>
                            <label>博客名称</label>
                            <input placeholder='博客名称' onChange={(e) => this.onChangeBlogName(e) } defaultValue={blog.name}/>
                        </Form.Field>
                        <Form.Field>
                            <label>博客类别</label>
                            <Form.Dropdown
                                defaultValue={blog.category_id}
                                selection
                                labeled
                                options={categoryOptions}
                                search
                                onChange={(e, {value}) => this.onChangeCategory(value)}
                            />
                        </Form.Field>
                        <Form.Field>
                            {
                                blog.type === 1 ? <MyBraftEditor data={blog.content} onRef={(ref) => this.editorRef = ref }  onChange={(data) => this.onChangeEditor(data) }/> :
                                    <MyMarkdownEditor data={blog.content} onRef={(ref) => this.editorRef = ref } onChange={(data) => this.onChangeEditor(data) }/>
                            }
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button positive onClick={ () => this.onUpdate() }>更新</Button>
                    <Button  color='grey' onClick={ () => this.setShow(false) }>
                        关闭
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}
export default EditBlogModal