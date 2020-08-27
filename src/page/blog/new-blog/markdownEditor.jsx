import React from "react"
import MarkdownEditor from '@uiw/react-markdown-editor';

import "./index.scss"


class MyMarkdownEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: ""
        }
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    updateMarkDown(editor, data, value) {
        this.setState({
            data: value
        }, () => {
            if (this.props.onChange) {
                this.props.onChange(this.state.data)
            }
        })
    }

    getData() {
        return this.state.data
    }

    render() {
        return (
            <MarkdownEditor
                className={"myeditor"}
                value={this.props.data }
                onChange={(editor, data,value) => this.updateMarkDown(editor, data, value)}
            />
        )
    }
}

export default MyMarkdownEditor