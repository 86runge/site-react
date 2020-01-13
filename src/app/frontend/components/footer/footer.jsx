import React from 'react';
import './footer.scss'

export default class Footer extends React.Component{
    render() {
        return(
            <div className={'footer'}>
                <div className={'footer-box'}>
                    <div className={'friend-link'}>
                        友好链接
                    </div>
                    <div className={'partner'}>
                        合作伙伴
                    </div>
                    <div className={'copyright'}>
                        <span>@Copyright@ 2004-2017</span><span>XX科技有限公司版权所有</span>
                    </div>
                </div>
            </div>
        )
    }
}
