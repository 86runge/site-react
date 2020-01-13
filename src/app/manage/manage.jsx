import React from 'react';
import './manage.scss';

import ManageNav from './components/manage-nav/manage-nav';

import ManageRouter from "./router";

export default class Manage extends React.Component {
    render() {
        return(
            <div className={'manage-box'}>
                <div className={'manage-nav-box'}>
                    <ManageNav/>
                </div>
                <ManageRouter/>
            </div>
        )
    }
}
