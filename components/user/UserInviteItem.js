import React from 'react';
import {
    Card, Row, Col, Button
} from 'reactstrap';
import Constants from '../util/constants'

class UserInviteItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    acceptInvite = async () => {
        const res = await fetch(`${Constants.api.pathPrefix}/users/invites/${this.props.invite.id}/accept`, {
            method: "POST"
            
        });
        if(res.status === 200) {
            this.setState({acceptedInvite: true});
        }
    }

    declineInvite = async () => {
        const res = await fetch(`${Constants.api.pathPrefix}/users/invites/${this.props.invite.id}/decline`, {
            method: "POST"
        });
        if(res.status === 200) {
            this.setState({declinedInvite: true});
        }
    }

    render() {
        let invite = this.props.invite;
            
        if(this.state.declinedInvite) {
            return null;
        }

        return (
            <Card key={invite.id} style={{backgroundColor: "white"}}>
                <div className="cardContainer">
                    <Row>
                        <Col>
                            <div>
                                <h1>{invite.game.name}</h1>
                                <h2>Invited by: {invite.inviter.username}</h2>
                            </div>
                        </Col>
                        <Col>
                            {this.state.acceptedInvite?
                            <div style={{float: "right", height: "100%"}}>
                                <Button color="success" disabled style={{width: "150px", height: "100%"}}>Accepted</Button>
                            </div>
                            :
                            <div style={{float: "right"}}>
                                <div style={{margin: "5px"}}>
                                    <Button color="success" onClick={this.acceptInvite} style={{width: "150px"}}>Accept</Button>
                                </div>
                                <div style={{margin: "5px"}}>
                                    <Button color="danger" onClick={this.declineInvite} style={{width: "150px"}}>Decline</Button>
                                </div>
                            </div>
                            }                            
                        </Col>
                    </Row>
                </div>
                <style jsx>{`
                    h2 {
                        font-size: 22px;
                    }

                    .cardContainer {
                        padding: 20px;
                    }
                `}</style>
            </Card>
        );        
    }
}

export default UserInviteItem;