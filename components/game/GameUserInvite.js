import React from 'react';
import {
    Card, Row, CardImg, CardBody, CardTitle, CardText, Button, Col, ListGroup, ListGroupItem, Input, Spinner, Table
} from 'reactstrap';
import Router from 'next/router';
import Constants from '../util/constants'

class GameUserInvite extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            searchInput: "",
            searchUsers: [],
            inviteUsers: []
        };
    }

    componentDidUpdate(previousProps) {
        if(previousProps && previousProps.game && this.props.game.id !== previousProps.game.id) {
            this.setState({
                isLoading: false,
                sentInvite: false,
                searchInput: "",
                searchUsers: [],
                inviteUsers: []
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
            // TODO proper error handling
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

    addUser = (user) => {
        if(!this.state.inviteUsers.some((u) => u.id === user.id)) {
            let inviteUsers = this.state.inviteUsers;
            inviteUsers.push(user);
            this.setState({inviteUsers});
            this.onInputChanged("");
        }
    }

    removeUser = (user) => {
        let inviteUsers = this.state.inviteUsers.filter((u) => u.id !== user.id);
        this.setState({inviteUsers});
    }

    sendInvite = async () => {
        let data = JSON.stringify(this.state.inviteUsers.map((u) => u.id));
        const res = await fetch(`${Constants.api.pathPrefix}/games/${this.props.game.id}/invite`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
        if(res.status === 200) {
            this.setState({sentInvite: true});
        }
    }

    render() {
        let game = this.props.game;

        if(!game) {
            return null;
        }

        let inviteButton;
        if(game.maxPlayers < this.state.inviteUsers.length + 1) {
            inviteButton = <Button color="secondary" disabled style={{width: "100%", position: "absolute", bottom: "0"}}>Too many players</Button>
        } else if(game.minPlayers > this.state.inviteUsers.length + 1) {
            inviteButton = <Button color="secondary" disabled style={{width: "100%", position: "absolute", bottom: "0"}}>Not enough players</Button>
        } else if(this.state.sentInvite) {
            inviteButton = <Button color="success" disabled style={{width: "100%", position: "absolute", bottom: "0"}}>Invite sent</Button>
        } else {
            inviteButton = <Button color="primary" onClick={this.sendInvite} style={{width: "100%", position: "absolute", bottom: "0"}}>Send invite</Button>
        }
            
        return (
            <div style={{position: "relative", height: "100%"}}>
                <Input type="search" id="usernameInput" placeholder="Search for user" autoComplete="off" onChange={(e) => this.onInputChanged(e.target.value)} value={this.state.searchInput}></Input>
                <ListGroup style={{position: "absolute", width: "100%"}}>
                    {
                        this.state.isLoading ?
                        <ListGroupItem><Spinner style={{width: "22px", height: "22px"}}></Spinner></ListGroupItem>
                        :
                        this.state.searchUsers.map((user) => <ListGroupItem>{user.username}<Button color="primary" onClick={() => this.addUser(user)} style={{float: "right", height: "25px", paddingTop: "0", paddingBottom: "0"}}>Add</Button></ListGroupItem>)
                    }                    
                </ListGroup>
                <div style={{overflow: "auto", height: "120px"}}>
                    <Table>
                        <tbody>
                            {this.state.inviteUsers.map((user) => 
                                <tr>
                                <td>{user.username}</td>
                                <td><Button color="danger" onClick={() => this.removeUser(user)} style={{float: "right", height: "25px", paddingTop: "0", paddingBottom: "0"}}>Remove</Button></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
                {inviteButton}
            </div>
        );
    }
}

export default GameUserInvite;