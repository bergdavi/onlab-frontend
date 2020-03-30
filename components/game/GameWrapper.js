import React from 'react';
import {
    Card, Row, Alert, Button, Col
} from 'reactstrap';
import { Client, Message } from '@stomp/stompjs';
import Constants from '../util/constants';
import GameplaySidebar from './GameplaySidebar';
import UserContextWrapper from '../util/UserContextWrapper';
import UserGameplayList from './UserGameplayList'

class GameWrapper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    getGameplay = async (gameplayId) => {
        const res = await fetch(`${Constants.api.pathPrefix}/gameplays/${gameplayId}/user`);
        if(res.status === 200) {
            const userGameplay = await res.json();
            return userGameplay;
        } else {
            return null;
        }
    }

    updateComponent = async () => {
        if(!this.props.gameplayId) {
            return;
        }
        this.openSocket(this.props.gameplayId);
        let userGameplay = await this.getGameplay(this.props.gameplayId);
        if(userGameplay) {
            let gameplay = userGameplay.gameplay;
            let userIdx = userGameplay.userIdx;
            if(gameplay) {
                let gameId = gameplay.game.id;
                let gameState = JSON.parse(gameplay.gameState);
                import(`./games/${gameId}`).then(({default: componentClass}) => {
                    this.setState({
                        componentClass,
                        gameState,
                        gameplay,
                        userIdx
                    });
                });
            }
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
                let messageType = message.body.substring(0, 1);
                let messageBody = JSON.parse(message.body.substring(2));
                switch(messageType) {
                    case 's': // new state
                        this.receivedState(messageBody);
                        break;
                    case 't': // turn related info
                        switch(messageBody.status) {
                            case 'invalid_step':
                                this.showAlert('warning', 'Invalid step, please try again!', 3);
                                break;
                            case 'invalid_user':
                                this.showAlert('warning', 'It is not your turn, please wait!', 3);
                                break;
                            // TODO this should be game over
                            case 'finished':
                                this.showAlert('warning', 'The game is over', 3);
                                break;
                            case 'unexpected_error':
                                this.showAlert('warning', 'Unexpected error', 3);
                                break;
                        }
                        this.forceUpdate();
                        break;
                    case 'e': // end of game
                        let gameResult = messageBody;
                        this.setState({gameResult});
                        switch(gameResult.result) {
                            case 'win':
                                this.showAlert('success', 'The game ended! You won!');
                                break;
                            case 'lose':
                                this.showAlert('danger', 'The game ended! You lost!');
                                break;
                            case 'draw':
                                this.showAlert('secondary', 'The game ended in a draw!');
                                break;
                        }
                        break;
                }
            });
        }
    }

    receivedState = async (gameState) => {
        let userGameplay = await this.getGameplay(this.props.gameplayId);
        let gameplay = userGameplay.gameplay;
        let userIdx = userGameplay.userIdx;
        this.setState({gameState, gameplay, userIdx});        
    }

    sendTurn = async (gameTurn) => {
        gameTurn = JSON.stringify(gameTurn);
        this.client.publish({destination: `/app/gameplay/${this.props.gameplayId}`, body: gameTurn});
    }

    showAlert = (color, text, timeout) => {
        this.setState({
            alert: {
                color,
                text
            }
        });
        if(timeout) {
            setTimeout(this.closeAlert, timeout * 1000);
        }
    }

    closeAlert = () => {
        this.setState({alert: undefined});
    }

    renderAlert = () => {
        if(!this.state.alert) return "";
        return (
            <Alert color={this.state.alert.color} style={{position: "absolute", width: "calc(100% - 2*15px - 20px)", left: "calc(15px + 10px)", top: "10px"}}>
                {this.state.alert.text}
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
            <Row>
                <Col xs="3">
                    <UserContextWrapper><UserGameplayList selectedGameplayId={this.props.gameplayId}/></UserContextWrapper>
                </Col>
                <Col>
                    {this.renderAlert()}
                    <GameComponent gameState={this.state.gameState} userIdx={this.state.userIdx} sendTurn={this.sendTurn} style={{width: "100%", height: "100%"}}></GameComponent>
                </Col>
                <Col xs="3">
                    <GameplaySidebar gameplay={this.state.gameplay} />
                </Col>
            </Row>
        );        
    }
}

export default GameWrapper;