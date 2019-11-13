import React from 'react';
import { Link } from 'react-router-dom';
import './home.scss';

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <div style={{width: '200px', height: '200px', margin: '50px auto'}}>
                    <p>This is Home!</p>
                    <Link to="/user/login">
                        <div>点击跳转到Page1</div>
                    </Link>
                    <Link to="/user/register">
                        <div>点击跳转到Page2</div>
                    </Link>
                    <Link to="/user/forgot">
                        <div>点击跳转到Page3</div>
                    </Link>
                    <Link to="/manage">
                        <div>点击跳转到Page3</div>
                    </Link>
                </div>
            </div>
        );
    }
}
