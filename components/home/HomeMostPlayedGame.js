import React from 'react';
import {
    Row,
    Col,
    Spinner
} from 'reactstrap';
import Constants from '../util/constants';
import GameItem from '../game/GameItem';
import LeaderboardsTable from '../leaderboards/LeaderboardsTable';

class HomeMostPlayedGame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            loadingLeaderboards: true
        }
    }

    componentDidMount() {
        this.getGames();
    }

    getGames = async () => {
        const res = await fetch(`${Constants.api.pathPrefix}/games`);
        if(res.status === 200) {
            const games = await res.json();
            this.setState({game : games[0]});
            this.getLeaderboards(games[0].id);
        } else {
            // TODO proper error handling
            return null;
        }
        this.setState({loading: false});
    }

    getLeaderboards = async (game) => {
        this.setState({ loadingLeaderboards: true });
        let url = `${Constants.api.pathPrefix}/leaderboards`;
        if (game !== "ALL") {
            url += `/games/${game}`;
        }
        const res = await fetch(url);
        if (res.status === 200) {
            const leaderboards = await res.json();
            this.setState({ leaderboards, loadingLeaderboards: false });
        } else {
            // TODO proper error handling
            return null;
        }
        this.setState({ loading: false });
    }

    render() {
        if(this.state.loading) {
            return (
                <div align="center" style={{margin: "10px"}}>
                    <Spinner type="border" style={{width: "26px", height: "26px"}} />
                </div>
            )
        }
        return (
            <div style={{padding: "32px"}}>
                <Row>
                    <Col xs="auto">
                        <h1>Most played game</h1>                        
                        <GameItem game={this.state.game} style={{width: "600px"}} ></GameItem>                        
                    </Col>
                    <Col>
                        <h1>Leaderboards</h1>
                        {this.state.loadingLeaderboards?
                        <Spinner />
                        :
                        <LeaderboardsTable leaderboards={this.state.leaderboards} />
                    }
                    </Col>
                </Row>
            </div>
        );
    }
}

export default HomeMostPlayedGame;