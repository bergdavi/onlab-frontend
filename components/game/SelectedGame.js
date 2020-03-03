import React from 'react';
import {
    Card, Row, CardImg, CardBody, CardTitle, CardText, Button, Col
} from 'reactstrap';
import Router from 'next/router';
import Constants from '../util/constants'

class SelectedGame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    onJoinQueue = async () => {
        const res = await fetch(`${Constants.api.pathPrefix}/games/${this.props.game.id}/queue`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(res.status === 200) {
            const queuePlace = await res.text();
            this.setState({queuePlace: queuePlace});
        } else {
            console.log("Bad turn");
            // TODO proper turn handling
        }
    }

    render() {
        let game = this.props.game;

        if(!game) {
            return null;
        }

        let joinQueueButton = null;
        if(this.state.queuePlace) {
            joinQueueButton = <Button color="success" disabled style={{width: "100%", height: "40px", position: "relative", bottom: 0}}>Place in queue: {this.state.queuePlace}</Button>;
        } else {
            joinQueueButton = <Button color="primary" onClick={this.onJoinQueue} style={{width: "100%", height: "40px", position: "relative", bottom: 0}}>Join game queue</Button>;
        }
            
        return (
            <div style={{width: "100%", height: "250px", backgroundColor: "lightGray", padding: "25px"}}>
                <Row style={{height: "100%"}}>
                    <Col style={{height: "100%"}}>
                        <img src="https://via.placeholder.com/400x200" style={{width: "100%", height: "100%", objectFit: "cover"}}></img>
                    </Col>
                    <Col style={{height: "100%"}}>
                        <div style={{width: "100%", height: "80px", overflow: "auto"}}>
                            <h1 style={{marginBottom: 0}}>{game.name}</h1>
                            <h2 style={{fontSize: "20px"}}>Players: {`${game.minPlayers}-${game.maxPlayers}`}</h2>
                        </div>
                        <div style={{width: "100%", height: "80px", overflow: "auto"}}>
                            <p style={{fontSize: "20px"}}>{game.description}</p>
                        </div>
                        {joinQueueButton}
                    </Col>
                    <Col>
                        Placeholder for invite user panel
                    </Col>
                </Row>
            </div>
        );        
    }
}

export default SelectedGame;