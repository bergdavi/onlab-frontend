import React from 'react';
import UserGameplayItem from './UserGameplayItem'

class UserGameplayList extends React.Component {

    constructor(props) {
        super(props);        
    }
    
    render() {
        if(!this.props.user || !this.props.user.gameplays) {
            return <h1>Loading...</h1>
        }
        let gameplays = this.props.user.gameplays.map((gameplay) => {
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