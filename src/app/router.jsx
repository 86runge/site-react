import React from 'react';
import {HashRouter, Switch, Redirect, Route} from 'react-router-dom';

// 首页
import home from "./frontend/page/home/home";

// 前台
import frontend from './frontend/frontend';
// 后台
import manage from "./manage/manage";
// 用户模块
import user from "./user/user";

/**
 * 处理路由，react-router4 不再推荐将所有路由规则放在同一个地方集中式路由，子路由应该由父组件动态配置，组件在哪里匹配就在哪里渲染，更加灵活
 */
export default class AppRouter extends React.Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/" exact component={home}/>
                    <Route path="/frontend" component={frontend}/>
                    <Route path="/manage" component={manage}/>
                    <Route path="/user" component={user}/>
                    <Redirect to="/"/>
                </Switch>
            </HashRouter>
        )
    }
};
