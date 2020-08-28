import BaseModal from "component/basic/modal/index.jsx";
import {Button, Container, Form, Modal} from "semantic-ui-react";
import React from "react";
import "./index.scss"

import blogService from "service/blog.jsx"
import utils from "utils/utils.jsx"
import ModalHeader from "component/basic/modal-header/index.jsx";


class AddCategoryModal extends BaseModal {
    constructor(props) {
        super(props);

        this.state = {
            category: ""
        }
    }

    onAdd() {

        if (this.state.category === "") {
            utils.errorTips("博客类别的长度非法")
            return
        }

        blogService.addCategory(this.state.category).then(res => {

            utils.successTips("success")
            this.setShow(false)
            this.props.closeModal("success");
        }, err => {
            utils.errorTips(err)
        })
    }

    onChangeBlogCategory(e) {
        this.setState({
            category: e.target.value
        })
    }

    render() {
       return (
           <Modal
               className={"addcategory-dialog"}
               closeOnDimmerClick={false}
               centered={false}
               size = "small"
               onClose={ () => this.setShow(false) }
               open = { this.state.show }
           >
               <Modal.Header>
                   <ModalHeader title={"新增博客类别"} onClose={() => this.setShow(false)}/>
               </Modal.Header>
               <Modal.Content className={"content"} scrolling={true}>
                   <Container>
                       <Form>
                           <Form.Field>
                               <label>类别</label>
                               <input placeholder='博客类别' onChange={(e) => this.onChangeBlogCategory(e) }/>
                           </Form.Field>
                       </Form>
                   </Container>
               </Modal.Content>
               <Modal.Actions>
                   <Button positive onClick={ () => this.onAdd() }>确认</Button>
                   <Button  color='grey' onClick={ () => {this.setShow(false); this.props.closeModal()} }>
                       关闭
                   </Button>
               </Modal.Actions>
           </Modal>
       )
    }
}

export default AddCategoryModal