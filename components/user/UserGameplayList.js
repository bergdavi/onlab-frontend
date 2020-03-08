import React from 'react';
import UserGameplayItem from './UserGameplayItem'
import Constants from '../util/constants'

class UserGameplayList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        // TODO use a gameplay specific endpoint instead
        const res = await fetch(`${Constants.api.pathPrefix}/users/current`);
        if(res.status === 200) {
            const user = await res.json();
            this.setState({gameplays : user.gameplays});
        } else {
            // TODO proper error handling
            return null;
        }
    }
    
    render() {
        if(!this.state.gameplays) {
            return <h1>Loading...</h1>
        }
        let gameplays = this.state.gameplays.map((gameplay) => {
            return (
                <div key={gameplay.id}>
                    <div className="userGameplayItem">
                        <UserGameplayItem userGameplay={gameplay} />
                    </div>
                    <style jsx>{`
                        .userGameplayItem {
                            margin: 20px;
                            cursor: pointer;
                        }
                    `}</style>
                </div>
            );
        });
        return gameplays;
    }
}

export default UserGameplayList;