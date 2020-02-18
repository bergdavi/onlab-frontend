import $ from 'jquery';
import React from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import './NavBar.css';

class LoginModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    submitLogin = () => {
        $.post("/api/game-service/v1/users/login", $("#loginForm").serialize()).then(
            (user) => {
                this.props.userUpdated(user);
                this.toggle();
        }).catch(
            () => {
                this.props.userUpdated(undefined);
            }
        );
    }

    render() {
        return (
            <div>
                <Button id="loginButton" color="primary" onClick={this.toggle}>Login</Button>
                <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                    <ModalBody>
                        <Form id="loginForm">
                            <FormGroup>
                                <Label for="loginUsername">Username</Label>
                                <Input type="text" name="username" id="loginUsername" placeholder="Username" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="loginPassword">Password</Label>
                                <Input type="password" name="password" id="loginPassword" placeholder="Password" />
                            </FormGroup>
                            <Button color="primary" onClick={this.submitLogin}>Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default LoginModal;