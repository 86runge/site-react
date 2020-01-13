import React from 'react';
import ManageMenu from "../../components/manage-menu/manage-menu";

export default class Setting extends React.Component{
    render() {
        return(
            <div className={'manage-section'}>
                <div className={'manage-sidebar'}>
                    <ManageMenu/>
                </div>
                <div className={'manage-main'}>
                    'setting'
                </div>
            </div>
        );
    }
}
