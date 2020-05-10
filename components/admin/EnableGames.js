import React from 'react';
import {
    Spinner,
    ListGroup
} from 'reactstrap';
import EnableGameRow from './EnableGameRow';
import Constants from '../util/constants';
import ErrorHandler from '../util/errorHandler';

class EnableGames extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            games: [],
            loading: true
        }
    }

    componentDidMount() {
        this.getGames();
    }

    getGames = async () => {
        const res = await fetch(`${Constants.api.pathPrefix}/games?all=true`);
        if (res.status === 200) {
            const games = await res.json();
            this.setState({ games: games });
        } else {
            ErrorHandler.sendError({message: "Failed to get games"});
        }
        this.setState({ loading: false });
    }

    render() {
        if(this.state.loading) {
            return (
            <div align="center" style={{margin: "10px"}}>
                <Spinner type="border" style={{width: "26px", height: "26px"}} />
            </div>);
        }
        return (
            <ListGroup>
                {this.state.games.map(game => (
                    <EnableGameRow game={game}></EnableGameRow>
                ))}
            </ListGroup>
        );
    }
}

export default EnableGames;