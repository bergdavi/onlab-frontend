import React from 'react';
import {
    Spinner,
    FormGroup,
    Label,
    Input,
    Table
} from 'reactstrap';
import Constants from '../util/constants';

class LeaderboardsTable extends React.Component {

    render() {
        return (            
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User</th>
                        <th>Wins</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.leaderboards.entries.map(entry => (
                        <tr key={entry.position}>
                            <th scope="row">{entry.position}</th>
                            <td>{entry.user.username}</td>
                            <td>{entry.score}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }
}

export default LeaderboardsTable;