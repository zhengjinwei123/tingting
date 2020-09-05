import React from "react";
import { Link } from 'react-router-dom';
import { Header, Segment } from 'semantic-ui-react'

import './index.scss'
import PageTitle from "component/pagetitle/index.jsx";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userCount : '100',
            resCount: '120',
            gameCount: '110',
            moneyCount: 10000000,
            publishBlogCount: 101,
        }
    }

    render() {
        const square = { width: 175, height: 175 }

        return (
            <PageTitle title="首页">
                <div className={"color-box"}>
                    <Link to="#">
                        <Segment circular style={square} inverted color={"teal"} >
                            <Header as='h2'>
                                用户总数!
                                <Header.Subheader>{this.state.userCount}</Header.Subheader>
                            </Header>
                        </Segment>
                    </Link>

                </div>

                <div className={"color-box"}>
                    <Link to="#">
                        <Segment circular style={square} inverted color={"yellow"}>
                            <Header as='h2'>
                                资源总数
                                <Header.Subheader>{this.state.resCount}</Header.Subheader>
                            </Header>
                        </Segment>
                    </Link>
                </div>

                <div className={"color-box"}>
                    <Link to="#">
                        <Segment circular style={square} inverted color={"olive"}>
                            <Header as='h2'>
                                游戏总数
                                <Header.Subheader>{this.state.gameCount}</Header.Subheader>
                            </Header>
                        </Segment>
                    </Link>
                </div>
                <div className={"color-box"}>
                    <Link to="#">
                        <Segment circular style={square} inverted color={"violet"}>
                            <Header as='h2'>
                                总收入
                                <Header.Subheader>{this.state.moneyCount} 元</Header.Subheader>
                            </Header>
                        </Segment>
                    </Link>
                </div>

                <div className={"color-box"}>
                    <Link to="#">
                        <Segment circular style={square} inverted color={"green"}>
                            <Header as='h2'>
                                发布博客总数
                                <Header.Subheader>{this.state.publishBlogCount}</Header.Subheader>
                            </Header>
                        </Segment>
                    </Link>
                </div>
            </PageTitle>
        )
    }
}

export default Home;