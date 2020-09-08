import React from "react"
import {Button, Card, Image, Label} from "semantic-ui-react";
import utils from "utils/utils.jsx";
import ImagePortal from "component/image-portal/index.jsx";

import userService from "service/user.jsx"

export default class ProfileCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show_wx : false,
            show_zf: false,
            show_card: true,

            profile : {
                nickname: "",
                sex: 0,
                userdesc: "",
                wx_image: "",
                zf_image: "",
            }
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

    reload(callback) {
        userService.getProfile(this.props.author, false).then(res => {

            let profile = {
                nickname: res.nickname,
                sex: res.sex,
                userdesc: res.userdesc,
                wx_image: utils.uploadedImageHostByUserName(this.props.author, res.wx_image),
                zf_image: utils.uploadedImageHostByUserName(this.props.author, res.zf_image)
            }
            this.setState({
                profile: profile
            })

            profile.wx_image_name = res.wx_image
            profile.zf_image_name = res.zf_image

            if (callback) callback(profile)
        })
    }

    componentDidMount() {

        if (this.props.onRef) {
            this.props.onRef(this)
        }

       this.reload()
    }

    onClose() {
        this.setState({
            show_card: false
        })

        this.props.onClose();
    }

    render() {
        const profile = this.state.profile;

        if (profile.nickname === "") {
            return (
                <div>

                </div>
            )
        }

        const wx_image = profile.wx_image
        const zf_image = profile.zf_image
        const head_image = profile.sex === 1 ? "user-man.jpg" : "user-f.jpg"

        return (
            <div className={this.props.className}>
                {
                    this.state.show_card ?
                        <Card
                            raised={false}
                            centered={true}
                            fluid={true}
                        >
                            <Image src={utils.imageHost(head_image)} wrapped ui={false}
                                   fluid
                                   label={{ as: 'a', corner: 'right', icon: 'delete', onClick: () => this.onClose()}}
                            />
                            <Card.Content>
                                <Card.Header>
                                    {profile.nickname}
                                </Card.Header>
                                <Card.Meta>
                                    <span className='date'>博主</span>
                                </Card.Meta>
                                <Card.Description>
                                    {profile.userdesc}
                                </Card.Description>
                                <Card.Content extra textAlign={"center"}>
                                    <Button as='div' labelPosition='right' onClick={() => this.onClickAddFriend() }>
                                        <Button icon='weixin' circular color={"green"} />
                                    </Button>

                                    <Button as='div' labelPosition='left' onClick={() => this.onClickZF()}>
                                        <Button icon='weixin' circular color={"blue"} />
                                    </Button>
                                </Card.Content>

                            </Card.Content>
                        </Card> : ""
                }

                <ImagePortal image_size="large" image={wx_image} open={this.state.show_wx} header={"微信扫码加好友"} onClose={() => this.onClosePotal('wx')}/>
                <ImagePortal image_size="large" image={zf_image} open={this.state.show_zf} header={"微信扫码请他喝茶"} onClose={() => this.onClosePotal('zf')}/>
            </div>
        )
    }
}