import React from "react"

import {List, Image, Divider, Button, Popup} from 'semantic-ui-react'

import utils from "utils/utils.jsx"
import ProfileCard from "component/profilecard";

const style = {
    borderRadius: 0,
    opacity: 0.7,
    padding: '2em',
}

import "./index.scss"

export default class AuthorCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            show_profile: false,

            card_info: {
                nickname: "小小玮", //昵称
                web_age: 0, //价龄
                data : [
                    {
                        desc: "原创",
                        value: 0
                    },
                    {
                        desc: "排名",
                        value: 0
                    },
                    {
                        desc: "访问",
                        value: 0
                    },
                    {
                        desc: "等级",
                        value: 0
                    },
                    {
                        desc: "积分",
                        value: 0
                    },
                    {
                        desc: "粉丝",
                        value: 0
                    },
                    {
                        desc: "获赞",
                        value: 0
                    },
                    {
                        desc: "评论",
                        value: 0
                    },
                    {
                        desc: "",
                        value:   <Popup content={"点击前往博主的github"} trigger={<Button circular color='twitter' icon='github' />} />
                    },
                    {
                        desc: "",
                        value: <Popup content={"博主信息"} trigger={<Button onClick={() => this.openCard(true)} circular color='facebook' icon='info' />} />
                    },
                ]
            }
        }
    }

    componentWillUnmount() {
        this.setState = ()=>false;
    }

    openCard(close) {
        this.setState({
            show_profile: close !== undefined ? close : !this.state.show_profile
        })
    }


    render() {

        let data = [];
        for (let i = 0 ;i < this.state.card_info.data.length; i++) {
            let t = parseInt(i / 6)
            data[t] =  data[t] || [];
            data[t].push(this.state.card_info.data[i])
        }

        return (
            <div className={this.props.className}>
                <List>
                    <List.Item>
                        <List horizontal>
                            <List.Item>

                                <Popup content={"请喝茶"}
                                       inverted
                                       on={"hover"}
                                       style={style}
                                       onOpen={() => this.openCard()}
                                       trigger={<Image avatar size={"mini"} src={utils.imageHost('user-f.jpg')} onClick={() => this.openCard(true)}/>} />

                                <List.Content>
                                    <List.Header>{this.state.card_info.nickname}</List.Header>
                                    码龄 {this.state.card_info.web_age}
                                </List.Content>
                            </List.Item>
                        </List>
                    </List.Item>

                    {
                        data.map((v, idx) => {
                            return (
                                <List.Item key={idx}>
                                    <List horizontal>
                                        {
                                            v.map((vv, index ) => {
                                                return (
                                                    <List.Item key={index}>
                                                        <List.Content>
                                                            <List.Header>{vv.value}</List.Header>
                                                            {vv.desc}
                                                        </List.Content>
                                                    </List.Item>
                                                )
                                            })
                                        }
                                    </List>
                                    {
                                        data[idx+1] ?   <Divider /> : ""
                                    }
                                </List.Item>
                            )
                        })
                    }
                </List>

                {
                    this.state.show_profile ?
                        <ProfileCard
                            author={this.props.author} className={"profile-container"} onClose={() => this.openCard(false)} /> : ""
                }

            </div>
        )
    }
}