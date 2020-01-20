import React from 'react';
import RegisterForm from "./register-form";
import UserHeader from '../../../user/components/user-header/user-header'

export default class register extends React.Component{
    render() {
        return(
            <div className={'user-content'}>
                <div className={'user-header-box'}>
                    <UserHeader type={'register'} />
                </div>
                <div className={'user-main'}>
                    <div className={'user-form-operate'}>
                        <RegisterForm />
                    </div>
                </div>
            </div>
        )
    }
}
