import React from 'react';
import GameItem from './GameItem';
import SelectedGame from './SelectedGame';
import Constants from '../util/constants';
import {
    Spinner
} from 'reactstrap';
import ErrorHandler from '../util/errorHandler';

class GameList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            games: [],
            modalOpen: false
        }
    }

    getGames = async () => {
        const res = await fetch(`${Constants.api.pathPrefix}/games`);
        if(res.status === 200) {
            const games = await res.json();
            this.setState({games : games});
        } else {
            ErrorHandler.sendError({message: "Failed to get games"});
        }
        this.setState({loading: false});
    }

    componentDidMount() {
        this.getGames();
    }

    selectGame = (idx) => {
        this.setState({selectGame: idx});
    }

    toggleModal = () => {
        this.setState({selectGame: undefined});
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
                {this.state.games.map((g, idx) => <div onClick={() => this.selectGame(idx)} key={g.id}><GameItem game={g} /></div>)}
                <SelectedGame game={this.state.games[this.state.selectGame]} open={typeof this.state.selectGame !== 'undefined'} toggle={this.toggleModal} />
            </div>
        );
    }
}

export default GameList;