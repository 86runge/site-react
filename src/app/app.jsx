import React from 'react';

// 引入 antd
import {ConfigProvider} from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';

// 引入样式
import './app.scss';

import AppRouter from './router';

moment.locale('zh-cn');

export default class App extends React.Component {
    render() {
        return (
            <ConfigProvider locale={zhCN}>
                <AppRouter/>
            </ConfigProvider>
        )
    }
}
