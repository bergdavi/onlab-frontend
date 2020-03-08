import React from 'react';
import {
    Card, Row
} from 'reactstrap';
import Router from 'next/router';

class UserGameplayList extends React.Component {

    onItemClick = () => {
        let gameplayId = this.props.userGameplay.gameplay.id;
        // Router.push(`/gameplays`, `/gameplays?gameplayId=${gameplayId}`, {shallow: false});
        Router.push(`/gameplays?gameplayId=${gameplayId}`, `/gameplays?gameplayId=${gameplayId}`, {shallow: true});
    }

    render() {
        let gameplay = this.props.userGameplay.gameplay;
        let game = gameplay.game;
            
        return (
            <Card key={gameplay.id} onClick={this.onItemClick} style={{backgroundColor: gameplay.status === "finished" ? "gray" : "white"}}>
                <div className="cardContainer">
                    <img src={`/${game.id}.png`}></img>
                    <div>
                        <h1>{game.name}</h1>
                        <h2>Players: {gameplay.users.map((u) => u.username).sort().join(", ")}</h2>
                    </div>
                </div>
                <style jsx>{`
                    img {
                        width: 300px;
                        height: 150px;
                        object-fit: contain;
                        float: left;
                        margin-right: 10px;
                    }

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

export default UserGameplayList;