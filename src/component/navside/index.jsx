import React from "react"
import {Link, NavLink } from "react-router-dom";
// import $ from "jquery";
import userService from "service/user.jsx";

class NavSide extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menuList: {},
            parentMenuMap : {}
        }
    }

    runMenu() {
        $.sidebarMenu = function(menu) {
            var animationSpeed = 200;

            $(menu).on('click', 'li a', function(e) {
                var $this = $(this);
                var checkElement = $this.next();

                if (checkElement.is('.treeview-menu') && checkElement.is(':visible')) {
                    checkElement.slideUp(animationSpeed, function() {
                        checkElement.removeClass('menu-open');
                    });
                    checkElement.parent("li").removeClass("active");
                }

                //If the menu is not visible
                else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
                    //Get the parent menu
                    var parent = $this.parents('ul').first();
                    //Close all open menus within the parent
                    var ul = parent.find('ul:visible').slideUp(animationSpeed);
                    //Remove the menu-open class from the parent
                    ul.removeClass('menu-open');
                    //Get the parent li
                    var parent_li = $this.parent("li");

                    //Open the target menu and add the menu-open class
                    checkElement.slideDown(animationSpeed, function() {
                        //Add the class active to the parent li
                        checkElement.addClass('menu-open');
                        parent.find('li.active').removeClass('active');
                        parent_li.addClass('active');
                    });
                }
                //if this isn't a link, prevent the page from being redirected
                if (checkElement.is('.treeview-menu')) {
                    e.preventDefault();
                }
            });
        }

        $.sidebarMenu($('.sidebar-menu'))
    }

    UNSAFE_componentWillMount() {

        if (Object.keys(this.props.menuList).length > 0) {
            console.log("menu load from props");
            this.setState(this.props.menuList)
        } else {
            console.log("menu load from server")
            userService.getMenus().then((data) => {
                // 处理菜单数据
                let menuList = {};
                let parentMenuMap = {};
                for (let k in data.menulist) {
                    let menuObj = data.menulist[k];

                    if (menuObj.parent_id === 0) {
                        menuList[menuObj.id] = [];
                        parentMenuMap[menuObj.id] = menuObj;
                    } else {
                        menuList[menuObj.parent_id] = menuList[menuObj.parent_id] || [];
                        menuList[menuObj.parent_id].push(menuObj)
                    }
                }

                this.setState({
                    menuList: menuList,
                    parentMenuMap : parentMenuMap
                })

                this.props.menuActions.menuInit({
                    menuList: menuList,
                    parentMenuMap : parentMenuMap
                })
            }, err => {
                console.error(err)
            })
        }
    }

    componentDidMount() {
        // load menu
        this.runMenu();
    }

    render() {
        return (
            <div>
            <aside className="main-sidebar">
                <section className="sidebar">
                    <ul className="sidebar-menu">
                        <li className="header"><h3 className="text-red"><i className="fa fa-dashboard fa-fw fa-left"></i>{ process.env.WEB_NAME}</h3></li>

                        <li className="treeview">
                            <NavLink exact to="/admin">
                                <i className="fa fa-home text-yellow"></i><span>首页</span>
                            </NavLink>
                        </li>

                        {
                            Object.keys(this.state.menuList).map((parentMenuId, idx) => {

                                if (this.state.menuList[parentMenuId].length) {

                                    let parentMenu = this.state.parentMenuMap[parentMenuId];
                                    let parentIcon = "fa " + parentMenu.icon +" text-yellow";
                                    return (
                                        <li className="treeview" key={idx}>
                                            <a href="#">
                                                <i className={ parentIcon }></i>
                                                <span>{ parentMenu.desc }</span>
                                                <span className="fa fa-angle-left pull-right"></span>
                                            </a>
                                            <ul className="treeview-menu">
                                            {
                                                this.state.menuList[parentMenuId].map((item, idx1) => {
                                                    let icon = "fa " + item.icon + " text-success";
                                                    let linkTo = item.link;
                                                    return (
                                                        <li key={idx1}><Link to={ linkTo }><i className={ icon }></i> {item.desc} </Link></li>
                                                    )
                                                })
                                            }
                                            </ul>

                                        </li>
                                    )
                                }
                            })
                        }
                    </ul>
                </section>
            </aside>
            </div>
        );
    }
}

export default NavSide;