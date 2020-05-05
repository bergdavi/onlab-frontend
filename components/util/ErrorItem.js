import React from 'react';
import {
    UncontrolledAlert
} from 'reactstrap';
import Router from 'next/router';

class ErrorItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {visible: true};
    }

    render() {
        return (    
            <UncontrolledAlert color="danger" style={{margin: "10px"}}>
                {this.props.error.message}
            </UncontrolledAlert>
        );        
    }
}

export default ErrorItem;