import React from 'react';
import {
    Toast, ToastHeader, ToastBody
} from 'reactstrap';
import Router from 'next/router';
import NotifyToast from './NotifyToast';
import { Client, Message } from '@stomp/stompjs';
import uuid, { v4 as uuidv4 } from 'uuid';


class NotificationList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {notifications: []};
    }

    componentDidMount() {
        this.openSocket();
    }

    componentWillUnmount() {
        this.client.deactivate();
    }

    openSocket = () => {
        if(this.client) {
            this.client.deactivate();
        } else {
            this.client = new Client();
        }        
        // TODO server prefix?
        this.client.brokerURL = `ws://${window.location.host}/notification`;
        this.client.activate();
        this.client.onConnect = () => {
            this.client.subscribe(`/user/topic/notification`, (message) => {
                let notification = JSON.parse(message.body);
                let id = uuidv4();
                notification.id = id;
                this.receivedNotification(notification);
                setTimeout(() => this.timeoutNotification(id), 10000);
            });
        }
    }

    receivedNotification = (notification) => {
        let notifications = this.state.notifications;
        notifications.push(notification);
        this.setState({notifications: notifications});
    }

    timeoutNotification = (notificationId) => {
        let notifications = this.state.notifications.filter(notification => notification.id !== notificationId);
        this.setState({notifications: notifications});
    }

    render() {
        return (
            <div style={{position: "fixed", margin: "10px", right: "0", top: "0", zIndex: "10000"}}>
                {this.state.notifications.map(notification => <NotifyToast notification={notification} />)}
            </div>
        );        
    }
}

export default NotificationList;