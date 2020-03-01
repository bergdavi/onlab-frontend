import React from 'react';
import UserGameplayItem from './UserGameplayItem'
import GameItem from './GameItem';
import SelectedGame from './SelectedGame';

class GameList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            games: []
        }
    }

    getGames = async () => {
        const res = await fetch(`/api/game-service/v1/games`);
        if(res.status === 200) {
            const games = await res.json();
            this.setState({games : games});
        } else {
            // TODO proper error handling
            return null;
        }
    }

    componentDidMount() {
        this.getGames();
    }

    render() {
        return(
            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                {this.state.games.map(g => <GameItem game={g} />)}
                <SelectedGame game={this.state.games[0]} />
            </div>
        );
    }
}

export default GameList;