import React from 'react';
import {
    Spinner,
    FormGroup,
    Label,
    Input,
    Table
} from 'reactstrap';
import Constants from '../util/constants';
import LeaderboardsTable from './LeaderboardsTable';

class Leaderboards extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            loadingLeaderboards: true,
            games: []
        }
    }

    componentDidMount() {
        this.getGames();
        this.getLeaderboards("ALL");
    }

    getGames = async () => {
        const res = await fetch(`${Constants.api.pathPrefix}/games`);
        if (res.status === 200) {
            const games = await res.json();
            this.setState({ games: games });
        } else {
            // TODO proper error handling
            return null;
        }
        this.setState({ loading: false });
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

    selectChanged = (e) => {
        this.getLeaderboards(e.target.value);
    }

    render() {
        if (this.state.loading) {
            return (
                <div align="center" style={{ margin: "10px" }}>
                    <Spinner type="border" style={{ width: "26px", height: "26px" }} />
                </div>
            )
        }
        return (
            <div style={{padding: "20px", margin: "auto", maxWidth: "1000px"}}>
                <FormGroup>
                    <Label for="selectGame">Select game</Label>
                    <Input type="select" name="select" id="selectGame" onChange={this.selectChanged}>
                        <option value="ALL">All</option>
                        {this.state.games.map((g) => (<option value={g.id}>{g.name}</option>))}
                    </Input>
                </FormGroup>
                {
                    this.state.loadingLeaderboards ?
                    <div align="center" style={{ margin: "10px" }}>
                        <Spinner type="border" style={{ width: "26px", height: "26px" }} />
                    </div>
                    :
                    <LeaderboardsTable leaderboards={this.state.leaderboards} />
                }
            </div>
        );
    }
}

export default Leaderboards;