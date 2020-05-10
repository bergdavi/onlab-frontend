import React from 'react';
import Router from 'next/router';

class SecurePageLoginChecker extends React.Component {
    checkUserLogin = () => {
        if(typeof this.props.user === "undefined") {
            return;
        }
        if(this.props.user === null || this.props.user.user.banned || (this.props.type && this.props.user.user.userType !== this.props.type)) {
            Router.push('/');
        }
    }

    componentDidMount() {
        this.checkUserLogin();
    }

     componentDidUpdate() {
         this.checkUserLogin();
     }

     render() {
         return this.props.children;
     }
}

export default SecurePageLoginChecker;