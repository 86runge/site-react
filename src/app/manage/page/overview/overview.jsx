import React from 'react';
import './overview.scss'

import {List, Card} from 'antd';

import OverviewChart from './overview-chart/overview-chart'
import OverviewTable from "./overview-table/overview-table";

export default class Overview extends React.Component {

    state = {
        data: [
            {
                title: '订单',
            },
            {
                title: '退款退货',
            },
            {
                title: '用户',
            },
            {
                title: '商家企业',
            },
            {
                title: '商品',
            },

            {
                title: '操作记录',
            }
        ]
    };

    render() {
        return (
            <div className={'manage-section overview-box'}>
                <div className={'overview-list-card'}>
                    <List
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 4,
                            lg: 4,
                            xl: 6,
                            xxl: 3,
                        }}
                        dataSource={this.state.data}
                        renderItem={item => (
                            <List.Item>
                                <Card title={item.title}>Card content</Card>
                            </List.Item>
                        )}
                    />
                </div>
                <div className={'overview-chart'}>
                    <OverviewChart/>
                </div>
                <div className={'overview-table'}>
                    <OverviewTable/>
                </div>
            </div>
        );
    }
}
