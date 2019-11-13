import React from 'react';

export default class user extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            route: props.route,
        }
    }

    render() {
        return(
            <div>
                <div>'user'</div>
                {this.props.children}
            </div>
        )
    }
}
