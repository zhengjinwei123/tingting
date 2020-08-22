import React from 'react'
import {Button, Container, Form, Modal} from "semantic-ui-react";
import AuthItems from "component/auth-items/index.jsx";
import globalService from "service/global.jsx";
import utils from "utils/utils.jsx"

class GroupAuthEditModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            show: false,

            group_id: "",
            group_name: "",
            menus: [],
            auths: {},
            auth_parents: {},

            checked_menus: [],
            checked_auths: [],
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        let item = this.getEditData(nextProps.group_id, nextProps.group_detail_list)

        if (item) {
            this.setState({
                show: nextProps.show,
                group_id: nextProps.group_id,
                group_name: item.group_name,
                checked_menus: item.checked_menus,
                checked_auths: item.checked_auths
            }, ()=> {
            })
        }
    }

    setShow(show) {
        this.setState({
            show: show
        })

        if (!show) {
            this.props.closeDialog();
        }
    }

    componentDidMount() {
        globalService.authList().then(res => {
            res.menulist = res.menulist.sort(function (a, b)  {
                return a.id - b.id;
            })

            let authMap = {}
            let authParent = {}
            res.authlist.map((item)=> {
                let id = parseInt(item.id / 1000);
                let e = item.id % 1000;

                if (e === 0 && item.url === "/api#") {
                    authParent[id] = item;
                } else {
                    authMap[id] = authMap[id] || [];
                    authMap[id].push(item)
                }
            })

            this.setState({
                menus: res.menulist,
                auths: authMap,
                auth_parents: authParent
            })

        },(err) => {
            console.log(err)
        })
    }

    getEditData(group_id, group_detail_list) {
        for (let i = 0; i < group_detail_list.length; i++) {
            let item = group_detail_list[i];
            if (item.id === group_id) {

                let menus = item.menus.split(",");
                let auths = item.auths.split(",");

                let menus_map = {};
                let auths_map = {};
                menus.map((id) => {
                    menus_map[id] = 1;
                })
                auths.map((id) => {
                    auths_map[id] = 1;
                })

                return {
                    group_name: item.desc,
                    checked_menus: menus_map,
                    checked_auths: auths_map
                };
            }
        }

        return null;
    }

    onSubmit() {
        let data = this.authItemComponent.getData();

        globalService.updateGroupAuth(this.state.group_id,
            data.menus.join(","),
            data.auths.join(",")).then(res => {
                utils.successTips("success!")
                this.setShow(false);
                this.props.updatePage();
        }, error => {
            utils.errorTips(error)
        })
    }

    render() {

        return (
            <Modal
                centered={false}
                size = "large"
                onClose={ () => this.setShow(false) }
                open = { this.state.show }
            >
                <Modal.Header>权限修改</Modal.Header>
                <Modal.Content scrolling={true}>
                    <Container>
                        <Form>
                            <Form.Field>
                                <label>用户组ID</label>
                                <input placeholder={this.state.group_id} disabled={true} value={this.state.group_id}/>
                                <label>用户组名称</label>
                                <input placeholder={this.state.group_name} disabled={true} value={this.state.group_name}/>
                            </Form.Field>
                            <Form.Field>
                                <label>权限列表</label>

                                <AuthItems menus={ this.state.menus}
                                           auths={ this.state.auths}
                                           auth_parents={ this.state.auth_parents }
                                           checked_menus={ this.state.checked_menus}
                                           checked_auths={ this.state.checked_auths}
                                           onRef={(ref) => { this.authItemComponent = ref}}
                                />

                            </Form.Field>
                        </Form>
                    </Container>
                </Modal.Content>
                <Modal.Actions>
                    <Button positive onClick={ () => this.onSubmit() }>提交修改</Button>
                    <Button positive onClick={ () => this.setShow(false) }>
                        关闭
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default GroupAuthEditModal;