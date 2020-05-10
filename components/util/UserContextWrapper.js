import React from 'react';
import {UserContext} from './UserContext';

class UserContextWrapper extends React.Component {
     render() {
        return ( 
            <UserContext.Consumer>
                {({user, updateUser, refreshUser}) => (                    
                    React.cloneElement(this.props.children, {user: user, updateUser: updateUser, refreshUser: refreshUser})                    
                )}
            </UserContext.Consumer>
        );
     }
}

export default UserContextWrapper;