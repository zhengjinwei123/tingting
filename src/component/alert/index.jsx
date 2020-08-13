import React, { Component } from 'react';
import { is, fromJS } from 'immutable';
import ReactDOM from 'react-dom';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import PureRenderMixin from "react-addons-pure-render-mixin"
import Util from "util"

import Child from "./child.jsx"

import "./index.scss"

class Dialog extends Component{

    constructor(props) {
        super(props);

        this.state = {
            tips:"",
            childs: '',
            content: "",
            open: false,
            type: 'error' // error info warn
        };

        this.close = this.close.bind(this)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    //打开弹窗
    open(options) {
        options = options || {};
        var props = options.props || {};

        options.closeDialog =  options.closeDialog || null;

        var childs = this.renderChildren(props, options.childrens) || '';

        this.setState({
            content: props.content,
            tips: props.tips,
            closeDialog: Util.isFunction(options.closeDialog) ? options.closeDialog : this.state.closeDialog,
            childs: childs,
            open: props.open,
            type: props.type
        })
    }
    //关闭弹窗
    close() {

        console.log("关闭弹窗")

        if (Util.isFunction(this.state.closeDialog)) {
            this.state.closeDialog();
        }

        // ReactDOM.unmountComponentAtNode(document.getElementById("tips_xxx"))
    }

    renderChildren(props,childrens) {
        //遍历所有子组件
        var childs = [];
        // childrens = childrens || [];

        let ps = {};
        for (let i in props) {
            ps[i] = props[i]
        }

        ps.close = this.close;
        ps.open = true;
        ps.content = this.state.content
        ps.tm = new Date();

        // childrens.forEach((currentItem,index) => {
        //     ps.key = index;
        //     console.log("zjw callee", ps);
        //     childs.push(React.createElement(
        //         currentItem,
        //         ps,
        //     ));
        // })
        return childs;
    }

    shouldComponentUpdate(nextProps, nextState){

        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    render() {
        return (
            <TransitionGroup>
                <CSSTransition timeout={500} className="item1">
                    {
                        this.state.open ?
                            <Child open={true } tips={this.state.tips} content={this.state.content} type={this.state.type }/> :
                            <Child open={false } tips={this.state.tips} content={this.state.content} type={this.state.type }/>
                    }

                </CSSTransition>
            </TransitionGroup>
        );
    }
}

let div = document.createElement('div');
let props = {

};
document.body.appendChild(div);

let Box = ReactDOM.render(React.createElement(
    Dialog,
    props
),div);


export default Box;