import React from "react";
import {Button, Modal, Message} from "semantic-ui-react";

class Child extends React.Component {
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
            'danger' : 1,
            'info' : 1,
            'warning' : 1,
        }

        let type = "info";
        if (validType[this.state.type]) {
            type = this.state.type;
        }

        let color = "text-" + type;

        return (
            <Modal
                closeOnDimmerClick={false}
                className={ "child" }
                size={"mini"}
                open={ this.state.show }
            >
                <Modal.Header> <span className={color}>{ this.state.tips } </span></Modal.Header>
                <Modal.Content className={"content"}>
                    {
                        this.state.type === "danger" ?
                            <Message warning>
                                { this.state.content }
                            </Message> :
                            <Message positive>
                                { this.state.content }
                            </Message>
                    }
                </Modal.Content>
                <Modal.Actions>
                    <Button positive onClick={ () => this.onClose(false) }>
                        好的
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default Child