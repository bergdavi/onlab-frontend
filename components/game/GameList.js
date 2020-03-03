import React from 'react';
import UserGameplayItem from './UserGameplayItem'
import GameItem from './GameItem';
import SelectedGame from './SelectedGame';
import Constants from '../util/constants'

class GameList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            games: []
        }
    }

    getGames = async () => {
        const res = await fetch(`${Constants.api.pathPrefix}/games`);
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