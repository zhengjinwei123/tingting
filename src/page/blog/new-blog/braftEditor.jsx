import React from "react"
// import BraftEditor from 'braft-editor'
// import "braft-editor/dist/index.css"
// import ColorPicker from 'braft-extensions/dist/color-picker.js'
// import CodeHighlighter from 'braft-extensions/dist/code-highlighter.js'
// import Table from 'braft-extensions/dist/table.js'
//
// import 'prismjs/components/prism-java.min.js'
// import 'prismjs/components/prism-php.min.js'
// import 'prismjs/components/prism-go.min.js'
// import 'prismjs/components/prism-csharp.min.js'
// import 'prismjs/components/prism-docker.min.js'
// import 'prismjs/components/prism-git.min.js'
// import 'prismjs/components/prism-sql.min.js'
// import 'prismjs/components/prism-c.min.js'
// import 'prismjs/components/prism-cpp.min.js'
// import 'prismjs/components/prism-bash.min.js'
// import 'prismjs/components/prism-css.min.js'
// import 'prismjs/components/prism-http.min.js'
// import 'prismjs/components/prism-javascript.min.js'
// import 'prismjs/components/prism-xml-doc.js'
// import 'prismjs/components/prism-json.min.js'
// import 'prismjs/components/prism-lua.min.js'
// import 'prismjs/components/prism-makefile.min.js'
// import 'prismjs/components/prism-yaml.min.js'
// import 'prismjs/components/prism-vim.min.js'
// import 'prismjs/components/prism-jsx.min.js'
//
//
//
// import "./index.scss"
// import 'braft-extensions/dist/color-picker.css'
// import 'braft-extensions/dist/code-highlighter.css'
// import 'braft-extensions/dist/table.css'
// import 'braft-editor/dist/output.css'
//
// import Markdown from 'braft-extensions/dist/markdown.js'
//
// const markdown_options = {
//     includeEditors: ['myeditor'], // 指定该模块对哪些BraftEditor生效，不传此属性则对所有BraftEditor有效
// }
//
// BraftEditor.use(Markdown(markdown_options))
//
// const table_options = {
//     defaultColumns: 2, // 默认列数
//     defaultRows: 2, // 默认行数
//     withDropdown: false, // 插入表格前是否弹出下拉菜单
//     columnResizable: true, // 是否允许拖动调整列宽，默认false
//     exportAttrString: '', // 指定输出HTML时附加到table标签上的属性字符串
//     includeEditors: ['myeditor'], // 指定该模块对哪些BraftEditor生效，不传此属性则对所有BraftEditor有效
// }
// BraftEditor.use(Table(table_options))
//
// BraftEditor.use(ColorPicker({
//     includeEditors: ['myeditor'],
//     theme: 'light' // 支持dark和light两种主题，默认为dark
// }))
//
//
// const codehightlight_options = {
//     syntaxs: [
//         {
//             name: 'JavaScript',
//             syntax: 'javascript'
//         }, {
//             name: 'JSX',
//             syntax: 'jsx'
//         }, {
//             name: 'HTML',
//             syntax: 'html'
//         }, {
//             name: 'CSS',
//             syntax: 'css'
//         }, {
//             name: 'Java',
//             syntax: 'java',
//         }, {
//             name: 'PHP',
//             syntax: 'php'
//         }, {
//             name: 'Git',
//             syntax: 'git'
//         }, {
//             name: 'C++',
//             syntax: 'cpp'
//         }, {
//             name: 'C',
//             syntax: 'c'
//         },  {
//             name: 'GO',
//             syntax: 'go'
//         }, {
//             name: 'c#',
//             syntax: 'csharp'
//         }, {
//             name: "XML",
//             syntax: "xml"
//         }, {
//             name: "JSON",
//             syntax: "json"
//         }, {
//             name: "LUA",
//             syntax: "lua"
//         }, {
//             name: "Makefile",
//             syntax: "makefile"
//         }, {
//             name: "SQL",
//             syntax: "sql"
//         },{
//             name: 'DOCKER',
//             syntax: 'dockerfile'
//         },{
//             name: 'YAML',
//             syntax: 'yaml'
//         },{
//             name: 'vim',
//             syntax: 'vim'
//         },
//     ]
// }
//
// BraftEditor.use(CodeHighlighter(codehightlight_options))
//
// class MyBraftEditor extends React.Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             editorState: null
//         }
//     }
//
//     buildPreviewHtml () {
//         let content = this.state.editorState.toHTML()
//
//         content = content.replace(/<br\s*\/?>/g,'\n');
//
//         return `
//       <!Doctype html>
//       <html>
//         <head>
//           <title>预览</title>
//           <style>
//             html,body{
//               height: 100%;
//               margin: 0;
//               padding: 0;
//               overflow: auto;
//               background-color: #f1f2f3;
//             }
//             .container{
//               box-sizing: border-box;
//               width: 1000px;
//               max-width: 100%;
//               min-height: 100%;
//               margin: 0 auto;
//               padding: 30px 20px;
//               overflow: hidden;
//               background-color: #fff;
//               border-right: solid 1px #eee;
//               border-left: solid 1px #eee;
//             }
//             .container img,
//             .container audio,
//             .container video{
//               max-width: 100%;
//               height: auto;
//             }
//             .container p{
//               white-space: pre-wrap;
//               min-height: 1em;
//             }
//             .container pre{
//               padding: 15px;
//               background-color: #f1f1f1;
//               border-radius: 5px;
//             }
//             .container blockquote{
//               margin: 0;
//               padding: 15px;
//               background-color: #f1f1f1;
//               border-left: 3px solid #d1d1d1;
//             }
//
//           </style>
//
//           <link rel="stylesheet" href="http://localhost:9000/prism1.css" media="all" />
//
//         </head>
//         <body>
//              <div class="container">${content}</div>
//              <script src="http://localhost:9000/prism1.js" ></script>
//              <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
//              <script type="text/javascript">
//                   $('pre').addClass("line-numbers").css("white-space", "pre-wrap");
//             </script>
//
//         </body>
//       </html>
//     `
//     }
//
//     componentDidMount() {
//         this.setState({
//             editorState: BraftEditor.createEditorState(this.props.data)
//         })
//
//         this.props.onRef(this)
//     }
//
//     getData() {
//         return this.state.editorState.toHTML()
//     }
//
//     handleEditorChange(editorState) {
//         this.setState({
//             editorState
//         }, () => {
//             if (this.props.onChange) {
//                 this.props.onChange(this.state.editorState.toHTML())
//             }
//         })
//     }
//
//     submitContent() {
//
//         if (!this.state.editorState) {
//             return;
//         }
//
//         const htmlContent = this.state.editorState.toHTML()
//
//         console.log("jjj", htmlContent)
//     }
//
//     preview() {
//         if (window.previewWindow) {
//             window.previewWindow.close()
//         }
//         window.previewWindow = window.open()
//         window.previewWindow.document.write(this.buildPreviewHtml())
//         window.previewWindow.document.close()
//     }
//
//     render() {
//         const {editorState} = this.state
//
//         const extendControls = [
//             'separator',
//             {
//                 key: 'custom-button',
//                 type: 'button',
//                 text: '预览',
//                 onClick: () => this.preview()
//             },
//             // 'separator',
//             // {
//             //     key: 'custom-button2',
//             //     type: 'button',
//             //     text: '保存',
//             //     onClick: () => this.submitContent()
//             // }
//         ]
//
//         return (
//             <BraftEditor
//                 // contentClassName={"braft-content"}
//                 className={"myeditor"}
//                 id="myeditor"
//                 extendControls={extendControls}
//                 value={editorState}
//                 onChange={ (state) => this.handleEditorChange(state)}
//                 onSave={ () => this.submitContent()}
//             />
//         )
//     }
// }
//
class MyBraftEditor extends React.Component {
    render() {
        return (
            <div></div>
        )
    }
}
export default MyBraftEditor