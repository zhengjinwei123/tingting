import React from "react";
import PropTypes from "prop-types"
import { Checkbox, Item, Icon, Container,List } from  "semantic-ui-react"

import "./index.scss"

class AuthItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_render: true,

            menus: {},
            auths: {},

            checked_menus: {},
            checked_auths: {}
        }
    }

    getIds(type) {
        let id_list = [];
        let data = [];
        if (type === "menus") {
            data = this.state.menus;
        } else {
            data = this.state.auths;
        }

        Object.keys(data).map((i) => {
            if (data[i].k.checked) {
                id_list.push(data[i].k.id);
            }

            for (let j = 0; j < data[i].data.length; j++) {
                if (data[i].data[j].checked) {

                    let parent_index = id_list.findIndex(function(x) {
                        return x === data[i].data[j].parent_id;
                    })

                    if (parent_index === -1) {
                        id_list.push(data[i].data[j].parent_id)
                    }

                    id_list.push(data[i].data[j].id);
                }
            }
        })

        return id_list;
    }

    getData() {
        return {
            menus: this.getIds("menus"),
            auths: this.getIds("auths")
        }
    }

    componentDidMount() {
        if (this.state.first_render) {
            let auths = {};

            Object.keys(this.props.auth_parents).map((id, idx) => {

                let item_k = this.props.auth_parents[id];

                if (this.props.checked_auths != null) {
                    if (this.props.checked_auths[item_k.id]) {
                        item_k.checked = true;
                    } else {
                        item_k.checked = false;
                    }
                } else {
                    item_k.checked = true;
                }

                item_k.type = 0;


                let data_list = [];
                this.props.auths[id].map((item, idx) => {
                    let data1 = item;
                    data1.type = 1;

                    if (this.props.checked_auths != null) {

                        if (this.props.checked_auths[data1.id]) {
                            data1.checked = true;
                        } else {
                            data1.checked = false;
                        }
                    } else {
                        data1.checked = true;
                    }

                    data1.parent_id = item_k.id;
                    data_list[idx] = data1;
                })

                auths[id] = auths[id] || {
                    data: data_list,
                    k: item_k
                }
            })

            this.setState({
                first_render: false,
                menus: this.mergeMenus(this.props.menus),
                auths: auths,
            }, () => {
            })
        }

        this.props.onRef(this)
    }

    onAuthChange(e, checked, id, type, v) {
        console.log("onAuthChange", checked, id, type, v)

        if (type === 0) {
            // 全选
            let auths = this.state.auths;

            auths[id].k.checked = checked;
            auths[id].data.map((item, idx) => {
                auths[id].data[idx].checked = checked;
            })

            this.setState({
                auths: auths
            })
        } else {
            let iid = parseInt(id / 1000);
            let auths = this.state.auths;

            for (let i in auths[iid].data) {
                if (auths[iid].data[i].id === id) {
                    auths[iid].data[i].checked = checked;
                    break;
                }
            }
            this.setState({
                auths: auths
            })
        }
    }


    onMenuChange(e, checked, id, type, v) {
        if (type === 0) {
            // 全选
            let menus = this.state.menus;

            menus[id].k.checked = checked;
            menus[id].data.map((item, idx) => {
                menus[id].data[idx].checked = checked;
            })

            this.setState({
                menus: menus
            })
        } else {
            let iid = parseInt(id / 100);
            let menus = this.state.menus;

            for (let i in menus[iid].data) {
                if (menus[iid].data[i].id === id) {
                    menus[iid].data[i].checked = checked;
                    break;
                }
            }
            this.setState({
                menus: menus
            })
        }
    }

    mergeMenus(menuList) {
        let menus = {};

        let idx = 0;
        menuList.map((item) => {
            let iid = parseInt(item.id / 100);
            let e = item.id % 100;

            item.idx = idx ++;



            if (this.props.checked_menus != null) {


                if (this.props.checked_menus[item.id]) {
                    item.checked = true;
                } else {
                    item.checked = false;
                }
            } else {
                item.checked = true;
            }

            menus[iid] = menus[iid] || {
                data: [],
                k: {
                }
            }
            if (e === 0) {
                item.type = 0;
                menus[iid].k = item;
            } else {
                item.type = 1;
                item.parent_id = menus[iid].k.id;
                menus[iid].data.push(item)
            }
        })

        return menus;
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

    }

    render() {

        let menus = this.state.menus;
        let auths = this.state.auths;

        return (
            <Container className={"group-pannel-container"}>
                <Item.Group divided>
                    <Item>
                        <Item.Content verticalAlign='middle'>
                            <List>
                                <List.Item>
                                    <List.Icon name='sign-out alternate' />
                                    <List.Content>
                                        <List.Header>菜单权限</List.Header>
                                        {
                                            Object.keys(menus).map((iid, idx1) => {
                                                return (
                                                    <List.List key={menus[iid].k.idx}>
                                                        <List.Item>
                                                            <List.Icon name='share' />
                                                            <List.Content className={"list-line"}>
                                                                <List.Header>{menus[iid].k.desc}</List.Header>
                                                                <Checkbox label={menus[iid].k.checked ? "全不选":"全选"} className={ "check-box"} t={menus[iid].k.type} value={iid} v={menus[iid].k.id} checked={menus[iid].k.checked}
                                                                          onChange={(e, {checked, value, t, v}) => { this.onMenuChange(e, checked, value, t, v)} }/>
                                                                {
                                                                    menus[iid].data.map((item, idx) => {
                                                                        return (
                                                                            <div key={idx}>
                                                                                <Checkbox
                                                                                    checked={item.checked}
                                                                                    label={item.desc}
                                                                                    key={item.idx}
                                                                                    t={item.type}
                                                                                    value={item.id}
                                                                                    className={ "check-box "}
                                                                                    onChange={(e, {checked, value, t}) => { this.onMenuChange(e, checked, value, t)} }/>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </List.Content>
                                                        </List.Item>
                                                    </List.List>
                                                )
                                            })
                                        }
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Icon name='sign-out alternate' />
                                    <List.Content>
                                        <List.Header>API权限</List.Header>
                                        {
                                            Object.keys(auths).map((iid, idx1) => {
                                                return (
                                                    <List.List key={idx1}>
                                                        <List.Item>
                                                            <List.Icon name='share' />
                                                            <List.Content>
                                                                <List.Header>{auths[iid].k.desc}</List.Header>
                                                                <Checkbox label={auths[iid].k.checked ? "全不选":"全选"} className={ "check-box"} t={auths[iid].k.type} v={auths[iid].k.id} value={iid} checked={auths[iid].k.checked}
                                                                          onChange={(e, {checked, value, t, v}) => { this.onAuthChange(e, checked, value, t, v)} }/>
                                                                {
                                                                    auths[iid].data.map((item, idx) => {
                                                                        return (
                                                                            <div key={idx}>
                                                                                <Checkbox
                                                                                    checked={item.checked}
                                                                                    label={item.desc}
                                                                                    t={item.type}
                                                                                    value={item.id}
                                                                                    className={ "check-box "}
                                                                                    onChange={(e, {checked, value, t}) => { this.onAuthChange(e, checked, value, t)} }/>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </List.Content>
                                                        </List.Item>
                                                    </List.List>
                                                )
                                            })
                                        }
                                    </List.Content>
                                </List.Item>
                            </List>
                        </Item.Content>
                    </Item>
                </Item.Group>

            </Container>
        )
    }
}

AuthItems.defaultProps = {
    menus: [],
    auths: {}
}

AuthItems.propTypes = {
    menus: PropTypes.array.isRequired,
    auths: PropTypes.object.isRequired,
}

export default AuthItems;