import React from 'react';
import {
    Card, Row, CardImg, CardBody, CardTitle, CardText, Button, Col, ListGroup, ListGroupItem, Input, Spinner, Table
} from 'reactstrap';
import Router from 'next/router';
import Constants from '../util/constants'
import ErrorHandler from './errorHandler';

class UserSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            searchInput: "",
            searchUsers: []
        };
    }

    componentDidUpdate(previousProps) {
        if(previousProps && previousProps.game && this.props.game.id !== previousProps.game.id) {
            this.setState({
                isLoading: false,
                searchInput: "",
                searchUsers: []
            });
        }
    }

    searchUser = async (username) => {
        const res = await fetch(`${Constants.api.pathPrefix}/users?username=${username}`);
        if(res.status === 200) {
            const users = await res.json();
            // TODO filter out own user
            this.setState({
                searchUsers : users,
                isLoading: false
            });
        } else {
            ErrorHandler.sendError({message: "Failed to get users"});
            this.setState({isLoading: false});
        }
    }

    onInputChanged = (input) => {
        this.setState({searchInput: input});
        if(this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = undefined;
        }
        if(input === "") {
            this.setState({
                searchUsers: [],
                isLoading: false
            });
        } else {
            this.setState({isLoading: true});
            this.timeout = setTimeout(() => {
                this.searchUser(input);
                this.timeout = undefined;
            }, 1000);
        }
    }

    onButtonClick = (user) => {
        this.props.btnCallback(user);
        this.onInputChanged("");
    }

    render() {            
        return (
            <div>
                <Input type="search" autoComplete="username" id="usernameInput" placeholder="Search for user" autoComplete="off" onChange={(e) => this.onInputChanged(e.target.value)} value={this.state.searchInput}></Input>
                <ListGroup style={{position: "absolute", width: "100%"}}>
                    {
                        this.state.isLoading ?
                        <ListGroupItem><Spinner style={{width: "22px", height: "22px"}}></Spinner></ListGroupItem>
                        :
                        this.state.searchUsers.map((user) => <ListGroupItem key={user.id}>{user.username}<Button color="primary" onClick={() => this.onButtonClick(user)} style={{float: "right", height: "25px", paddingTop: "0", paddingBottom: "0"}}>{this.props.btnText}</Button></ListGroupItem>)
                    }                    
                </ListGroup>
            </div>
        );
    }
}

export default UserSearch;