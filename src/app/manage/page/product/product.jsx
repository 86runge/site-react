import React from 'react';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';

import AsyncLoader from "../../../common/utils/component/async-loader";
import ManageMenu from "../../components/manage-menu/manage-menu";
import {PRODUCT} from "../../../common/const/manage/manage-menu";

const productList = AsyncLoader(() => import ('./product-list/product-list'));
const productCategory = AsyncLoader(() => import ('./product-category/product-category'));
const productAttribute = AsyncLoader(() => import ('./product-attribute/product-attribute'));

export default class Setting extends React.Component {
    render() {
        return (
            <div className={'manage-section'}>
                <div className={'manage-sidebar'}>
                    <ManageMenu menuObj={PRODUCT}/>
                </div>
                <div className={'manage-main'}>
                    <HashRouter>
                        <Switch>
                            <Route path="/manage/product/product-list" component={productList}/>
                            <Route path="/manage/product/product-category" component={productCategory}/>
                            <Route path="/manage/product/product-attribute" component={productAttribute}/>
                            <Redirect to="/manage/product/product-list"/>
                        </Switch>
                    </HashRouter>
                </div>
            </div>
        );
    }
}
