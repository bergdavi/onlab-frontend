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
import Constants from '../util/constants'

class LoginNavItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoginModalOpen: false,
            isRegisterModalOpen: false,
            loginUsernameInput: '',
            loginPasswordInput: '',
            registerUsernameInput: '',
            registerEmailInput: '',
            registerPasswordInput: '',
            registerRepeatPasswordInput: ''
        }
    }

    toggleLoginModal = () => {
        this.setState({ 
            isLoginModalOpen: !this.state.isLoginModalOpen,
            loginUsernameInput: '',
            loginPasswordInput: ''
        });
    }

    toggleRegisterModal = () => {
        this.setState({
            isRegisterModalOpen: !this.state.isRegisterModalOpen,
            registerUsernameInput: '',
            registerPasswordInput: ''
        });
    }

    submitLogin = async (e) => {
        e.preventDefault();
        const data = JSON.stringify({
            username: this.state.loginUsernameInput,
            password: this.state.loginPasswordInput
        });
        const res = await fetch(`${Constants.api.pathPrefix}/users/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
        if(res.status === 200) {
            const user = await res.json();
            this.toggleLoginModal();
            this.props.updateUser(user);
        } else {
            this.setState({
                passwordInput: ""
            });
        }
    }

    submitRegister = async (e) => {
        e.preventDefault();
        const data = JSON.stringify({
            username: this.state.registerUsernameInput,
            email: this.state.registerEmailInput,
            password: this.state.registerPasswordInput
        });
        const res = await fetch(`${Constants.api.pathPrefix}/users/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
        if(res.status === 200) {
            this.toggleRegisterModal();
        }
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
                <Modal isOpen={this.state.isLoginModalOpen} toggle={this.toggleLoginModal}>
                    <ModalHeader toggle={this.toggleLoginModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form id="loginForm" onSubmit={this.submitLogin}>
                            <FormGroup>
                                <Label for="loginUsername">Username</Label>
                                <Input type="text" onChange={(e) => this.setState({loginUsernameInput: e.target.value})} value={this.state.loginUsernameInput} name="username" id="loginUsername" placeholder="Username" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="loginPassword">Password</Label>
                                <Input type="password" onChange={(e) => this.setState({loginPasswordInput: e.target.value})} value={this.state.loginPasswordInput} name="password" id="loginPassword" placeholder="Password" />
                            </FormGroup>
                            <Button color="primary" type="submit">
                                Login
                                {/* <Spinner animation="grow" /> */}
                            </Button>
                        </Form>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.isRegisterModalOpen} toggle={this.toggleRegisterModal}>
                    <ModalHeader toggle={this.toggleRegisterModal}>Register</ModalHeader>
                    <ModalBody>
                        <Form id="registerForm" onSubmit={this.submitRegister}>
                            <FormGroup>
                                <Label for="registerUsername">Username</Label>
                                <Input type="text" onChange={(e) => this.setState({registerUsernameInput: e.target.value})} value={this.state.registerUsernameInput} name="username" id="registerUsername" placeholder="Username" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="registerEmail">Email address</Label>
                                <Input type="text" onChange={(e) => this.setState({registerEmailInput: e.target.value})} value={this.state.registerEmailInput} name="email" id="registerEmail" placeholder="Email address" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="registerPassword">Password</Label>
                                <Input type="password" onChange={(e) => this.setState({registerPasswordInput: e.target.value})} value={this.state.registerPasswordInput} name="password" id="registerPassword" placeholder="Password" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="registerRepeatPassword">Repeat Password</Label>
                                <Input type="password" onChange={(e) => this.setState({registerRepeatPasswordInput: e.target.value})} value={this.state.registerRepeatPasswordInput} name="password" id="registerRepeatPassword" placeholder="Repeat password" />
                            </FormGroup>
                            <Button color="primary" type="submit">Register</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default LoginNavItem;