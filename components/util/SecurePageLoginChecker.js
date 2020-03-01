import React from 'react';
import Router from 'next/router';

class SecurePageLoginChecker extends React.Component {
    checkUserLogin = () => {
        if(this.props.user === null) {
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