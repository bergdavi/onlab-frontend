import React from 'react';
import {
    Card, Row
} from 'reactstrap';
import Router from 'next/router';

class UserGameplayItem extends React.Component {

    onItemClick = () => {
        let gameplayId = this.props.userGameplay.gameplay.id;
        // Router.push(`/gameplays`, `/gameplays?gameplayId=${gameplayId}`, {shallow: true});
        Router.push(`/gameplays?gameplayId=${gameplayId}`, `/gameplays?gameplayId=${gameplayId}`, {shallow: true});
    }

    mapUserToName = (user) => {
        let nextTurnUser = this.props.userGameplay.gameplay.nextTurn;
        // TODO find a better way to seperate usernames
        let displayUsername = user.username + " "; // Added space to seperate usernames
        return displayUsername;
    }

    render() {
        let userIdx = this.props.userGameplay.userIdx;
        let gameplay = this.props.userGameplay.gameplay;
        let game = gameplay.game;
            
        return (
            <div key={gameplay.id} className={`gameplay ${this.props.selected ? "selected" : ""}`} onClick={this.onItemClick}>
                <div>
                    <h1>{game.name}</h1>
                    <h2>{gameplay.users.map(this.mapUserToName)}</h2>
                </div>
                <style jsx>{`
                    h1 {
                        font-size: 20px;
                        margin-bottom: 0;
                    }
                    
                    h2 {
                        font-size: 16px;
                    }

                    .gameplay {
                        padding: 0px 20px 0px 20px;
                    }

                    .selected {
                        background-color: grey;
                    }
                `}</style>
            </div>
        );        
    }
}

export default UserGameplayItem;