import React from "react"
import { Button, Search, List, Transition, Label, Image} from 'semantic-ui-react'


import utils from "utils/utils.jsx"
import "./index.scss"

const transitions = [
    "fly left",
    "fly right"
]

class PubViewHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            transitions_index: 0,

        }
        setInterval(() => {
            this.setState({
                visible: !this.state.visible,
                transitions_index: this.state.transitions_index === 0 ? 1 : 0
            })
        }, 2000)
    }

    handleSearchChange() {

    }

    onResultSelect(e, data) {

    }

    onRightBtnClick(t) {
        console.log(t)
    }

    onClickPubHome() {
        window.location.href = '/?redirect=' + encodeURIComponent(window.location.pathname);
    }

    render() {
        return (
            <div className={"view-top-bar"}>
                <div className={"left-block"}>
                    <Button  primary className={"float-left"} circular icon='home' onClick={() => this.onClickPubHome() }/>
                    <Search
                        className={"float-left"}
                        loading={false}
                        onResultSelect={(e, data) => this.onResultSelect(e, data)}
                        onSearchChange={() => this.handleSearchChange()}
                        results={[]}
                        value={""}
                    />
                </div>
                <div className={"center-block"}>
                    <Transition
                        animation={transitions[this.state.transitions_index]}
                        duration={800}
                        visible={this.state.visible}
                    >

                        <Label as='a' image size={"big"}>
                            <img src={utils.imageHost("home.jpg")} />
                            价值空间，充分挖掘自己的价值
                        </Label>
                    </Transition>


                </div>

                <div className={"right-block"}>
                    <List divided horizontal size={"big"}>
                        <List.Item>
                            <List.Content>
                                <List.Header>
                                    <Label as='a' color={"teal"} image onClick={() => this.onRightBtnClick("github")}>
                                        <img src={utils.imageHost("github.jpg")} />
                                        Github
                                    </Label>
                                </List.Header>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                <List.Header>
                                    <Label as='a' color={"teal"} image onClick={() => this.onRightBtnClick("csdn") }>
                                        <img src={utils.imageHost("csdn.jpg")} />
                                        CSDN
                                    </Label>
                                </List.Header>
                            </List.Content>
                        </List.Item>
                    </List>

                </div>
            </div>
        )
    }
}

export default PubViewHeader