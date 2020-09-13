import React from "react"
import {withRouter} from "react-router-dom";
import { Button, Search, List, Transition, Label, Popup, Icon} from 'semantic-ui-react'

import RegistUser from "page/pub/register-user/index.jsx";

import $ from "jquery"
import utils from "utils/utils.jsx"
import "./index.scss"
import userService from "service/user.jsx";


const transitions = [
    "fly left",
    "fly right"
]

let timerId = 0;

class PubViewHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show_register_modal: false,
            visible: false,
            transitions_index: 0,

            out_links: [
                {
                    color: "black",
                    pop: "点击前往Github首页",
                    icon: "github alternate",
                    link: "https://github.com/zhengjinwei123"
                },
                {
                    color: "black",
                    pop: "点击前往fork代码",
                    icon: "share alternate",
                    link: "https://github.com/zhengjinwei123/tingting"
                },
                {
                    color: "black",
                    pop: "点击前往管理后台",
                    icon: "tachometer alternate",
                    link: "/admin",
                    show: userService.checkUserHasLogin()
                },
                {
                    color: "grey",
                    pop: "注册",
                    icon: "sign-in",
                    link: "register-user",
                    show: !userService.checkUserHasLogin()
                },
                {
                    color: "green",
                    pop: "登录",
                    icon: "sign-out",
                    link: "/admin/login",
                    show: !userService.checkUserHasLogin()
                },
                {
                    color: "red",
                    pop: "下线",
                    icon: "sign-out",
                    link: "logout",
                    show: userService.checkUserHasLogin()
                },
            ]

        }
        // timerId = setInterval(() => {
        //     this.setState({
        //         visible: !this.state.visible,
        //         transitions_index: this.state.transitions_index === 0 ? 1 : 0
        //     })
        // }, 2000)
    }

    showRegisterModal(show) {
        this.setState({
            show_register_modal: show
        })
    }

    componentWillUnmount() {
        if (timerId) {
            clearInterval(timerId)
        }
        this.setState = ()=>false;
    }

    handleSearchChange() {

    }

    onResultSelect(e, data) {

    }

    onLogout() {
        userService.logout().then((data) => {
            userService.setUserLogout()
            this.props.menuActions.menuInit({})

            window.location.reload();
            // utils.redirect(window.location.pathname);

        })
    }

    onRightBtnClick(t) {
        if (t === "register-user") {
            this.showRegisterModal(true)
            return;
        }
        if (t === "logout") {
            this.onLogout()
            return;
        }

        window.location.href = t;
    }


    onClickPubHome() {
        window.location.href = '/?redirect=' + encodeURIComponent(window.location.pathname);
    }

    render() {

        console.log("fuck you")
        const windowWidth = $(window).width();

        let transition_label_width = "big"
        if (windowWidth <= 768) {
            transition_label_width = "small"
        }

        return (
            <div>
                <nav className={"view-top-bar"}>
                    <div className={"left-block"}>
                        <Popup content='点击前往首页' trigger={
                            <Button  primary className={"float-left"} circular icon='home' onClick={() => this.onClickPubHome() }/>
                        } />

                        <Search
                            className={"mySearch"}
                            loading={false}
                            onResultSelect={(e, data) => this.onResultSelect(e, data)}
                            onSearchChange={() => this.handleSearchChange()}
                            results={[]}
                            value={""}
                        />
                    </div>
                    <div className={"center-block"}>
                        {/*<Transition*/}
                        {/*    animation={transitions[this.state.transitions_index]}*/}
                        {/*    duration={800}*/}
                        {/*    visible={this.state.visible}*/}
                        {/*>*/}

                        {/*    <Label as={"a"} image size={transition_label_width}>*/}
                        {/*        <img src={utils.imageHost("home.jpg")} />*/}
                        {/*        价值空间，充分挖掘自己的价值*/}
                        {/*    </Label>*/}
                        {/*</Transition>*/}


                    </div>

                    <div className={"right-block"}>
                        <List divided horizontal size={"big"}>
                            {
                                this.state.out_links.map((v, idx) => {

                                    if (v.show === undefined || v.show === true) {
                                        return (
                                            <List.Item key={idx}>
                                                <List.Content>
                                                    <List.Header>
                                                        <Popup content={v.pop} trigger={
                                                            <Button color={v.color}  circular icon={<Icon name={v.icon} size={"large"} />}
                                                                    onClick={() => this.onRightBtnClick(v.link)} />
                                                        } />

                                                    </List.Header>
                                                </List.Content>
                                            </List.Item>
                                        )
                                    }

                                })
                            }
                        </List>

                    </div>
                    <RegistUser show={this.state.show_register_modal} onClose={() => this.showRegisterModal(false)}/>
                </nav>
                { this.props.children }
            </div>
        )
    }
}

export default withRouter(PubViewHeader)