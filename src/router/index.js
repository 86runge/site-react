import React from 'react';
import {HashRouter, Switch, Redirect, Route} from 'react-router-dom';
import {renderRoutes} from 'react-router-config'
import AsyncLoader from '@/utils/asyncLoader';

// 首页
import Home from '@/pages/home/home';

// 用户模块
const user = AsyncLoader(() => import ('@/pages/user/user'));
const login = AsyncLoader(() => import ('@/pages/user/login/login'));
const register = AsyncLoader(() => import('@/pages/user/register/register'));
const forgot = AsyncLoader(() => import('@/pages/user/forgot/forgot'));

// 管理模块
const manage = AsyncLoader(() => import('@/pages/manage/manage'));

// const routes = [
//     {
//         path: "/",
//         component: Home,
//         exact: true
//     }, {
//         path: "/home",
//         component: Home,
//         exact: true
//     }, {
//         path: "/user/login",
//         component: Login,
//         exact: true
//     }, {
//         path: "/user/register",
//         component: Register,
//         exact: true
//     }, {
//         path: "/user/forgot",
//         component: Forgot,
//         exact: true
//     }, {
//         path: "/manage",
//         component: Manage,
//         exact: true
//     },
// ];

/**
 * 处理路由，react-router4 不再推荐将所有路由规则放在同一个地方集中式路由，子路由应该由父组件动态配置，组件在哪里匹配就在哪里渲染，更加灵活
 */
export default class RouterConfig extends React.Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/user" render={() =>
                        <div>
                            <Route path="/user/login" component={login}/>
                            <Route path="/user/register" component={register}/>
                            <Route path="/user/forgot" component={forgot}/>
                        </div>
                    }/>
                    <Route path="/manage" component={manage}/>
                    <Redirect to="/"/>
                </Switch>
            </HashRouter>
        )
    }
};
