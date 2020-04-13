import React from 'react';
import {
    Card, Row
} from 'reactstrap';
import Router from 'next/router';

import UserSideBarItem from './UserSideBarItem';

class UserSideBar extends React.Component {
    constructor(props) {
        super(props);
        this.menuItems = [
            {id: 'games', title: 'Games', link: '/user/gameplays'},
            {id: 'invites', title: 'Invites', link: '/user/invites'},
            {id: 'statistics', title: 'Statistics', link: '/user/statistics'},
            {id: 'password', title: 'Change password', link: '/user/password'}
        ];
    }

    render() {
        let gameplays = this.menuItems.map((item) => {
            return (
                <div>
                    <div className="userSideBarItem">
                        <UserSideBarItem item={item} selected={item.id === this.props.selected}/>
                    </div>
                    <style jsx>{`
                        .userSideBarItem {
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

export default UserSideBar;