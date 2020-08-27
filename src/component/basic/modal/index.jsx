import React from "react"

class BaseModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.show !== undefined) {
            this.setState({
                show: nextProps.show
            })
        }
    }

    setShow(show) {
        this.setState({
            show: show
        })

        if (!show && this.props.onClose) {
            this.props.onClose()
        }
    }
}

export default BaseModal