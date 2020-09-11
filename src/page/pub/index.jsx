import React from "react"
import PubViewHeader from "page/pub/header/index.jsx"

import "./index.scss"

export default class PubHomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {/*<PubViewHeader />*/}
                <div className={"pub-container"}>
                    PubHomePage
                </div>

            </div>
        )
    }
}