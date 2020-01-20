import React from 'react';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';

import AsyncLoader from "../../../common/utils/component/async-loader";
import ManageMenu from "../../components/manage-menu/manage-menu";
import {USER} from "../../../common/const/manage/manage-menu";

const userList = AsyncLoader(() => import ('./user-list/user-list'));
const staffList = AsyncLoader(() => import ('./staff-list/staff-list'));
const roleList = AsyncLoader(() => import ('./role-list/role-list'));
const messageList = AsyncLoader(() => import ('./message-list/message-list'));

export default class User extends React.Component {
    render() {
        return (
            <div className={'manage-section'}>
                <div className={'manage-sidebar'}>
                    <ManageMenu menuObj={USER}/>
                </div>
                <div className={'manage-main'}>
                    <HashRouter>
                        <Switch>
                            <Route path="/manage/user/user-list" component={userList}/>
                            <Route path="/manage/user/staff-list" component={staffList}/>
                            <Route path="/manage/user/role-list" component={roleList}/>
                            <Route path="/manage/user/message-list" component={messageList}/>
                            <Redirect to="/manage/user/user-list"/>
                        </Switch>
                    </HashRouter>
                </div>
            </div>
        )
    }
}
