import React from "react";
import "./index.scss"

class PageTitle extends React.Component {
    constructor(props) {
        super(props);
    }

    UNSAFE_componentWillMount() {
        document.title = "价值空间 - " + this.props.title
    }

    render() {
        return (
            <div className="row page-title-container">
                <div className="col-md-12">
                    <h3 className="page-header">{ this.props.title }</h3>
                    <hr/>
                    { this.props.children }
                </div>
            </div>
        )
    }
}

export default PageTitle;