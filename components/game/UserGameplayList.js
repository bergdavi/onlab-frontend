import React from 'react';
import { Spinner } from 'reactstrap';
import UserGameplayItem from './UserGameplayItem'
import Constants from '../util/constants'
import ErrorHandler from '../util/errorHandler';

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
            ErrorHandler.sendError({message: "Failed to get user data"});
        }
    }

    render() {
        if(!this.state.gameplays) {
            return (
                <div align="center" style={{ margin: "10px" }}>
                    <Spinner type="border" style={{ width: "26px", height: "26px" }} />
                </div>
            )
        }
        let gameplays = this.state.gameplays.filter(gameplay => gameplay.gameplay.status === "in_progress").map((gameplay) => {
            return (
                <div key={gameplay.gameplay.id}>
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