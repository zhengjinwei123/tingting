import React from "react";
import { Image, Card, Button } from 'semantic-ui-react'
import {withRouter} from "react-router-dom";
import "./index.scss"

import utils from "utils/utils.jsx"

class NotFoundPage extends React.Component {
    constructor(props) {
        super(props);
    }

    onClickLastPage() {
        this.props.history.goBack();
    }

    onClickHomePage() {
        window.location.href = '/?redirect=' + encodeURIComponent(window.location.pathname);
    }

    render() {

        let timgImage = utils.imageHost("timg.gif")
        return (
            <Card centered={true} raised={true} className={"pannel-center"}>
                <Image src={timgImage} />
                <Card.Content>
                    <Card.Header>页面没找到</Card.Header>
                    <Card.Meta>
                        <span className='date'>404 NOT FOUND</span>
                    </Card.Meta>
                    <Card.Description>

                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button basic color='green' onClick={() => this.onClickHomePage()}>
                            返回主页
                        </Button>
                        <Button basic color='red' onClick={() => this.onClickLastPage()}>
                            返回上一页
                        </Button>
                    </div>
                </Card.Content>
            </Card>
        )
    }
}

export default withRouter(NotFoundPage);