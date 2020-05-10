import React from 'react';
import {
    Card, Row, CardImg, CardBody, CardTitle, CardText, Button, Col, Modal, ModalBody, ModalHeader, Spinner
} from 'reactstrap';
import Router from 'next/router';
import Constants from '../util/constants'
import GameUserInvite from './GameUserInvite';
import ErrorHandler from '../util/errorHandler';

class SelectedGame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {joinLoading: false};
    }

    onJoinQueue = async () => {
        this.setState({joinLoading: true});
        const res = await fetch(`${Constants.api.pathPrefix}/games/${this.props.game.id}/queue`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(res.status === 200) {
            const queuePlace = await res.text();
            this.setState({queuePlace: queuePlace, joinLoading: false});
        } else {
            ErrorHandler.sendError({message: "Failed to join game queue"});
        }
    }

    toggle = () => {
        this.props.toggle();
        this.setState({queuePlace: undefined, joinLoading: false});
    }

    render() {
        let game = this.props.game;

        if(!game) {
            return null;
        }

        let joinQueueButton = null;
        if(this.state.queuePlace) {
            joinQueueButton = <Button color="success" disabled style={{width: "100%", position: "absolute", bottom: 0}}>Place in queue: {this.state.queuePlace}</Button>;
        } else if(this.state.joinLoading) {
            joinQueueButton = <Button color="primary" disabled style={{width: "100%", position: "absolute", bottom: 0}}><Spinner type="border" style={{width: "26px", height: "26px"}} /></Button>;
        } else {
            joinQueueButton = <Button color="primary" onClick={this.onJoinQueue} style={{width: "100%", position: "absolute", bottom: 0}}>Join game queue</Button>;
        }
            
        return (
            <Modal isOpen={this.props.open} toggle={this.toggle} size="lg">
                <ModalHeader toggle={this.toggle}>Join game</ModalHeader>
                <ModalBody>
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
                </ModalBody>
            </Modal>            
        );        
    }
}

export default SelectedGame;