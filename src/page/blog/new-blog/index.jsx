import React from "react"

import PageTitle from "component/pagetitle/index.jsx";
import MyBraftEditor from "page/blog/new-blog/braftEditor.jsx";
import MyMarkdownEditor from "page/blog/new-blog/markdownEditor.jsx"
import {Button, Icon} from "semantic-ui-react";

import "./index.scss"

const init_markdown = `
<p align="center">
  A markdown editor with preview, implemented with React.js and TypeScript.
</p>
<p align="center">
  A markdown editor with preview, implemented with React.js and TypeScript.
</p>
<p align="center">
  A markdown editor with preview, implemented with React.js and TypeScript.
</p>
`

const init_braft = `
    <a href="https://www.yuque.com/braft-editor">braft editor</a>
`


class BlogEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editor_type: 1, // 1, braft 2 mardown
            braft_data: init_braft,
            markdown_data: init_markdown
        }
    }

    changeEditorType() {
        if (this.state.editor_type === 1) {
            this.setState({
                editor_type: 2
            })
            //braft
            let data = this.BraftEditorRef.getData()
            this.setState({
                braft_data: data
            })
        } else {
            this.setState({
                editor_type: 1
            })
            let data = this.MarkdownEditorRef.getData()
            this.setState({
                markdown_data: data
            })
        }
    }

    upLoadBlog() {
        console.log("-----upLoadBlog----")
        console.log(this.state.editor_type)
        console.log(this.state.braft_data)
        console.log(this.state.markdown_data)
    }

    render() {

        const editorType = this.state.editor_type;

        return (
            <div id="page-wrapper">
                <PageTitle title="写博客"/>
                <div>
                    <Button.Group>
                        {
                            editorType === 1 ?
                                <Button color="linkedin" onClick={ () => this.changeEditorType()}>
                                    <Icon name={"trademark"}/> 切换到 Markdown编辑器
                                </Button> :  <Button onClick={ () => this.changeEditorType()} positive>
                                    <Icon name={"code"}/>切换到 富文本编辑器</Button>
                        }

                        <Button.Or text='Or' />

                        <Button color={"google plus"} onClick={() => this.upLoadBlog() }>
                            <Icon name={"upload"}/>上传博客</Button>
                    </Button.Group>
                </div>
                {
                    editorType === 1 ? <MyBraftEditor
                            data={this.state.braft_data}
                            onRef={(ref) => { this.BraftEditorRef = ref} }/> :
                        <MyMarkdownEditor
                            data={this.state.markdown_data }
                            onRef={(ref) => { this.MarkdownEditorRef = ref} }
                        />
                }
            </div>
        )
    }
}

export default BlogEditor