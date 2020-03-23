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
    DropdownItem
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
            <Navbar color="light" light expand="md">
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <Link href="/"><NavLink>Home</NavLink></Link>
                        </NavItem>
                        <NavItem>
                            <Link href="/games"><NavLink>Games</NavLink></Link>
                        </NavItem>
                        <NavItem>
                            <Link href="/user/gameplays"><NavLink>User</NavLink></Link>
                        </NavItem>
                    </Nav>                    
                    <Nav>
                        <UserContextWrapper>
                            <LoginNavItem/>
                        </UserContextWrapper>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export default NavBar;