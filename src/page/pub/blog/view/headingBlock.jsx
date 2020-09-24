import React from "react"
// import PropTypes from "prop-types"
// import cls from "classnames"
import Heading from "page/pub/blog/view/heading.jsx";
import "./index.scss"

class HeadingBlock extends React.PureComponent {
    renderHtml() {
        const {level, children} = this.props
        if (children && children.length > 0) {
            const nodeValue = children[0].props.value
            return (
                <Heading level={`h${level}`} id={nodeValue} className={"m-heading"}>
                    <span className="title">
                        {children}
                    </span>
                    <a href={`#${nodeValue}`} className={"link"}>

                    </a>
                </Heading>
            )
        } else {
            return {children}
        }
    }
    render(){
        return (
           <>
               {this.renderHtml()}
            </>
        )
    }
}

export default HeadingBlock