import React from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import Constants from '../util/constants';

class RegisterModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            registerUsernameInput: '',
            registerEmailInput: '',
            registerPasswordInput: '',
            registerRepeatPasswordInput: '',
            registerIsAdminInput: false
        };
    }

    toggle = async () => {
        this.setState({
            registerUsernameInput: '',
            registerEmailInput: '',
            registerPasswordInput: '',
            registerRepeatPasswordInput: '',
            registerIsAdminInput: false
        });
        this.props.toggle();
    }

    submitRegister = async (e) => {
        e.preventDefault();
        const data = JSON.stringify({
            username: this.state.registerUsernameInput,
            email: this.state.registerEmailInput,
            password: this.state.registerPasswordInput,
            userType: this.state.registerIsAdminInput ? 'admin' : 'user'
        });
        const res = await fetch(`${Constants.api.pathPrefix}/users/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
        if(res.status === 200) {
            this.toggle();
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                <ModalBody>
                    <Form id="registerForm" onSubmit={this.submitRegister}>
                        <FormGroup>
                            <Label for="registerUsername">Username</Label>
                            <Input autoComplete="username" type="text" onChange={(e) => this.setState({registerUsernameInput: e.target.value})} value={this.state.registerUsernameInput} name="username" id="registerUsername" placeholder="Username" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="registerEmail">Email address</Label>
                            <Input autoComplete="email" type="text" onChange={(e) => this.setState({registerEmailInput: e.target.value})} value={this.state.registerEmailInput} name="email" id="registerEmail" placeholder="Email address" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="registerPassword">Password</Label>
                            <Input autoComplete="password" type="password" onChange={(e) => this.setState({registerPasswordInput: e.target.value})} value={this.state.registerPasswordInput} name="password" id="registerPassword" placeholder="Password" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="registerRepeatPassword">Repeat Password</Label>
                            <Input autoComplete="repeat-password" type="password" onChange={(e) => this.setState({registerRepeatPasswordInput: e.target.value})} value={this.state.registerRepeatPasswordInput} name="password" id="registerRepeatPassword" placeholder="Repeat password" />
                        </FormGroup>
                        {this.props.admin ?
                        <FormGroup check>
                            <Label check for="registerIsAdmin">
                                <Input type="checkbox" onChange={(e) => this.setState({registerIsAdminInput: e.target.value})} value={this.state.registerIsAdminInput} name="isAdmin" id="registerIsAdmin" />
                                Admin
                            </Label>
                        </FormGroup>
                         :
                        ""
                        }
                        <Button color="primary" type="submit">Register</Button>
                    </Form>
                </ModalBody>
            </Modal>
        );
    }
}

export default RegisterModal;