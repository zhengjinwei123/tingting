import React from "react"
import {Button, Icon} from "semantic-ui-react";

import "./index.scss"

class ModalHeader extends React.Component {

    onClickBtn() {
        if (this.props.onClose) {
            this.props.onClose()
        }
    }

    render() {
        const title = this.props.title || ""
        return (
            <div className={"modal-header"}>
                <div className={"float-left"}>
                    {title}
                </div>
                <div className={"float-right"}>
                    <Button icon color={"youtube"} onClick={() => this.onClickBtn() }>
                        <Icon name='close' />
                    </Button>
                </div>
            </div>
        )
    }
}

export default ModalHeader