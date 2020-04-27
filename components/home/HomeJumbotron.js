import React from 'react';
import {
    Button,
    Jumbotron
} from 'reactstrap';
import Constants from '../util/constants';
import UserContextWrapper from '../util/UserContextWrapper';
import LoginModal from '../navbar/LoginModal';
import RegisterModal from '../navbar/RegisterModal';

class HomeJumbotron extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoginModalOpen: false,
            isRegisterModalOpen: false
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

    render() {
        return (
            <Jumbotron>
                <h1 className="display-3">Play!</h1>
                <p className="lead">Play against players around the world, without ever being online at the same time!</p>
                <hr className="my-2" />
                {this.props.user ?
                    <div>
                        <p>Join a game queue to start playing</p>
                    </div>
                    :
                    <div>
                        <p>Login or Register to start playing</p>
                        <p className="lead">
                            <Button color="primary" onClick={this.toggleLoginModal}>Login</Button>
                            <Button color="secondary" style={{marginLeft: "12px"}} onClick={this.toggleRegisterModal}>Register</Button>
                        </p>
                    </div>
                }
                
                <UserContextWrapper>
                    <LoginModal isOpen={this.state.isLoginModalOpen} toggle={this.toggleLoginModal}/>
                </UserContextWrapper>
                <RegisterModal isOpen={this.state.isRegisterModalOpen} toggle={this.toggleRegisterModal}/>
            </Jumbotron>
            
        );
    }
}

export default HomeJumbotron;