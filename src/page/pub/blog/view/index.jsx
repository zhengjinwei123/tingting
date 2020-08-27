import React from "react"

import PubViewHeader from "page/pub/blog/header/index.jsx"
import NotFoundPage from "page/notfound/index.jsx"

import utils from "utils/utils.jsx"
import blogService from "service/blog.jsx"

import BraftEditor from 'braft-editor'
import 'braft-editor/dist/output.css'

import ReactMarkdown from "react-markdown"
import CodeBlock  from "page/pub/blog/view/codeBlock.jsx";

import "./index.scss"


class PubBlogView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
            type: 0,
            editor: null,
            not_found: false
        }
    }

    componentDidMount() {

        blogService.getBlog(this.props.match.params.blog_id).then(res => {
            if (res.type === 1) {
                this.setState({
                    editor:  BraftEditor.createEditorState(res.content)
                })
            }

            this.setState({
                content: res.content,
                type: res.type
            })

        }, err => {
            this.setState({
                not_found: true
            })
        })
    }

    isPageNotFound() {
        return this.state.not_found
    }

    isMarkdown() {
        return this.state.type === 2
    }

    isReady() {
        return this.state.type !== 0
    }

    render() {
        let html = "";

        if (this.isPageNotFound()) {
            return (
                <div>
                    <NotFoundPage />
                </div>
            )
        }

        if (this.isReady()) {
            if (this.isMarkdown()) {
                html = this.state.content.replace(/<br\s*\/?>/g, '\n');
            }
        } else {
            return (
                <div>
                </div>
            )
        }

        return (
            <div>
                <PubViewHeader />
                <div className={"container"} id="zjw">
                    {
                        this.isMarkdown() ?  <ReactMarkdown
                                source={html}
                                escapeHtml={false}
                                renderers={{
                                    code: CodeBlock,
                                }}
                            />
                            :
                            <BraftEditor
                                stripPastedStyles={true}
                                contentClassName={"braft-content"}
                                readOnly={true}
                                controls={[]}
                                value={this.state.editor}
                            />

                    }
                </div>
            </div>
        )
    }
}


export default PubBlogView