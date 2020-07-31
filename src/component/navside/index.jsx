import React from "react"
import {Link, NavLink } from "react-router-dom";
import $ from "jquery";

class NavSide extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
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

    render() {
        return (
            <div>
            <aside className="main-sidebar">
                <section className="sidebar">
                    <ul className="sidebar-menu">
                        <li className="header"><h2 className="text-warning">YUT 管理系统</h2></li>

                        <li className="treeview">
                            <NavLink exact to="/">
                                <i className="fa fa-dashboard"></i> <span>首页</span>
                            </NavLink>
                        </li>

                        <li className="treeview">
                            <a href="#">
                                <i className="fa fa-files-o"></i>
                                <span>资源管理</span>
                                <span className="fa fa-angle-left pull-right"></span>
                            </a>
                            <ul className="treeview-menu" style={{display:"none"}}>
                                <li><Link to="/photo-upload"><i className="fa fa-circle-o"></i> 图片上传 </Link></li>
                                <li><Link to="/media-upload"><i className="fa fa-circle-o"></i> 视频上传 </Link></li>
                                <li><Link to="/media-manage"><i className="fa fa-circle-o"></i> 资源管理 </Link></li>
                            </ul>
                        </li>
                        <li className="treeview">
                            <a href="#">
                                <i className="fa fa-pie-chart"></i>
                                <span>数据统计</span>
                                <i className="fa fa-angle-left pull-right"></i>
                            </a>
                            <ul className="treeview-menu">
                                <li><Link to="/data-analyse"><i className="fa fa-circle-o"></i> 数据分析 </Link></li>
                                <li><Link to="/data-query"><i className="fa fa-circle-o"></i> 数据查询 </Link></li>
                            </ul>
                        </li>
                        <li className="treeview">
                            <a href="#">
                                <i className="fa fa-laptop"></i>
                                <span>博客</span>
                                <i className="fa fa-angle-left pull-right"></i>
                            </a>
                            <ul className="treeview-menu">
                                <li><Link to="/blog-new"><i className="fa fa-circle-o"></i> 写博客 </Link></li>
                                <li><Link to="/blog-manage"><i className="fa fa-circle-o"></i> 博客管理 </Link></li>
                            </ul>
                        </li>
                        <li className="treeview">
                            <a href="#">
                                <i className="fa fa-edit"></i> <span>用户</span>
                                <i className="fa fa-angle-left pull-right"></i>
                            </a>
                            <ul className="treeview-menu">
                                <li><Link to="/user-new"><i className="fa fa-circle-o"></i> 新建用户 </Link></li>
                                <li><Link to="/user-authmanage"><i className="fa fa-circle-o"></i> 权限管理 </Link></li>
                                <li><Link to="/user-groupmanage"><i className="fa fa-circle-o"></i> 用户组管理 </Link></li>
                                <li><Link to="/user-query"><i className="fa fa-circle-o"></i> 用户查询 </Link></li>
                            </ul>
                        </li>
                        <li className="treeview">
                            <a href="#">
                                <i className="fa fa-table"></i> <span> 广告 </span>
                                <i className="fa fa-angle-left pull-right"></i>
                            </a>
                            <ul className="treeview-menu">
                                <li><Link to="/advert-new"><i className="fa fa-circle-o"></i> 新建 </Link></li>
                                <li><Link to="/advert-query"><i className="fa fa-circle-o"></i> 查询 </Link></li>
                            </ul>
                        </li>
                        <li className="treeview">
                            <a href="#">
                                <i className="fa fa-folder"></i> <span>游戏</span>
                                <i className="fa fa-angle-left pull-right"></i>
                            </a>
                            <ul className="treeview-menu">
                                <li><Link to="/game-list"><i className="fa fa-circle-o"></i> 游戏列表 </Link></li>
                                <li><Link to="/game-manage"><i className="fa fa-circle-o"></i> 管理 </Link></li>
                            </ul>
                        </li>
                    </ul>
                </section>
            </aside>
            </div>
        );
    }
}

export default NavSide;