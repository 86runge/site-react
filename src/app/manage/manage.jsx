import React from 'react';
import './manage.scss';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import store, {persistor} from "./store/store";

import ManageNav from './components/manage-nav/manage-nav';

import ManageRouter from "./router";

export default class Manage extends React.Component {
    render() {
        return(
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
            <div className={'manage-box'}>
                <div className={'manage-nav-box'}>
                    <ManageNav/>
                </div>
                <ManageRouter/>
            </div>
                </PersistGate>
            </Provider>
        )
    }
}
