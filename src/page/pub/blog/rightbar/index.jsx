import React from "react"
import ProfileCard from "component/profilecard/index.jsx"

import "./index.scss"

class PubViewRightBar extends React.Component {

    render() {
        return (
            <div className={this.props.className}>
               <ProfileCard author={this.props.author}/>
            </div>
        )
    }
}

export default PubViewRightBar