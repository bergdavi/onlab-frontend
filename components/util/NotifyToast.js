import React from 'react';
import {
    Toast, ToastHeader, ToastBody
} from 'reactstrap';
import Router from 'next/router';

class NotifyToast extends React.Component {

    constructor(props) {
        super(props);
        this.state = {visible: true};
    }

    toggle = () => {
        this.setState({visible: !this.state.visible});
    }

    render() {
        let message = this.props.notification.message;
        let title = this.props.notification.title;

        return (    
            <Toast isOpen={this.state.visible}>
                <ToastHeader toggle={this.toggle}>{title}</ToastHeader>
                <ToastBody>
                    {message}
                </ToastBody>
            </Toast>
        );        
    }
}

export default NotifyToast;