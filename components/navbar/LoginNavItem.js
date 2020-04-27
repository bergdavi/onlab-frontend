import React from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    NavbarText,
    Spinner
} from 'reactstrap';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import Constants from '../util/constants';
import UserContextWrapper from '../util/UserContextWrapper';

class LoginNavItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoginModalOpen: false,
            isRegisterModalOpen: false,
            loading: false
        }
    }

    toggleLoginModal = () => {
        this.setState({ 
            isLoginModalOpen: !this.state.isLoginModalOpen,
        });
    }

    toggleRegisterModal = () => {
        this.setState({
            isRegisterModalOpen: !this.state.isRegisterModalOpen,
        });
    }

    submitLogout = async () => {
        const res = await fetch(`${Constants.api.pathPrefix}/users/logout`, {
            method: "POST"
        });
        this.props.updateUser(null);
    }

    isUserLoggedIn = () => {
        return !!this.props.user.user;
    }

    getUserDetails = () => {
        return this.props.user.user;
    }

    render() {
        let loginButton;
        let registerButton;
        let loginText;


        if(this.props.user) {
            loginButton = <Button onClick={this.submitLogout} color="danger" style={{marginRight: "15px"}}>Logout</Button>
            loginText = `Logged in as ${this.getUserDetails().username}`;
        } else {
            loginButton = <Button id="loginButton" color="primary" onClick={this.toggleLoginModal} style={{marginRight: "15px"}}>Login</Button>
            registerButton = <Button id="registerButton" color="secondary" onClick={this.toggleRegisterModal} style={{marginRight: "15px"}}>Register</Button>
            loginText = `User not logged in`;
        }

        return (
            <div>
                <NavbarText style={{marginRight: "15px"}}>{loginText}</NavbarText>
                {loginButton}
                {registerButton}
                <UserContextWrapper>
                    <LoginModal isOpen={this.state.isLoginModalOpen} toggle={this.toggleLoginModal}/>
                </UserContextWrapper>
                <RegisterModal isOpen={this.state.isRegisterModalOpen} toggle={this.toggleRegisterModal}/>
            </div>
        );
    }
}

export default LoginNavItem;