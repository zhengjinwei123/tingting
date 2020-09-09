import React from "react"

import PubViewHeader from "page/pub/header/index.jsx"
import NotFoundPage from "page/notfound/index.jsx"
import blogService from "service/blog.jsx"
import PubViewLeftBar from "page/pub/blog/leftbar/index.jsx"
import PubViewRightBar from "page/pub/blog/rightbar/index.jsx";

import {Message, Header, Segment, Label, Icon, Image, Button,Popup, Advertisement} from 'semantic-ui-react'

import BraftEditor from 'braft-editor'
import 'braft-editor/dist/output.css'

import ReactMarkdown from "react-markdown"
import CodeBlock  from "page/pub/blog/view/codeBlock.jsx";

import utils from  "utils/utils.jsx"

import "../index.scss"
import $ from "jquery";
import ProfileCard from "component/profilecard/index.jsx";
import TopAdvert from "page/pub/topadvert/index.jsx";



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
            not_found: false,

            clientInnerWidth: 0,
            show_profile: true,

            show_nav_btn: false
        }

        this.scrollIntervalTimer = 0;
    }

    componentWillUnmount() {
        this.setState = ()=>false;
    }

    handleResize(e) {
        this.setState({
            clientInnerWidth: e.target.innerWidth
        })
    }

    handleScroll() {

        let scrollt = document.documentElement.scrollTop + document.body.scrollTop;

        if (scrollt > 100) {
            this.setState({
                show_nav_btn: true,
                show_profile: false,
            })
        } else {
            this.setState({
                show_nav_btn: false,
                show_profile: true
            })
        }
    }

    backTop() {

        this.scrollIntervalTimer = setInterval(() => {
            if (document.documentElement.scrollTop > 0) {
                document.documentElement.scrollTop -= 50
            } else {
                clearInterval(this.scrollIntervalTimer)
                this.setState({
                    show_profile: true
                })
            }
        }, 10)
    }

    componentWillMount() {
        window.addEventListener("scroll", this.handleScroll.bind(this), true)
    }

    componentDidMount() {
        this.setState({
            clientInnerWidth : document.documentElement.clientWidth
        })
        window.addEventListener('resize', this.handleResize.bind(this)) //监听窗口大小改变

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

    onCloseProfile(show) {
        this.setState({
            show_profile: show
        })
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
                <div className={"container-fluid"}>
                    <div className={"article-container"}>

                        <TopAdvert className={"top-advert"} />

                        <Segment padded>
                            <Label attached='top' className={"article-header "}>
                                <Header as='h2'>
                                    {this.state.article_name}
                                    <div className={"float-right"}>
                                        <Label as='a' color='blue'>
                                            <Icon name={"sitemap"}/>分类: {this.state.article_cls}
                                        </Label>
                                        <Label as='a' color='orange'>
                                            <Icon name={"bookmark"}/>作者:{this.state.author}
                                        </Label>
                                    </div>

                                </Header>
                            </Label>
                            <div>
                                <Label as='a' color='orange' ribbon>
                                    <Icon name={"clock outline"}/>{this.state.publish_tm} 发布
                                </Label>
                                <Label as='a' color='red' tag>
                                    <Icon name={"clock"}/>{this.state.update_tm} 更新
                                </Label>
                                <Label as='a' color='blue'>
                                    <Icon name={"eye"}/>{400} 阅读
                                </Label>
                            </div>


                            <Message>
                                {
                                    this.isMarkdown() ?
                                        <ReactMarkdown
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
                            </Message>
                        </Segment>
                    </div>
                    {
                        !this.state.show_profile ?
                            <Popup content={"作者信息"}
                                   trigger={<Button className={"profile-btn"}  circular icon='heart' color={"pink"} onClick={() => this.onCloseProfile(true)}/>} /> :
                            <ProfileCard
                                author={this.state.author} className={"profile-container"} onClose={() => this.onCloseProfile(false)} />
                    }

                    {
                        this.state.show_nav_btn ?
                            <Popup content='返回顶部'
                                   trigger={ <Button className={"back-top-nav"}  circular icon='angle double up' color={"blue"} onClick={() => this.backTop()}/> } />
                            : ""
                    }

                    <div className={"advert-container"}>

                    </div>
                </div>
            </div>
        )
    }
}


export default PubBlogView