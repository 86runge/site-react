import React from 'react';
import './manage-nav.scss';

import {Menu, Icon} from 'antd';

export default class ManageNav extends React.Component {

    state = {
        current: 'overview',
    };

    handleClick = e => {
        this.setState({
            current: e.key,
        });
    };

    render() {
        return (
            <div className={'manage-nav-box'}>
                <div className={'manage-logo-content'}>
                    <img className={'logo-img'} src="/static/images/common/dashboard.jpg" alt=""/>
                </div>
                <div className={'manage-nav-content'}>
                    <Menu theme="dark" onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                        <Menu.Item key="overview">
                            <a href={'#/manage/overview'}>
                                <Icon type="home"/>
                                概览
                            </a>
                        </Menu.Item>
                        <Menu.Item key="setting">
                            <a href={'#/manage/setting'}>
                                <Icon type="setting"/>
                                设置
                            </a>
                        </Menu.Item>
                        <Menu.Item key="user">
                            <a href={'#/manage/user-list'}>
                                <Icon type="user"/>
                                用户
                            </a>
                        </Menu.Item>
                        <Menu.Item key="business">
                            <a href={'#/manage/business-list'}>
                                <Icon type="team"/>
                                商家
                            </a>
                        </Menu.Item>
                        <Menu.Item key="product">
                            <a href={'#/manage/product-list'}>
                                <Icon type="table"/>
                                商品
                            </a>
                        </Menu.Item>
                        <Menu.Item key="order">
                            <a href={'#/manage/order-list'}>
                                <Icon type="solution"/>
                                订单
                            </a>
                        </Menu.Item>
                        <Menu.Item key="mall">
                            <a href={'#/manage/mall'}>
                                <Icon type="inbox"/>
                                商城装修
                            </a>
                        </Menu.Item>
                    </Menu>
                </div>
            </div>
        )
    }
}
