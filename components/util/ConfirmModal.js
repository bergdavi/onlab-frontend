import React from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from 'reactstrap';
import Constants from './constants';

class ConfirmModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loginUsernameInput: '',
            loginPasswordInput: ''
        };
    }

    toggle = () => {
        this.props.toggle();
    }

    onPositive = () => {
        this.props.toggle();
        this.props.onPositive();
    }

    onNegative = () => {
        this.props.toggle();
        this.props.onNegative();
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
                <ModalBody>
                    {this.props.text}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.onPositive}>{this.props.positiveText}</Button>{' '}
                    <Button color="danger" onClick={this.onNegative}>{this.props.negativeText}</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

ConfirmModal.defaultProps = {
    positiveText: "Yes",
    negativeText: "No",
    title: "Confirm",
    text: "Are you sure?",
    onNegative: () => {},
    onPositive: () => {}
};

export default ConfirmModal;