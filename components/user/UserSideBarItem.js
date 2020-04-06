import React from 'react';
import {
    Card, Row
} from 'reactstrap';
import Router from 'next/router';

class UserSideBarItem extends React.Component {

    onItemClick = () => {
        Router.push(this.props.item.link, this.props.item.link, {shallow: true});
    }

    render() {
        let item = this.props.item;
            
        return (
            <div key={item.id} className={`item ${this.props.selected ? "selected" : ""}`} onClick={this.onItemClick}>
                <div>
                    <h1>{item.title}</h1>
                </div>
                <style jsx>{`
                    h1 {
                        font-size: 20px;
                        margin-bottom: 0;
                    }
                    
                    h2 {
                        font-size: 16px;
                    }

                    .item {
                        padding: 0px 20px 0px 20px;
                    }

                    .selected {
                        background-color: grey;
                    }
                `}</style>
            </div>
        );        
    }
}

export default UserSideBarItem;