import React from "react";
import "./index.scss"

class PageTitle extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        document.title = this.props.title + " - YUT 管理信息系统"
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