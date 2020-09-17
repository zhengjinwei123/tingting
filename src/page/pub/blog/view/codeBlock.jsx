import React from "react"

import PropType from "prop-types"
// import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"

import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/prism-light.js"

import { prism } from "react-syntax-highlighter/dist/esm/styles/prism"

// import {monokaiSublime, github, atomOneDark} from 'react-syntax-highlighter/dist/esm/styles/hljs/index.js';

import "react-syntax-highlighter/dist/esm/languages/prism/markup-templating"

import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx.js"
import java from "react-syntax-highlighter/dist/esm/languages/prism/java.js"
import php from "react-syntax-highlighter/dist/esm/languages/prism/php.js"
import c from "react-syntax-highlighter/dist/esm/languages/prism/c.js"
import cpp from "react-syntax-highlighter/dist/esm/languages/prism/cpp.js"
import go from "react-syntax-highlighter/dist/esm/languages/prism/go.js"
import python from "react-syntax-highlighter/dist/esm/languages/prism/python.js"
import vim from "react-syntax-highlighter/dist/esm/languages/prism/vim.js"
import docker from "react-syntax-highlighter/dist/esm/languages/prism/docker.js"
import json from "react-syntax-highlighter/dist/esm/languages/prism/json.js"
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript.js"
import xmlDoc from "react-syntax-highlighter/dist/esm/languages/prism/xml-doc.js"
import sass from "react-syntax-highlighter/dist/esm/languages/prism/sass.js"
import css from "react-syntax-highlighter/dist/esm/languages/prism/css.js"
import sql from "react-syntax-highlighter/dist/esm/languages/prism/sql.js"

import _ from "lodash"

const styles = [
    prism,
]

class CodeBlock  extends React.PureComponent {
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
        SyntaxHighlighter.registerLanguage('sql', sql)
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
            // <div className={"highlight"}>
            //
            // </div>

            <SyntaxHighlighter language={language} style={styles[this.state.style_idx]}
                               showLineNumbers={true}
                               lineNumberStyle={{color: '#ddd', fontSize: 15}}>
                {value}
            </SyntaxHighlighter>

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