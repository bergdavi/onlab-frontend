import React from 'react';
import {
    Card, Row, Alert, Button
} from 'reactstrap';
import { Client, Message } from '@stomp/stompjs';
import Constants from '../util/constants'

class GameWrapper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    getGameplay = async (gameplayId) => {
        const res = await fetch(`${Constants.api.pathPrefix}/gameplays/${gameplayId}`);
        if(res.status === 200) {
            const gameplay = await res.json();
            return gameplay;
        } else {
            return null;
        }
    }

    updateComponent = async () => {
        if(!this.props.gameplayId) {
            return;
        }
        this.openSocket(this.props.gameplayId);
        let gameplay = await this.getGameplay(this.props.gameplayId);
        if(gameplay) {
            let gameId = gameplay.game.id;
            let gameState = JSON.parse(gameplay.gameState);
            import(`./games/${gameId}`).then(({default: componentClass}) => {
                this.setState({
                    componentClass: componentClass,
                    gameState: gameState
                });
            });
        }
    }

    componentDidMount() {
        this.updateComponent()
    }

    componentWillUnmount() {
        this.client.deactivate();
    }

    async componentDidUpdate(previousProps) {
        if(!previousProps || (this.props.gameplayId && previousProps.gameplayId !== this.props.gameplayId)) {
            this.updateComponent();
        }
    }

    openSocket = (gameplayId) => {
        if(this.client) {
            this.client.deactivate();
        } else {
            this.client = new Client();
        }        
        // TODO server prefix?
        this.client.brokerURL = `${Constants.api.webSocketProtocol}://${window.location.host}${Constants.api.webSocketPrefix}/gameplay`;
        this.client.activate();
        this.client.onConnect = () => {
            this.client.subscribe(`/user/topic/gameplay/${gameplayId}`, (message) => {
                console.log(message);
                console.log(message.body);
                let messageType = message.body.substring(0, 1);
                let messageBody = JSON.parse(message.body.substring(2));
                switch(messageType) {
                    case 's': // new state
                        this.receivedState(messageBody);
                        break;
                    case 't': // turn related info
                        alert(messageBody.status);
                        this.forceUpdate();
                        break;
                    case 'e': // end of game
                        this.setState({gameResult: messageBody});
                        break;
                }
            });
        }
    }

    receivedState = (gameState) => {
        this.setState({gameState: gameState});
    }

    sendTurn = async (gameTurn) => {
        gameTurn = JSON.stringify(gameTurn);
        this.client.publish({destination: `/app/gameplay/${this.props.gameplayId}`, body: gameTurn});
    }

    closeAlert = () => {
        this.setState({alertClosed: true});
    }

    renderAlert =  () => {
        if(!this.state.gameResult || this.state.alertClosed) return "";
        let alertColor;
        let alertText;
        switch(this.state.gameResult.result) {
            case 'win':
                alertColor = "success";
                alertText = "The game ended! You won!";
                break;
            case 'lose':
                alertColor = "danger";
                alertText = "The game ended! You lost!";
                break;
            case 'draw':
                alertColor = "secondary";
                alertText = "The game ended in a draw!";
                break;
        }
        return (
            <Alert color={alertColor} style={{position: "absolute", width: "calc(100% - 2*15px - 20px)", left: "calc(15px + 10px)", top: "10px"}}>
                {alertText}
                <Button close onClick={this.closeAlert}></Button>
            </Alert>
        )
    }

    render() {        
        if(!this.state.componentClass) {
            return "Loading...";
        }

        let GameComponent = this.state.componentClass;

        return (
            <div>
                {this.renderAlert()}
                {/* TODO pass userIdx to the game */}
                <GameComponent gameState={this.state.gameState} sendTurn={this.sendTurn} style={{width: "100%", height: "100%"}}></GameComponent>
            </div>
        );        
    }
}

export default GameWrapper;