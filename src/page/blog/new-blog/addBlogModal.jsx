import React from "react"
import {Button, Container, Form, Modal, Icon} from "semantic-ui-react";
import AddCategoryModal from "page/blog/new-blog/addCategoryModal.jsx";

import "./index.scss"

import blogService from "service/blog.jsx"
import utils from "utils/utils.jsx"
import ModalHeader from "component/basic/modal-header/index.jsx";

class AddBlogModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            blog_name: "",
            category_id: 0,
            categories : [],
            show_add_category: false
        }
    }

    setShow(show) {
        this.setState({
            show: show
        })

        if (!show) {
            this.props.closeDialog()
        }
    }

    closeAddCategoryModal() {
        this.setState({
            show_add_category: false}
        )
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            show: nextProps.show
        })
    }

    onChangeBlogName(e) {
        let value = e.target.value

        this.setState({
            blog_name: value
        })
    }

    onChangeCategory(category_id) {
        this.setState({
            category_id: parseInt(category_id)
        })
    }

    onSave() {
        if (this.state.blog_name === "") {
            utils.errorTips("请填写博客名称!")
            return;
        }

        if (this.state.category_id <= 0) {
            utils.errorTips("请选择博客类别!")
            return;
        }

        this.props.saveBlog(this.state.blog_name, this.state.category_id)
        this.setShow(false)
    }

    componentDidMount() {
        this.loadCategories();
    }

    loadCategories() {
        blogService.getCategories().then(res => {
            if (res.categories && res.categories.length) {
                this.setState({
                    categories: res.categories,
                    category_id:  res.categories.length ? res.categories[0].category_id : 0
                })
            }

        }, err => {
            utils.errorTips(err)
        })
    }

    openAddCategoryModal(show, reason) {
        this.setState({
            show_add_category: show
        })

        if (reason === "success") {
            this.loadCategories()
        }
    }

    render() {

        let categoryOptions = [];
        this.state.categories.map((value, idx) => {
            categoryOptions.push({
                key: idx,
                text: value.desc+"("+value.category_id+")",
                value: value.category_id
            })
        })

        return (
            <div>
                <Modal
                    className={"addblog-dialog"}
                    closeOnDimmerClick={false}
                    size = "small"
                    onClose={ () => this.setShow(false) }
                    open = { this.state.show }
                >
                    <Modal.Header>
                        <ModalHeader title={"上传博客"} onClose={() => this.setShow(false)}/>
                    </Modal.Header>
                    <Modal.Content className={"content"} scrolling={true}>
                        <Container>
                            <Form>
                                <Form.Field>
                                    <label>博客名称</label>
                                    <input placeholder='博客名称' onChange={(e) => this.onChangeBlogName(e) }/>
                                </Form.Field>
                                <Form.Field>
                                    <label>博客类别</label>
                                    <Form.Dropdown
                                        defaultValue={categoryOptions.length ? categoryOptions[0].value : 0}
                                        selection
                                        labeled
                                        options={categoryOptions}
                                        search
                                        onChange={(e, {value}) => this.onChangeCategory(value)}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label></label>
                                    <Button icon color='teal' labelPosition='right' onClick={ () => this.openAddCategoryModal(true) }>
                                        添加类别
                                        <Icon name='right arrow' />
                                    </Button>
                                </Form.Field>
                            </Form>
                        </Container>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button positive onClick={ () => this.onSave() }>上传</Button>
                        <Button  color='grey' onClick={ () => this.setShow(false) }>
                            关闭
                        </Button>
                    </Modal.Actions>
                </Modal>
                <div>
                    <AddCategoryModal
                        onClose={() => this.closeAddCategoryModal(false)}
                        show={ this.state.show_add_category } closeModal={(reason) => this.openAddCategoryModal(false, reason)}/>

                </div>
            </div>
        )
    }
}

export default AddBlogModal