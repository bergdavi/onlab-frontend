import React from 'react';
import {
    Card, Row
} from 'reactstrap';

class GameWrapper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    getGameplay = async (gameplayId) => {
        const res = await fetch(`/api/game-service/v1/gameplays/${gameplayId}`);
        if(res.status === 200) {
            console.log("is 200");
            const gameplay = await res.json();
            return gameplay;
        } else {
            return null;
        }
    }   

    async componentDidUpdate(previousProps) {
        if(previousProps && this.props.gameplayId && previousProps.gameplayId !== this.props.gameplayId) {
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
    }

    sendTurn = async (gameTurn) => {
        console.log("Sending turn...");
        console.log(gameTurn);
        gameTurn = JSON.stringify(gameTurn);
        const res = await fetch(`/api/game-service/v1/gameplays/${this.props.gameplayId}/playturn`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: gameTurn
        });
        if(res.status === 200) {
            const gameState = await res.json();
            this.setState({gameState: gameState});
        } else {
            console.log("Bad turn");
            // TODO proper turn handling
        }
    }

    render() {        
        if(!this.state.componentClass) {
            return "Loading...";
        }

        let GameComponent = this.state.componentClass;

        return (
            <div>
                {/* TODO pass userIdx to the game */}
                <GameComponent gameState={this.state.gameState} sendTurn={this.sendTurn}></GameComponent>
                <style jsx>{`
                    h1 {
                        font-size: 20px;
                        margin-bottom: 0;
                    }
                    
                    h2 {
                        font-size: 16px;
                    }
                `}</style>
            </div>
        );        
    }
}

export default GameWrapper;