import React from "react"
import {withRouter} from "react-router-dom";
import { Button, Search, List, Transition, Label, Popup, Icon} from 'semantic-ui-react'

import $ from "jquery"
import utils from "utils/utils.jsx"
import "./index.scss"


const transitions = [
    "fly left",
    "fly right"
]

let timerId = 0;

class PubViewHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            transitions_index: 0,

        }
        timerId = setInterval(() => {
            this.setState({
                visible: !this.state.visible,
                transitions_index: this.state.transitions_index === 0 ? 1 : 0
            })
        }, 2000)
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

    onRightBtnClick(t) {
        console.log(t)
        window.location.href = t;
    }


    onClickPubHome() {
        window.location.href = '/?redirect=' + encodeURIComponent(window.location.pathname);
    }

    render() {

        const windowWidth = $(window).width();

        let transition_label_width = "big"
        if (windowWidth <= 768) {
            transition_label_width = "small"
        }

        return (
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
                        <List.Item>
                            <List.Content>
                                <List.Header>
                                    <Popup content='点击前往Github首页' trigger={
                                        <Button basic color='teal' icon={<Icon name={"github alternate"} size={"large"} />} onClick={() => this.onRightBtnClick("https://github.com/zhengjinwei123")} />
                                    } />

                                </List.Header>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                <List.Header>
                                    <Popup content='点击前往fork代码' trigger={
                                        <Button basic color='teal' icon={<Icon name={"share alternate"} size={"large"} />} onClick={() => this.onRightBtnClick("https://github.com/zhengjinwei123/tingting")} />
                                    } />

                                </List.Header>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                <List.Header>
                                    <Popup content='点击前往管理后台' trigger={
                                        <Button basic color='teal' icon={<Icon name={"tachometer alternate"} size={"large"} />} onClick={() => this.onRightBtnClick("/admin")} />
                                    } />

                                </List.Header>
                            </List.Content>
                        </List.Item>
                    </List>

                </div>
            </nav>
        )
    }
}

export default withRouter(PubViewHeader)