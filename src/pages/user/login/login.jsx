import React from 'react';

export default class login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            route: props.route,
        }
    }

    render() {
        return(
            <div>
                <div>'login'</div>
            </div>
        )
    }
}