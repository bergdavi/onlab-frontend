import React from 'react';
import Router from 'next/router';
import UserContextWrapper from './UserContextWrapper';
import SecurePageLoginChecker from './SecurePageLoginChecker';

class SecurePage extends React.Component {
    render() {
        return (
            <UserContextWrapper>
                <SecurePageLoginChecker>
                    {this.props.children}
                </SecurePageLoginChecker>
            </UserContextWrapper>
        );
    }
}

export default SecurePage;