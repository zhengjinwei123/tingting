import React from "react";
import { Image, Card, Button } from 'semantic-ui-react'

import "./index.scss"

class NotFoundPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card centered={true} raised={true} className={"pannel-center"}>
                <Image src='http://localhost:9000/images/timg.gif' />
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
                        <Button basic color='green'>
                            返回主页
                        </Button>
                        <Button basic color='red'>
                            返回上一页
                        </Button>
                    </div>
                </Card.Content>
            </Card>

            // <Image src='http://localhost:9000/images/timg.gif' size='small' rounded={true} centered={true}/>
        )
    }
}

export default NotFoundPage;