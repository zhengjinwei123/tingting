import React, { PureComponent } from "react"

import PropType from "prop-types"
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"

import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism"

import "react-syntax-highlighter/dist/esm/languages/prism/markup-templating"

import {jsx, java, php, c, cpp, go, python, vim, docker, json, javascript, xmlDoc, sass, css} from "react-syntax-highlighter/dist/esm/languages/prism";

class CodeBlock  extends PureComponent {
    componentWillMount() {
        SyntaxHighlighter.registerLanguage('jsx', jsx)
        SyntaxHighlighter.registerLanguage('java', java)
        SyntaxHighlighter.registerLanguage('php', php)
        SyntaxHighlighter.registerLanguage('c', c)
        SyntaxHighlighter.registerLanguage('cpp', cpp)
        SyntaxHighlighter.registerLanguage('go', go)
        SyntaxHighlighter.registerLanguage('python', python)
        SyntaxHighlighter.registerLanguage('vim', vim)
        SyntaxHighlighter.registerLanguage('docker', docker)
        SyntaxHighlighter.registerLanguage('json', json)
        SyntaxHighlighter.registerLanguage('javascript', javascript)
        SyntaxHighlighter.registerLanguage('xml', xmlDoc)
        SyntaxHighlighter.registerLanguage('css', css)
        SyntaxHighlighter.registerLanguage('sass', sass)
    }


    render() {
        const { language, value } = this.props
        return (
            <figure className={"highlight"}>
                <SyntaxHighlighter language={language} style={solarizedlight}>
                    {value}
                </SyntaxHighlighter>
            </figure>
        )
    }
}

CodeBlock.propTypes = {
    value: PropType.string.isRequired,
    language: PropType.string
}

CodeBlock.defaultProps = {
    language: null
}

export default CodeBlock