import React from 'react';
import {
    Card, Row
} from 'reactstrap';
import Router from 'next/router';
import Constants from '../util/constants'

class GameplaySidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        let gameplay = this.props.gameplay;
        if(!gameplay) {
            return "Loading...";
        }
        let game = gameplay.game;
            
        return (
            <div>
                <div>
                    <h1>{game.name}</h1>
                    <h2>{game.description}</h2>
                </div>
                <div>
                    <h1>Next turn:</h1>
                    <h2>{gameplay.nextTurn.username}</h2>
                </div>
                <div>
                    <h1>Players</h1>
                    {gameplay.users.map(user => (<h2 key={user.id}>{user.username}</h2>))}
                </div>
                <style jsx>{`
                    h1 {
                        font-size: 20px;
                        margin-bottom: 0;
                    }
                    
                    h2 {
                        font-size: 16px;
                    }
                `}</style>
            </div>
        );        
    }
}

export default GameplaySidebar;