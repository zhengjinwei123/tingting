import React from "react"
import {Card, Button, Icon, Label, Image} from "semantic-ui-react";
import utils from "utils/utils.jsx"

import ImagePortal from "component/image-portal/index.jsx";

import "./index.scss"

class PubViewRightBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            show_wx : false,
            show_zf: false
        }
    }

    onClickAddFriend() {
        this.setState({
            show_zf: false,
            show_wx: !this.state.show_wx
        })
    }

    onClickZF() {
        this.setState({
            show_wx: false,
            show_zf: !this.state.show_zf
        })
    }

    onClosePotal(type) {

        if (type === "wx") {
            this.setState({
                show_wx: false
            })
        } else {
            this.setState({
                show_zf: false
            })
        }

    }

    render() {
        return (
            <div className={this.props.className}>
                <Card
                    raised={true}
                    centered={true}
                    fluid={true}
                >
                    <Image src={utils.imageHost("user-man.jpg")} wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>
                            小小玮
                        </Card.Header>
                        <Card.Meta>
                            <span className='date'>博主</span>
                        </Card.Meta>
                        <Card.Description>
                            屌丝一枚
                        </Card.Description>
                        <Card.Content extra textAlign={"center"}>
                            <Button as='div' labelPosition='right' onClick={() => this.onClickAddFriend() }>
                                <Button icon='weixin' circular color={"green"} />
                                <Label as='a' basic color='green' pointing='left'>
                                    加好友
                                </Label>
                            </Button>

                            <Button as='div' labelPosition='left' onClick={() => this.onClickZF()}>
                                <Label as='a' basic color='blue' pointing='right'>
                                    请他喝茶
                                </Label>
                                <Button icon='weixin' circular color={"blue"} />
                            </Button>
                        </Card.Content>

                    </Card.Content>
                </Card>

                <ImagePortal image_size="large" image={utils.imageHost("wx.jpg")} open={this.state.show_wx} header={"微信扫码加好友"} onClose={() => this.onClosePotal('wx')}/>
                <ImagePortal image_size="large" image={utils.imageHost("wx_zf.jpg")} open={this.state.show_zf} header={"微信扫码请他喝茶"} onClose={() => this.onClosePotal('zf')}/>
            </div>
        )
    }
}

export default PubViewRightBar