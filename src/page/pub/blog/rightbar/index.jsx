import React from "react"
import {Card, Button, Icon, Label, Image} from "semantic-ui-react";
import utils from "utils/utils.jsx"

import "./index.scss"

class PubViewRightBar extends React.Component {

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
                            <Button as='div' labelPosition='right'>
                                <Button icon='weixin' circular color={"green"} />
                                <Label as='a' basic color='green' pointing='left'>
                                    加好友
                                </Label>
                            </Button>

                            <Button as='div' labelPosition='left'>
                                <Label as='a' basic color='blue' pointing='right'>
                                    请他喝茶
                                </Label>
                                <Button icon='money' circular color={"blue"} />
                            </Button>
                        </Card.Content>

                    </Card.Content>
                </Card>

            </div>
        )
    }
}

export default PubViewRightBar