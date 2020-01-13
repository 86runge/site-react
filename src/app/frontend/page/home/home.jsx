import React from 'react';
import {Link} from 'react-router-dom';

import Header from '@/frontend/components/header/header';
import Nav from '@/frontend/components/nav/nav';
import Footer from '@/frontend/components/footer/footer';

import './home.scss';

export default class Home extends React.Component {

    render() {
        return (
            <div className={'page'}>
                <Header/>
                <Nav/>
                <div className={'main-content'}>
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
                    <Link to="/manage/overview">
                        <div>点击跳转到Page3</div>
                    </Link>
                </div>
                <Footer/>
            </div>
        );
    }
}
