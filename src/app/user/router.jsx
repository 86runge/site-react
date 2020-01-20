import React from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';

// 用户模块
import AsyncLoader from "../common/utils/component/async-loader";

const login = AsyncLoader(() => import ('./page/login/login'));
const register = AsyncLoader(() => import('./page/register/register'));
const forgot = AsyncLoader(() => import('./page/forgot/forgot'));

export default class UserRouter extends React.Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/user/login" component={login}/>
                    <Route path="/user/register" component={register}/>
                    <Route path="/user/forgot" component={forgot}/>
                </Switch>
            </HashRouter>
        )
    }
};
