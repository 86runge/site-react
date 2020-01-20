import React from 'react';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import ManageMenu from "../../components/manage-menu/manage-menu";

import AsyncLoader from "../../../common/utils/component/async-loader";
const basicSetting = AsyncLoader(() => import ('./basic-setting/basic-setting'));
const customSetting = AsyncLoader(() => import ('./custom-setting/custom-setting'));
const activityDiscount = AsyncLoader(() => import ('./activity-discount/activity-discount'));
const systemMessage = AsyncLoader(() => import ('./system-message/system-message'));

import {SETTING} from '../../../common/const/manage/manage-menu';

export default class Setting extends React.Component{
    render() {
        return(
            <div className={'manage-section'}>
                <div className={'manage-sidebar'}>
                    <ManageMenu menuObj={SETTING}/>
                </div>
                <div className={'manage-main'}>
                    <HashRouter>
                        <Switch>
                            <Route path="/manage/setting/basic-setting" component={basicSetting}/>
                            <Route path="/manage/setting/custom-setting" component={customSetting}/>
                            <Route path="/manage/setting/activity-discount" component={activityDiscount}/>
                            <Route path="/manage/setting/system-message" component={systemMessage}/>
                            <Redirect to="/manage/setting/basic-setting"/>
                        </Switch>
                    </HashRouter>
                </div>
            </div>
        );
    }
}
