import React from 'react';
import {
    Card, Row
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
        this.client.brokerURL = `ws://${window.location.host}/ws/gameplay`;
        this.client.activate();
        this.client.onConnect = () => {
            this.client.subscribe(`/user/topic/gameplay/${gameplayId}`, (message) => {
                this.receivedState(JSON.parse(message.body));
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

    render() {        
        if(!this.state.componentClass) {
            return "Loading...";
        }

        let GameComponent = this.state.componentClass;

        return (
            <div>
                {/* TODO pass userIdx to the game */}
                <GameComponent gameState={this.state.gameState} sendTurn={this.sendTurn} style={{width: "100%", height: "100%"}}></GameComponent>
            </div>
        );        
    }
}

export default GameWrapper;