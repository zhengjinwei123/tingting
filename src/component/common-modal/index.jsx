import React  from 'react';

import { Dimmer, Loader, Segment } from 'semantic-ui-react'

export default class CommonModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            show: false
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            show: nextProps.show
        })
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
                            <Dimmer active  page={true}>
                                {/*<Loader size='large'>loading</Loader>*/}
                                {this.props.children}
                            </Dimmer>

                            {/*{this.props.children}*/}

                        </Segment> : ""
                }
            </div>
        )
    }
}
