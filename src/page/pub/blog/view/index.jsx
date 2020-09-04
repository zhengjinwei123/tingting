import React from "react"

import PubViewHeader from "page/pub/header/index.jsx"
import NotFoundPage from "page/notfound/index.jsx"
import blogService from "service/blog.jsx"
import PubViewLeftBar from "page/pub/blog/leftbar/index.jsx"
import PubViewRightBar from "page/pub/blog/rightbar/index.jsx";

import BraftEditor from 'braft-editor'
import 'braft-editor/dist/output.css'

import ReactMarkdown from "react-markdown"
import CodeBlock  from "page/pub/blog/view/codeBlock.jsx";

import "../index.scss"


class PubBlogView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
            type: 0,
            author: "",
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
                type: res.type,
                author: res.username
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
                <div className={"blog-view-container"}>
                    <PubViewLeftBar className={"left-bar float-left"}/>
                    <div className={"container float-left"} id="zjw">
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
                    <PubViewRightBar className={"right-bar float-right"} author={this.state.author}/>
                </div>
            </div>
        )
    }
}


export default PubBlogView