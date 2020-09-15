import React from "react"

import {List, Image, Divider} from 'semantic-ui-react'

import utils from "utils/utils.jsx"

export default class AuthorCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
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
                ]
            }
        }
    }

    componentWillUnmount() {
        this.setState = ()=>false;
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
                                <Image avatar src={utils.imageHost('user-f.jpg')} />
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
            </div>
        )
    }
}