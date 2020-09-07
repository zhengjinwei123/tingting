import React from "react"

import PubViewHeader from "page/pub/header/index.jsx"
import NotFoundPage from "page/notfound/index.jsx"
import blogService from "service/blog.jsx"
import PubViewLeftBar from "page/pub/blog/leftbar/index.jsx"
import PubViewRightBar from "page/pub/blog/rightbar/index.jsx";

import { Message, Header, Segment, Label } from 'semantic-ui-react'

import BraftEditor from 'braft-editor'
import 'braft-editor/dist/output.css'

import ReactMarkdown from "react-markdown"
import CodeBlock  from "page/pub/blog/view/codeBlock.jsx";

import utils from  "utils/utils.jsx"

import "../index.scss"


class PubBlogView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
            type: 0,
            author: "",
            article_name: "",
            article_cls : "",
            publish_tm : 0,
            update_tm : "",

            editor: null,
            not_found: false
        }
    }

    componentDidMount() {

        blogService.getBlog(this.props.match.params.blog_id).then(res => {
            console.log("blog", res)
            if (res.type === 1) {
                this.setState({
                    editor:  BraftEditor.createEditorState(res.content)
                })
            }

            this.setState({
                content: res.content,
                type: res.type,
                author: res.username,
                article_name: res.article_name,
                article_cls: res.article_cls,
                publish_tm: utils.formatDate(res.publish_tm),
                update_tm : res.update_tm
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
            <div className={"container-fluid justify-content-md-center"}>
                <PubViewHeader />

                <div className={"article-container"}>
                    <Segment padded>
                        <Label attached='top' className={"article-header "}>
                            <Header as='h2'>
                                {this.state.article_name}
                                <div className={"float-right"}>
                                    <Label as='a' color='blue'>
                                        分类: {this.state.article_cls}
                                    </Label>
                                    <Label as='a' color='orange'>
                                        作者:{this.state.author}
                                    </Label>
                                </div>

                            </Header>
                        </Label>
                        <div>
                            <Label as='a' color='orange' ribbon>
                                {this.state.publish_tm} 发布
                            </Label>
                            <Label as='a' color='red'>
                               {this.state.update_tm} 更新
                            </Label>
                        </div>

                        <Message>
                            {
                                this.isMarkdown() ?  <ReactMarkdown
                                        source={html}
                                        escapeHtml={true}
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
                        </Message>
                    </Segment>

                </div>

            </div>
        )
    }
}


export default PubBlogView