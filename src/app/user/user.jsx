import React from 'react';
import './user.scss';

import UserRouter from './router';

export default class User extends React.Component {
    render() {
        return(
            <div className={'user-box'}>
                <UserRouter/>
            </div>
        )
    }
}
