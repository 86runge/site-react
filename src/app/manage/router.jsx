import React from 'react';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';

// 用户模块
import AsyncLoader from "../common/utils/asyncLoader";

const overview = AsyncLoader(() => import ('./page/overview/overview'));
const setting = AsyncLoader(() => import ('./page/setting/setting'));
const userList = AsyncLoader(() => import ('./page/user/user-list/user-list'));
const staffList = AsyncLoader(() => import ('./page/user/staff-list/staff-list'));
const roleList = AsyncLoader(() => import ('./page/user/role-list/role-list'));
const messageList = AsyncLoader(() => import ('./page/user/message-list/message-list'));
const businessList = AsyncLoader(() => import ('./page/business/business-list/business-list'));
const enterpriseList = AsyncLoader(() => import ('./page/business/enterprise-list/enterprise-list'));
const productList = AsyncLoader(() => import ('./page/product/product-list/product-list'));
const orderList = AsyncLoader(() => import ('./page/order/order-list/order-list'));
const returnList = AsyncLoader(() => import ('./page/order/return-list/return-list'));
const mall = AsyncLoader(() => import ('./page/mall/mall'));

export default class ManageRouter extends React.Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/manage" exact component={overview}/>
                    <Route path="/manage/overview" component={overview}/>

                    <Route path="/manage/setting" component={setting}/>

                    <Route path="/manage/user-list" component={userList}/>
                    <Route path="/manage/staff-list" component={staffList}/>
                    <Route path="/manage/role-list" component={roleList}/>
                    <Route path="/manage/message-list" component={messageList}/>

                    <Route path="/manage/business-list" component={businessList}/>
                    <Route path="/manage/enterprise-list" component={enterpriseList}/>

                    <Route path="/manage/product-list" component={productList}/>

                    <Route path="/manage/order-list" component={orderList}/>
                    <Route path="/manage/return-list" component={returnList}/>
                    
                    <Route path="/manage/mall" component={mall}/>
                    <Redirect to="/manage"/>
                </Switch>
            </HashRouter>
        )
    }
};
