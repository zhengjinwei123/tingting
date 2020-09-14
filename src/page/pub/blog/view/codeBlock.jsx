import React, { PureComponent } from "react"

import PropType from "prop-types"
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"

import { solarizedlight} from "react-syntax-highlighter/dist/esm/styles/prism"

// import {monokaiSublime, github, atomOneDark} from 'react-syntax-highlighter/dist/esm/styles/hljs/index.js';

import "react-syntax-highlighter/dist/esm/languages/prism/markup-templating"

import {jsx, java, php, c, cpp, go, python, vim, docker, json, javascript, xmlDoc, sass, css} from "react-syntax-highlighter/dist/esm/languages/prism";

// import { Label, Segment } from 'semantic-ui-react'

import _ from "lodash"

const styles = [
    // monokaiSublime,
    solarizedlight,
    // github,
    // atomOneDark,
    // xonokai
]

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

    constructor(props) {
        super(props);

        this.state = {
            style_idx : 0
        }
    }

    componentDidMount() {
        let idx = _.random(0, styles.length-1)

        this.setState({
            style_idx: idx
        })
    }

    render() {
        const { language, value } = this.props

        return (
            <div className={"highlight"}>
                <SyntaxHighlighter language={language} style={styles[this.state.style_idx]}
                                   wrapLines={true}
                                   showLineNumbers={true}
                                   showInlineLineNumbers={true}>
                    {value}
                </SyntaxHighlighter>
            </div>

        )
    }
}

CodeBlock.propTypes = {
    value: PropType.string.isRequired,
    language: PropType.string
}

CodeBlock.defaultProps = {
    language: ""
}

export default CodeBlock