import React from "react"
import ReactDOM from "react-dom";
import {Button, Modal} from "semantic-ui-react";

import utils from "utils/utils.jsx"

import "./index.scss"

class ConfirmDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            show: false,
            title: "",
            content: "",

            callback: null
        }
    }

    open(options) {
        options = options || {
            title : "提示",
            content: "",
            callback: null
        }

        this.setState({
            show: true,
            title: options.title,
            content: options.content,
            callback: options.callback
        })
    }

    close() {
        this.setState({
            show: false
        })
    }

    onClickBtn(agree) {
        if (utils.isFunction(this.state.callback)) {
            this.state.callback(agree)
        }

        this.close();
    }

    render() {
        return (
            <div>
                <Modal
                    dimmer={"blurring"}
                    size={"mini"}
                    className={"confirm-dialog"}
                    open={ this.state.show }
                    onClose={() => this.close()}
                    closeOnDimmerClick={false}
                >
                    <Modal.Header>{this.state.title}</Modal.Header>
                    <Modal.Content className={"content"}>
                        { this.state.content }
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={() => this.onClickBtn(false)}>
                            关闭
                        </Button>
                        <Button positive onClick={() =>this.onClickBtn(true)}>
                            确认
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

let div = document.createElement('div');
let props = {

};
document.body.appendChild(div);

let Box = ReactDOM.render(React.createElement(
    ConfirmDialog,
    props
),div);


export default Box;