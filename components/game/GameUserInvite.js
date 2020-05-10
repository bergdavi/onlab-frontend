import React from 'react';
import {
    Card, Row, CardImg, CardBody, CardTitle, CardText, Button, Col, ListGroup, ListGroupItem, Input, Spinner, Table
} from 'reactstrap';
import Router from 'next/router';
import Constants from '../util/constants'
import UserSearch from '../util/UserSearch';

class GameUserInvite extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            inviteLoading: false,
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

    addUser = (user) => {
        if(!this.state.inviteUsers.some((u) => u.id === user.id)) {
            let inviteUsers = this.state.inviteUsers;
            inviteUsers.push(user);
            this.setState({inviteUsers, sentInvite: false});
        }
    }

    removeUser = (user) => {
        let inviteUsers = this.state.inviteUsers.filter((u) => u.id !== user.id);
        this.setState({inviteUsers, sentInvite: false});
    }

    sendInvite = async () => {
        this.setState({inviteLoading: true});
        let data = JSON.stringify(this.state.inviteUsers.map((u) => u.id));
        const res = await fetch(`${Constants.api.pathPrefix}/games/${this.props.game.id}/invite`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
        if(res.status === 200) {
            this.setState({sentInvite: true, inviteLoading: false});
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
        } else if(this.state.inviteLoading) {
            inviteButton = <Button color="primary" disabled style={{width: "100%", position: "absolute", bottom: "0"}}><Spinner type="border" style={{width: "26px", height: "26px"}} /></Button>
        } else {
            inviteButton = <Button color="primary" onClick={this.sendInvite} style={{width: "100%", position: "absolute", bottom: "0"}}>Send invite</Button>
        }
            
        return (
            <div style={{position: "relative", height: "100%"}}>
                <UserSearch btnCallback={this.addUser.bind(this)} btnText="Add"></UserSearch>
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