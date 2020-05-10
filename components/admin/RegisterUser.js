import React from 'react';
import {
    Button,
    Row,
    Col
} from 'reactstrap';
import RegisterModal from '../navbar/RegisterModal';

class RegisterUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isRegisterModalOpen: false,
            loading: false
        }
    }

    toggleRegisterModal = () => {
        this.setState({
            isRegisterModalOpen: !this.state.isRegisterModalOpen,
        });
    }

    render() {
        return (
            <div>
                <Button id="registerButton" color="secondary" onClick={this.toggleRegisterModal} style={{marginRight: "15px"}}>Register user</Button>
                <RegisterModal isOpen={this.state.isRegisterModalOpen} toggle={this.toggleRegisterModal} admin={true}/>
            </div>
        );
    }
}

export default RegisterUser;