import React from 'react';
import ForgotForm from './forgot-form';
import UserHeader from '../../../user/components/user-header/user-header'

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            route: props.route,
        }
    }

    render() {
        return (
            <div className={'user-content'}>
                <div className={'user-header-box'}>
                    <UserHeader type={'forgot'} />
                </div>
                <div className={'user-main'}>
                    <div className={'user-form-operate'}>
                        <ForgotForm />
                    </div>
                </div>
            </div>
        )
    }
}
