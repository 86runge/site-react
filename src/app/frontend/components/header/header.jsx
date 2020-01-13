import React from 'react';
import './header.scss'

export default class Header extends React.Component {
    render() {
        return (
            <div className={'header'}>
                <div className={'site-nav'}>
                    <div className={'welcome'}>
                        <span>欢迎来到XX商城</span>
                        <a className={'login-text'} href={'#/user/login'}>请登录</a>
                        <a className={'login-text'} href={'#/user/register'}>免费注册</a>
                    </div>
                    <div className={'site-map'}>
                        <a className={'map-text'} href={'#/member'}>会员中心</a>
                        <a className={'map-text'} href={'#/store'}>收藏夹</a>
                        <a className={'map-text'} href={'#/shopping-cart'}>购物车</a>
                        <a className={'map-text'}>联系客服</a>
                        <a className={'map-text'}>切换主题</a>
                        <a className={'map-text'} href={'#/manage/overview'}>前往管理端</a>
                    </div>
                </div>
            </div>
        )
    }
}
