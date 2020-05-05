import React from 'react';
import {
    Alert,
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import Link from "next/link";
import LoginNavItem from './LoginNavItem';
import UserContextWrapper from '../util/UserContextWrapper';

class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    toggle = () => {
        this.setState({isOpen: !this.state.isOpen});
    }

    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <Link href="/"><NavLink style={{cursor: "pointer"}}>Home</NavLink></Link>
                            </NavItem>
                            <NavItem>
                                <Link href="/leaderboards"><NavLink style={{cursor: "pointer"}}>Leaderboards</NavLink></Link>
                            </NavItem>
                            {this.props.user && !this.props.user.user.banned ? 
                            <NavItem>
                                <Link href="/games"><NavLink style={{cursor: "pointer"}}>Games</NavLink></Link>
                            </NavItem>
                            : ""}
                            {this.props.user && !this.props.user.user.banned ? 
                            <NavItem>
                                <Link href="/user/gameplays"><NavLink style={{cursor: "pointer"}}>User</NavLink></Link>
                            </NavItem>
                            : ""}
                            {this.props.user && this.props.user.user.userType === 'admin' ? 
                            <NavItem>
                                <Link href="/admin"><NavLink style={{cursor: "pointer"}}>Admin</NavLink></Link>
                            </NavItem>
                            : ""}
                        </Nav>
                        <Nav>
                            <UserContextWrapper>
                                <LoginNavItem/>
                            </UserContextWrapper>
                        </Nav>
                    </Collapse>
                </Navbar>
                {this.props.user && this.props.user.user.banned ? 
                <Alert color="danger">
                    <b>Your account has been banned!</b>
                </Alert>
                : ""}
                
            </div>
        );
    }
}

export default NavBar;