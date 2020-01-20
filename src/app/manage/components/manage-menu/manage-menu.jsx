import React from 'react';
import './manage-menu.scss';

import {connect} from 'react-redux';

import {Link} from 'react-router-dom'
import {Menu} from 'antd';

import {changeNav} from "../../store/manage-nav/action";
import {changeMenu} from "../../store/manage-menu/action";
import store from "../../store/store";

class ManageMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        menuObj: '',
        menuList: [],
        selectedNav: '',
        selectedMenu: '',
    };

    componentWillMount() {
        const menuObj = this.props.menuObj;
        const navInfo = this.props.navInfo;
        const menuInfo = this.props.menuInfo;
        console.log(this.props);
        if (menuObj) {
            this.setState({
                menuList: Object.values(menuObj),
            });
        }
        if (navInfo) {
            this.setState({
                selectedNav: navInfo.navInfo,
            })
        }
        if (menuInfo) {
            this.setState({
                selectedMenu: menuInfo.menuInfo || window.location.hash.split('/').pop(),
            })
        }
    }

    handleClick = e => {
        this.setState({
            selectedMenu: e.key,
        }, () => {
            store.dispatch(changeMenu(this.state.selectedMenu));
        });
    };

    render() {
        return (
            <div className={'manage-menu-box'}>
                <Menu onClick={this.handleClick} selectedKeys={[this.state.selectedMenu]} style={{height: '100%'}}>
                    {this.state.menuList.map(item => {
                        return (
                            <Menu.Item key={`${item.value}`}>
                                <Link to={`/manage/${this.state.selectedNav}/${item.value}`}>
                                    {item.text}
                                </Link>
                            </Menu.Item>
                        )
                    })}
                </Menu>
            </div>
        )
    }
}

export default connect(state => ({
        navInfo: state.navInfo,
        menuInfo: state.menuInfo
    }),
    {
        changeNav,
        changeMenu
    })(ManageMenu);

