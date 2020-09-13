import React  from 'react';

import {Button, Modal} from 'semantic-ui-react'

import "./index.scss"

export default class CommonModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            show: false,
            tips: ""
        }
    }

    open() {
        this.setState({
            show: true
        })
    }

    close() {
        this.setState({
            show: false
        })
    }

    componentDidMount() {
        if (this.props.onRef) {
            this.props.onRef(this)
        }
    }

    render() {

        return(
            <Modal
                closeOnDimmerClick={false}
                className={ "child" }
                size={"large"}
                open={ this.state.show }
            >
                <Modal.Header>
                    { this.props.tips }
                </Modal.Header>
                <Modal.Content className={"content"}>
                    {this.props.children}
                    <p></p>
                </Modal.Content>
                <Modal.Actions>
                    <Button positive onClick={ () => this.close() }>
                        好的
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}
