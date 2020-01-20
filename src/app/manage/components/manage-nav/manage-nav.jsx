import React from 'react';
import './manage-nav.scss';

import {connect} from 'react-redux';
import {Menu, Icon} from 'antd';

import {Link} from 'react-router-dom';
import store from "../../store/store";
import {changeNav} from "../../store/manage-nav/action";
import {changeMenu} from "../../store/manage-menu/action";

import {DEFAULT_MENU} from "../../../common/const/manage/default-menu";

class ManageNav extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        selectedNav: 'overview',
    };

    componentWillMount() {
        this.setState({
            selectedNav: this.props.navInfo,
        });
    }

    handleClick = e => {
        this.setState({
            selectedNav: e.key,
        }, () => {
            store.dispatch(changeNav(this.state.selectedNav));
            // 切换导航条时，清空存储的菜单
            store.dispatch(changeMenu(DEFAULT_MENU[this.state.selectedNav]));
        });
    };

    render() {
        return (
            <div className={'manage-nav-box'}>
                <div className={'manage-logo-content'}>
                    <img className={'logo-img'} src="/static/images/common/dashboard.jpg" alt=""/>
                </div>
                <div className={'manage-nav-content'}>
                    <Menu theme="dark" onClick={this.handleClick} selectedKeys={[this.state.selectedNav]}
                          mode="horizontal">
                        <Menu.Item key="overview">
                            <Link to={'/manage/overview'}>
                                <Icon type="home"/>
                                概览
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="setting">
                            <Link to={'/manage/setting'}>
                                <Icon type="setting"/>
                                设置
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="user">
                            <Link to={'/manage/user'}>
                                <Icon type="user"/>
                                用户
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="business">
                            <Link to={'/manage/business'}>
                                <Icon type="team"/>
                                商家
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="product">
                            <Link to={'/manage/product'}>
                                <Icon type="table"/>
                                商品
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="order">
                            <Link to={'/manage/order'}>
                                <Icon type="solution"/>
                                订单
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="mall">
                            <Link to={'/manage/mall'}>
                                <Icon type="inbox"/>
                                商城装修
                            </Link>
                        </Menu.Item>
                    </Menu>
                </div>
            </div>
        )
    }
}

export default connect(state => (state.navInfo),
    {
        changeNav,
        changeMenu
    })(ManageNav);
