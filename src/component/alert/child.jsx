import React, {Component} from "react";
import {Button, Modal} from "semantic-ui-react";

class Child extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            tips: '提示',
            content: '内容呢？',
            type: 'info'
        };
    }

    onClose(open) {
        this.props.close && this.props.close()

        this.setState({
            show: open
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps, context) {

        this.setState({
            show: nextProps.open,
            tips: nextProps.tips,
            content: nextProps.content,
            type: nextProps.type
        })
    }

    render() {

        let validType = {
            'error' : 1,
            'info' : 1,
            'warn' : 1,
        }

        let type = "info";
        if (validType[this.state.type] != null) {
            type = this.state.type;
        }

        let color = "text-" + type;

        return (
            <Modal
                className={ "child" }
                size={"mini"}
                open={ this.state.show }
            >
                <Modal.Header> <span className={color}>{ this.state.tips } </span></Modal.Header>
                <Modal.Content>
                    <p>{ this.state.content }</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button positive onClick={ () => this.onClose(false) }>
                        Yes
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default Child