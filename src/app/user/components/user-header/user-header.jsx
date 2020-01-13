import React from 'react';
import './user-header.scss'

export default class UserHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let title;
        switch (this.props.type) {
            case 'login':
                title = '登录';
                break;
            case 'register':
                title = '注册';
                break;
            case 'forgot':
                title = '重设密码';
                break;
            default:
                break;
        }
        return (
            <div className={'user-header'}>
                <a href={'#/'} className={'user-logo-content'}>
                    <img className={'logo-img'} src="/static/images/common/logo.jpg" alt=""/>
                </a>
                <div className={'user-title'}>{title}</div>
            </div>
        )
    }
}
