import React from 'react';
import {
    Card, Row, CardImg, CardBody, CardTitle, CardText, Button, Col
} from 'reactstrap';
import Router from 'next/router';
import Constants from '../util/constants'
import GameUserInvite from './GameUserInvite';
import ErrorHandler from '../util/errorHandler';

class SelectedGame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidUpdate(previousProps) {
        if(previousProps && previousProps.game && this.props.game.id !== previousProps.game.id) {
            this.setState({queuePlace: undefined});
        }
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
            ErrorHandler.sendError({message: "Failed to join game queue"});
        }
    }

    render() {
        let game = this.props.game;

        if(!game) {
            return null;
        }

        let joinQueueButton = null;
        if(this.state.queuePlace) {
            joinQueueButton = <Button color="success" disabled style={{width: "100%", position: "absolute", bottom: 0}}>Place in queue: {this.state.queuePlace}</Button>;
        } else {
            joinQueueButton = <Button color="primary" onClick={this.onJoinQueue} style={{width: "100%", position: "absolute", bottom: 0}}>Join game queue</Button>;
        }
            
        return (
            <div style={{width: "100%", height: "250px", backgroundColor: "lightGray", padding: "25px"}}>
                <Row style={{height: "100%"}}>
                    <Col style={{height: "100%"}}>
                        <img src={`/${game.id}.png`} style={{width: "100%", height: "100%", objectFit: "contain"}}></img>
                    </Col>
                    <Col>
                        <div style={{position: "relative", height: "100%"}}>
                            <div style={{width: "100%", height: "80px", overflow: "auto"}}>
                                <h1 style={{marginBottom: 0}}>{game.name}</h1>
                                <h2 style={{fontSize: "20px"}}>Players: {`${game.minPlayers}-${game.maxPlayers}`}</h2>
                            </div>
                            <div style={{width: "100%", height: "80px", overflow: "auto"}}>
                                <p style={{fontSize: "20px"}}>{game.description}</p>
                            </div>
                            {joinQueueButton}
                        </div>
                    </Col>
                    <Col>
                        <GameUserInvite game={game}/>
                    </Col>
                </Row>
            </div>
        );        
    }
}

export default SelectedGame;