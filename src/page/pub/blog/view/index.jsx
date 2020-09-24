import React from "react"
import NotFoundPage from "page/notfound/index.jsx"
import blogService from "service/blog.jsx"
import {Message, Header, Container, Label, Icon} from 'semantic-ui-react'

import ReactMarkdown from "react-markdown"
import CodeBlock  from "page/pub/blog/view/codeBlock.jsx";
import HeadingBlock from "page/pub/blog/view/headingBlock.jsx";


import TopAdvert from "page/pub/topadvert/index.jsx";

import {withRouter} from "react-router-dom";

import PubViewRightBar from "page/pub/blog/rightbar/index"

import utils from  "utils/utils.jsx"

import "../index.scss"



class PubBlogView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
            type: 0,
            author: "",
            nickname: "",
            article_name: "",
            article_cls : "",
            publish_tm : 0,
            update_tm : "",

            editor: null,
            not_found: false,

            visible_sidebar: false,
        }

        this.scrollIntervalTimer = 0;

        setTimeout(() => {
            this.toggleSideBar()
        }, 1000)
    }

    componentWillUnmount() {
        this.setState = ()=>false;
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
                nickname: res.nickname,
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

    toggleSideBar(status) {
        this.setState({
            visible_sidebar: status !== undefined ? status : !this.state.visible_sidebar
        })
    }

    getMarkdownRef() {
        return this.markdownRef;
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
                    数据加载中....
                </div>
            )
        }

        const visible_sidebar = this.state.visible_sidebar

        let article_container_width_cls_name = !visible_sidebar ? "article-container width-100" : "article-container width-70"

        return (

            <div>
                <div className={"container-fluid"}>
                    <div className={article_container_width_cls_name}>
                        <TopAdvert className={"top-advert"} />
                        <div className={"article-header"}>
                            <Container textAlign='center'>
                                <Header as='h1'>
                                    { this.state.article_name}
                                </Header>
                            </Container>
                            <Container textAlign='center'>
                                <Label as='a' color='blue'>
                                    <Icon name={"sitemap"}/>分类: {this.state.article_cls}
                                </Label>
                                <Label as='a' color='blue'>
                                    <Icon name={"eye"}/>{400} 阅读
                                </Label>
                                <Label as='a' color='orange'>
                                    <Icon name={"clock outline"}/>{this.state.publish_tm} 发布
                                </Label>
                                <Label as='a' color='red'>
                                    <Icon name={"clock"}/>{this.state.update_tm} 更新
                                </Label>
                            </Container>
                        </div>

                        <div  className="markdown-body"  ref={(ref) => {this.markdownRef  = ref}}>
                            <ReactMarkdown
                                source={html}
                                escapeHtml={false}
                                renderers={{
                                    code: CodeBlock,
                                    heading: HeadingBlock
                                }}
                            />
                        </div>

                    </div>

                    <PubViewRightBar duration={1000}
                                     getMarkdownRef={() => this.getMarkdownRef()}
                                     author={this.state.author}
                                     visible={this.state.visible_sidebar}
                                     toggle={() => this.toggleSideBar()}/>

                </div>
            </div>
        )
    }
}


export default withRouter(PubBlogView)