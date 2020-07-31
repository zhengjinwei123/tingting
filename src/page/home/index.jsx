import React from "react";
import { Link } from 'react-router-dom';

import './index.scss'
import PageTitle from "component/pagetitle/index.jsx";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userCount : '100',
            resCount: '120',
            gameCount: '110',
            moneyCount: 10000000,
            publishBlogCount: 101,
        }
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="首页"/>
                <div className="row">
                    <div className="col-md-4">
                        <Link to="/user" className="color-box brown">
                            <p className="count">{ this.state.userCount }</p>
                            <p className="desc">
                                <i className="fa fa-user-o"></i>
                                <span>用户总数</span>
                            </p>
                        </Link>
                    </div>

                    <div className="col-md-4">
                        <Link to="/product" className="color-box green">
                            <p className="count">{ this.state.resCount }</p>
                            <p className="desc">
                                <i className="fa fa-list"></i>
                                <span>资源总数</span>
                            </p>
                        </Link>
                    </div>

                    <div className="col-md-4">
                        <Link to="/order" className="color-box blue">
                            <p className="count">{this.state.gameCount}</p>
                            <p className="desc">
                                <i className="fa fa-check-square-o"></i>
                                <span>游戏总数</span>
                            </p>
                        </Link>
                    </div>
                </div>

                <div className="row" style={{marginTop: "20px"}} >
                    <div className="col-md-4">
                        <Link to="/order" className="color-box red">
                            <p className="count">{this.state.moneyCount} 元</p>
                            <p className="desc">
                                <i className="fa fa-check-square-o"></i>
                                <span>总收入</span>
                            </p>
                        </Link>
                    </div>

                    <div className="col-md-4">
                        <Link to="/order" className="color-box green">
                            <p className="count">{this.state.publishBlogCount}</p>
                            <p className="desc">
                                <i className="fa fa-check-square-o"></i>
                                <span>发布博客总数</span>
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;