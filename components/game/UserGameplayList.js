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
                <div>
                    <div className="userGameplayItem">
                        <UserGameplayItem userGameplay={gameplay} selected={gameplay.gameplay.id === this.props.selectedGameplayId}/>
                    </div>
                    <style jsx>{`
                        .userGameplayItem {
                            margin: 20px 0px 20px 0px;
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