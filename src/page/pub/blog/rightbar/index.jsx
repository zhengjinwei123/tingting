import React from "react"
import { Tab , Transition , Button,Icon} from 'semantic-ui-react'

import AuthorCard from "page/pub/blog/authorcard";


import "./index.scss"

class PubViewRightBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            clientInnerWidth: 0,
            show_top_btn: false,
            blog_links_html: "",

            isScrollNow: false,

            menuData: [], // 用来存储目录结构
            menuState: '' // 用来存储当前命中的标题
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            visible: nextProps.visible
        })
    }

    onToggle() {
        this.props.toggle();
    }


    handleResize(e) {
        this.setState({
            clientInnerWidth: e.target.innerWidth
        })
    }

    setTopBtn(visible) {
        this.setState({
            show_top_btn: visible
        })
    }

    handleScroll() {
        if (document.documentElement.scrollTop > 50) {
            this.setTopBtn(true);
        } else {
            this.setTopBtn(false);
        }

        this.checkMenuScroll();
    }

    backTop() {

        this.scrollIntervalTimer = window.setInterval(() => {
            if (document.documentElement.scrollTop > 0) {
                document.documentElement.scrollTop -= 50
            } else {
                window.clearInterval(this.scrollIntervalTimer)
                this.setTopBtn(false);
            }
        }, 10)
    }

    componentWillMount() {
        window.addEventListener("scroll", this.handleScroll.bind(this), true)
    }


    // 检测页面滚动函数
    checkMenuScroll() {
        if (!this.state.menuData.length) {
            return;
        }
        let markdownRef =  document.documentElement;//this.props.getMarkdownRef();
        let scrollTop = markdownRef.scrollTop; // 获取当前页面的滚动距离
        let menuState = this.state.menuData[0].txt; // 设置menuState对象默认值为第一个标题的文字

        // 对menuData循环检测，
        // 如果当前页面滚动距离 大于 一个标题离页面顶部 的距离，则将该标题的文字赋值给menuState，循环继续
        // 如果当前页面滚动距离 小于 一个标题离页面顶部 的距离，说明页面还没滚动到该标题的位置，当前标题尚未命中，之后的标题也不可能命中。 循环结束
        for (let item of this.state.menuData) {
            if (scrollTop >= item.offsetTop) {
                menuState = item.txt;
            } else {
                break;
            }
        }

        // 如果滑动到了页面的底部，则命中最后一个标题
        if (markdownRef.clientHeight + scrollTop === markdownRef.scrollHeight) {
            menuState = this.state.menuData[this.state.menuData.length - 1].txt;
        }

        // 如果当前命中标题和前一个命中标题的文本不一样，说明当前页面处于其他标题下的内容，切换menuState
        if (menuState !== this.state.menuState) {
            this.setState({menuState});
        }
    }

    getAPs(nodeArr) {
        let nodeInfo = []; // 存储目录信息

        let markdownRef =  this.props.getMarkdownRef();
        if (markdownRef) {
            markdownRef.childNodes.forEach((item)=> {
                if (nodeArr.includes(item.nodeName)) {
                    let item1 = {
                        type: item.nodeName,
                        txt: item.getAttribute('id'),
                        offsetTop: item.offsetTop
                    }
                    nodeInfo.push(item1)
                }
            })

            if (nodeInfo.length) {
                this.setState({
                    menuData: nodeInfo,
                    menuState: nodeInfo[0].txt
                }, () => {
                    this.checkMenuScroll(); // 检测滚动，稍后会讲解
                });
            }

        }
    }

    componentDidMount() {

        this.setState({
            clientInnerWidth : document.documentElement.clientWidth
        })
        window.addEventListener('resize', this.handleResize.bind(this)) //监听窗口大小改变

        setTimeout(() => {
            this.getAPs(['H1', 'H2', 'H3', 'H4']);

        }, 1000)
    }

    // 点击目录切换
    scrollPage(item) {
        if (this.state.isScrollNow) {
            return;
        }
        this.setState({
            isScrollNow: true
        })
        let markdownRef =  document.documentElement;//this.props.getMarkdownRef();
        // 创建一个setInterval，每16ms执行一次，接近60fps

        let scrollToTop = window.setInterval(() => {
            let currentScroll = markdownRef.scrollTop ;
            console.log("aaa", currentScroll, item.offsetTop)

            if (currentScroll > item.offsetTop) {
                // 当页面向上滚动时操作
                console.log("bbb")
                markdownRef.scrollTo(0, currentScroll - Math.ceil((currentScroll - item.offsetTop) / 5));
            } else if (currentScroll < item.offsetTop) {
                // 页面向下滚动时的操作
                console.log("ccc")
                if (markdownRef.clientHeight + currentScroll >= markdownRef.scrollHeight) {
                    // 如果已经滚动到了底部，则直接跳出
                    console.log("dddd")
                    this.setState({menuState: item.txt, isScrollNow: false});
                    window.clearInterval(scrollToTop);
                } else {
                    console.log("eeee")
                    markdownRef.scrollTo(0, currentScroll + Math.ceil((item.offsetTop - currentScroll) / 5));
                }
            } else {
                window.clearInterval(scrollToTop);
                this.setState({isScrollNow: false});
            }
        }, 20);
    }


    render() {

        const panes = [
            {
                menuItem: '站点概览',
                render: () => <Tab.Pane attached={false}>
                    <AuthorCard className={"author-card"} author={this.props.author}/>
                </Tab.Pane>,
            },
            {
                menuItem: '文章目录',
                render: () => <Tab.Pane  attached={false}>
                    <section>
                        <ul>
                            {
                                this.state.menuData.map((item, idx) => {
                                    return (
                                        <li className={`${item.type}type`} key={idx} onClick={()=>this.scrollPage(item)}>
                                            <a className={this.state.menuState === item.txt ? 'on' : ''}>
                                                {item.txt}
                                            </a>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </section>
                </Tab.Pane>
            }
        ]
        // dangerouslySetInnerHTML={{__html: this.state.blog_links_html}}
        const { visible } = this.state

        let visible_icon = visible ? 'angle double right' : 'align justify'
        let to_top_icon = 'arrow up';
        return (
            <div>
                <Transition duration={this.props.duration} visible={visible} animation={"fly left"}>
                    <div className={"advert-container"}>
                        <Tab menu={{ secondary: true, color: "violet"}} panes={panes} />
                    </div>
                </Transition>

                <div className="guide-container">
                    <Button icon onClick={() => this.onToggle()}>
                        <Icon name={visible_icon} />
                    </Button>

                    {
                        this.state.show_top_btn ?
                            <Button icon onClick={() => this.backTop()}>
                                <Icon name={to_top_icon} />
                            </Button> : ""
                    }

                </div>
            </div>
        )
    }
}

export default PubViewRightBar