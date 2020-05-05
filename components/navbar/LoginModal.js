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
import Constants from '../util/constants';

class LoginModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loginUsernameInput: '',
            loginPasswordInput: ''
        };
    }    

    submitLogin = async (e) => {
        e.preventDefault();
        this.setState({loading: true});
        let data = [];
        data.push('username=' + this.state.loginUsernameInput);
        data.push('password=' + this.state.loginPasswordInput);
        data = data.join('&');
        const res = await fetch(`${Constants.api.pathPrefix}/users/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });
        if(res.status === 200) {
            this.getUser();
        } else {
            // TODO better error handling
            this.setState({
                loginPasswordInput: "",
                loading: false
            });
        }
    }

    toggle = async () => {
        this.setState({
            loginUsernameInput: '',
            loginPasswordInput: ''
        });
        this.props.toggle();
    }

    getUser = async () => {
        const res = await fetch(`${Constants.api.pathPrefix}/users/current`);
        if(res.status === 200) {
            const user = await res.json();
            this.props.updateUser(user);
        }
        setTimeout(() => this.setState({loading: false}), 1000);
        this.toggle();
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Login</ModalHeader>
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
                        <Button color="primary" type="submit" disabled={this.state.loading} style={{width: "70px", height: "40px"}}>
                            {this.state.loading?<Spinner type="border" style={{width: "26px", height: "26px"}} />:"Login"}
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>
        );
    }
}

export default LoginModal;