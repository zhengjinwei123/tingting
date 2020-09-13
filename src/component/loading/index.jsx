import React, { Component } from 'react';
import ReactDOM from "react-dom";

import { Dimmer, Loader, Segment } from 'semantic-ui-react'

class Loading extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            show: false
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

    render() {
        return (
            <div>
                {
                    this.state.show ?
                        <Segment>
                            <Dimmer active inline='centered' page={true}>
                                <Loader size='large'>小码哥正在努力加载...</Loader>
                            </Dimmer>
                        </Segment> : ""
                }
            </div>
        )
    }
}

let div = document.createElement('div');
let props = {

};
document.body.appendChild(div);

let Box = ReactDOM.render(React.createElement(
    Loading,
    props
),div);


export default Box;