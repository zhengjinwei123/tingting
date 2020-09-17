import React  from 'react'

import {
    Image,
    Header,
    Segment,
    TransitionablePortal,
} from 'semantic-ui-react'

import PropTypes from "prop-types"
import utils from "utils/utils.jsx"

import _ from "lodash"

import "./index.scss"
const transitions = [
    'browse',
    'browse right',
    'drop',
    'fly up',
    'fly down',
    'fly left',
    'fly right',
    'scale',
];

export default class ImagePortal extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClose() {
        if (utils.isFunction(this.props.onClose)) {
            this.props.onClose()
        }
    }

    render() {
        let randInx = _.random(transitions.length - 1)
        const transition = {
            animation: transitions[randInx],
            duration: 800
        }
        return (
            <div>
                <TransitionablePortal  transition={transition} onClose={() => this.handleClose() } open={this.props.open}>
                    <Segment
                        style={{ left: '40%', position: 'fixed', top: '20%', zIndex: 1000 }}
                    >
                        <Header>{this.props.header}</Header>
                        <Image src={this.props.image} size={this.props.image_size} />
                    </Segment>
                </TransitionablePortal>
            </div>
        )
    }
}

ImagePortal.defaultProps = {
    open: false,
    header: "empty header",
    image_size: "small"
}

ImagePortal.propTypes = {
    image: PropTypes.string.isRequired
}
