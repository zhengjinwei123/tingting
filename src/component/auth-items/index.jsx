import React from "react";
import PropTypes from "prop-types"
import { Checkbox, Item, Icon, Container } from  "semantic-ui-react"

import "./index.scss"

class AuthItems extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        console.log("zjw:", this.props)
    }

    onMenuChange(e, checked, value) {
        console.log("onMenuChange", checked, value)
    }

    render() {

        return (
            <Container className={"group-pannel-container"}>
                <Item.Group divided>
                    <Item>
                        <Item.Content verticalAlign='middle'>

                            <p>菜单<Icon name="angle double down" size='big'/><Checkbox label='全选' className={ "check-box "}/></p>
                            {
                                this.props.menus.map((item, idx) => {
                                    return (
                                        <Checkbox
                                            label={item.desc}
                                            key={idx}
                                            value={item.id}
                                            className={ "check-box "}
                                            onChange={(e, {checked, value}) => { this.onMenuChange(e, checked, value)} }/>
                                        )

                                })
                            }

                        </Item.Content>

                    </Item>
                    <Item>
                        <Item.Content verticalAlign='middle'>
                            <p>菜单<Icon name="angle double down" size='big'/></p>
                            <Checkbox label='Make my profile visible' className={ "check-box "}/>
                            <Checkbox label='Make my profile visible' className={ "check-box "}/>
                            <Checkbox label='Make my profile visible' className={ "check-box "}/>
                            <Checkbox label='Make my profile visible' className={ "check-box "}/>
                            <Checkbox label='Make my profile visible' className={ "check-box "}/>
                            <Checkbox label='Make my profile visible' className={ "check-box "}/>
                            <Checkbox label='Make my profile visible' className={ "check-box "}/>
                            <Checkbox label='Make my profile visible' className={ "check-box "}/>
                            <Checkbox label='Make my profile visible' className={ "check-box "}/>
                            <Checkbox label='Make my profile visible' className={ "check-box "}/>
                            <Checkbox label='Make my profile visible' className={ "check-box "}/>
                            <Checkbox label='Make my profile visible' className={ "check-box "}/>
                            <Checkbox label='Make my profile visible' className={ "check-box "}/>
                        </Item.Content>
                    </Item>

                    <Item>
                        <Item.Content verticalAlign='middle'>
                            <p>菜单<Icon name="angle double down" size='big'/></p>
                            <Checkbox label='Make my profile visible' className={ "check-box "}/>
                            <Checkbox label='Make my profile visible' className={ "check-box "}/>
                            <Checkbox label='Make my profile visible' className={ "check-box "}/>
                            <Checkbox label='Make my profile visible' className={ "check-box "}/>
                            <Checkbox label='Make my profile visible' className={ "check-box "}/>
                            <Checkbox label='Make my profile visible' className={ "check-box "}/>
                            <Checkbox label='Make my profile visible' className={ "check-box "}/>
                            <Checkbox label='Make my profile visible' className={ "check-box "}/>
                            <Checkbox label='Make my profile visible' className={ "check-box "}/>
                            <Checkbox label='Make my profile visible' className={ "check-box "}/>
                            <Checkbox label='Make my profile visible' className={ "check-box "}/>
                            <Checkbox label='Make my profile visible' className={ "check-box "}/>
                            <Checkbox label='Make my profile visible' className={ "check-box "}/>
                            <Checkbox label='Make my profile visible' className={ "check-box "}/>
                            <Checkbox label='Make my profile visible' className={ "check-box "}/>
                            <Checkbox label='Make my profile visible' className={ "check-box "}/>
                            <Checkbox label='Make my profile visible' className={ "check-box "}/>
                            <Checkbox label='Make my profile visible' className={ "check-box "}/>
                            <Checkbox label='Make my profile visible' className={ "check-box "}/>
                            <Checkbox label='Make my profile visible' className={ "check-box "}/>
                            <Checkbox label='Make my profile visible' className={ "check-box "}/>
                            <Checkbox label='Make my profile visible' className={ "check-box "}/>
                        </Item.Content>
                    </Item>
                </Item.Group>

            </Container>
        )
    }
}

AuthItems.defaultProps = {
    menus: [],
    auths: {}
}

AuthItems.propTypes = {
    menus: PropTypes.array.isRequired,
    auths: PropTypes.object.isRequired,
}

export default AuthItems;