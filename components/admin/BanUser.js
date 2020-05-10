import React from 'react';
import UserSearch from '../util/UserSearch';
import ConfirmModal from '../util/ConfirmModal';
import Constants from '../util/constants'

class BanUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isConfirmModalOpen: false,
            userToBan: {},
            banUserCallback: () => {}
        }
    }

    toggleConfirmModal = () => {
        this.setState({
            isConfirmModalOpen: !this.state.isConfirmModalOpen,
        });
    }

    banUserClick = (user) => {
        this.setState({
            isConfirmModalOpen: true,
            userToBan: user,
            banUserCallback: () => this.banUser(user)
        });
    }

    banUser = async (user) => {
        const res = await fetch(`${Constants.api.pathPrefix}/users/${user.id}/ban`, {
            method: "POST"
        });
        if(res.status === 200) {
            this.setState({sentInvite: true});
        }
    }

    render() {
        return (
            <div>
                <UserSearch btnCallback={this.banUserClick} btnText="Ban"></UserSearch>
                <ConfirmModal 
                    isOpen={this.state.isConfirmModalOpen} 
                    toggle={this.toggleConfirmModal} 
                    onPositive={this.state.banUserCallback} 
                    title="Ban user"
                    text={`Ban user '${this.state.userToBan.username}'?`}></ConfirmModal>
            </div>
        );
    }
}

export default BanUser;