import React from 'react';
import UserGameplayItem from './UserGameplayItem'
import GameItem from './GameItem';
import SelectedGame from './SelectedGame';
import Constants from '../util/constants'
import {
    Spinner
} from 'reactstrap';

class GameList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
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
        this.setState({loading: false});
    }

    componentDidMount() {
        this.getGames();
    }

    selectGame = (idx) => {
        this.setState({selectGame: idx});
    }

    render() {
        if(this.state.loading) {
            return (
                <div align="center" style={{margin: "10px"}}>
                    <Spinner type="border" style={{width: "26px", height: "26px"}} />
                </div>
            )
        }
        return(
            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                {this.state.games.map((g, idx) => <div onClick={() => this.selectGame(idx)}><GameItem game={g} /></div>)}
                {this.state.selectGame !== undefined ? <SelectedGame game={this.state.games[this.state.selectGame]} /> : ""}                
            </div>
        );
    }
}

export default GameList;