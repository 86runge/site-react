import React from 'react';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';

import AsyncLoader from "../../../common/utils/component/async-loader";
import ManageMenu from "../../components/manage-menu/manage-menu";
import {BUSINESS} from "../../../common/const/manage/manage-menu";

const businessList = AsyncLoader(() => import ('./business-list/business-list'));
const enterpriseList = AsyncLoader(() => import ('./enterprise-list/enterprise-list'));

export default class Business extends React.Component{
    render() {
        return(
            <div className={'manage-section'}>
                <div className={'manage-sidebar'}>
                    <ManageMenu menuObj={BUSINESS}/>
                </div>
                <div className={'manage-main'}>
                    <HashRouter>
                        <Switch>
                            <Route path="/manage/business/business-list" component={businessList}/>
                            <Route path="/manage/business/enterprise-list" component={enterpriseList}/>
                            <Redirect to="/manage/business/business-list"/>
                        </Switch>
                    </HashRouter>
                </div>
            </div>
        );
    }
}
