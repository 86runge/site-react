import React from 'react';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';

import AsyncLoader from "../../../common/utils/component/async-loader";
import ManageMenu from "../../components/manage-menu/manage-menu";
import {ORDER} from "../../../common/const/manage/manage-menu";

const orderList = AsyncLoader(() => import ('./order-list/order-list'));
const returnList = AsyncLoader(() => import ('./return-list/return-list'));

export default class Order extends React.Component {
    render() {
        return (
            <div className={'manage-section'}>
                <div className={'manage-sidebar'}>
                    <ManageMenu menuObj={ORDER}/>
                </div>
                <div className={'manage-main'}>
                    <HashRouter>
                        <Switch>
                            <Route path="/manage/order/order-list" component={orderList}/>
                            <Route path="/manage/order/return-list" component={returnList}/>
                            <Redirect to="/manage/order/order-list"/>
                        </Switch>
                    </HashRouter>
                </div>
            </div>
        );
    }
}
