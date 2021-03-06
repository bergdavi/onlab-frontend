import React from 'react';
import UserInviteItem from './UserInviteItem'
import Constants from '../util/constants'
import {
    Spinner
} from 'reactstrap';
import ErrorHandler from '../util/errorHandler';

class UserInviteList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        // TODO use a gameplay specific endpoint instead
        const res = await fetch(`${Constants.api.pathPrefix}/users/current`);
        if(res.status === 200) {
            const user = await res.json();
            this.setState({invites : user.invites});
        } else {
            ErrorHandler.sendError({message: "Failed to get user data"});
            return null;
        }
    }
    
    render() {
        if(!this.state.invites) {
            return (
                <div align="center" style={{margin: "10px"}}>
                    <Spinner type="border" style={{width: "26px", height: "26px"}} />
                </div>
            )
        }
        let invites = this.state.invites.map((invite) => {
            return (
                <div key={invite.id}>
                    <div className="userGameplayItem">
                        <UserInviteItem invite={invite} />
                    </div>
                    <style jsx>{`
                        .userGameplayItem {
                            margin: 20px;
                        }
                    `}</style>
                </div>
            );
        });
        return invites;
    }
}

export default UserInviteList;