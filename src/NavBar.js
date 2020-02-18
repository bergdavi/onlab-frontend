import $ from 'jquery';
import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Button
} from 'reactstrap';
import LoginModal from './LoginModal';
import './NavBar.css';

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

    // TODO move logIn and logOut functions to the same class
    logout = () => {
        $.post("/api/game-service/v1/users/logout").then(
            () => {
                this.props.userUpdated(undefined);
            }).catch(
            () => {
                this.props.userUpdated(undefined);
            }
        );
    }

    loginButton = () => {
        let login;
        let text;
        if(this.props.user) {
            login = <Button onClick={this.logout} color="danger">Logout</Button>
            text = `Logged in as ${this.props.user.user.username}`
        } else {            
            login = <LoginModal userUpdated={this.props.userUpdated}></LoginModal>
            text = `User not logged in`
        }
        return (
            <Nav right navbar>
                <NavbarText className="NavBarText">{text}</NavbarText>
                <NavItem>
                    {login}
                </NavItem>
            </Nav>
        );
    }

    render() {
        return (
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">reactstrap</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/components/">Components</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Options
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Option 1
                                </DropdownItem>
                                <DropdownItem>
                                    Option 2
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    Reset
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>                    
                    {this.loginButton()}                    
                </Collapse>
            </Navbar>
        );
    }
}

export default NavBar;