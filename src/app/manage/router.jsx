import React from 'react';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import AsyncLoader from "../common/utils/component/async-loader";

const overview = AsyncLoader(() => import ('./page/overview/overview'));
const setting = AsyncLoader(() => import ('./page/setting/setting'));
const user = AsyncLoader(() => import ('./page/user/user'));
const business = AsyncLoader(() => import ('./page/business/business'));
const product = AsyncLoader(() => import ('./page/product/product'));
const order = AsyncLoader(() => import ('./page/order/order'));
const mall = AsyncLoader(() => import ('./page/mall/mall'));

export default class ManageRouter extends React.Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/manage" exact component={overview}/>

                    <Route path="/manage/overview" component={overview}/>

                    <Route path="/manage/setting" component={setting}/>

                    <Route path="/manage/user" component={user}/>

                    <Route path="/manage/business" component={business}/>

                    <Route path="/manage/product" component={product}/>

                    <Route path="/manage/order" component={order}/>

                    <Route path="/manage/mall" component={mall}/>

                    <Redirect to="/manage"/>
                </Switch>
            </HashRouter>
        )
    }
};
