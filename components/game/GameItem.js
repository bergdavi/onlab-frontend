import React from 'react';
import {
    Card, Row, CardImg, CardBody, CardTitle, CardText
} from 'reactstrap';
import Router from 'next/router';

class GameItem extends React.Component {

    render() {
        let game = this.props.game;
            
        return (    
            <Card style={{width: "300px", margin: "10px"}}>
                <CardImg top src="https://via.placeholder.com/300x150" style={{width: "300px", height: "150px", objectFit: "cover"}} />
                <CardBody style={{padding: "5px"}}>
                    <CardTitle style={{fontSize: "25px", fontWeight: "bold", marginBottom: "0px"}}>{game.name}</CardTitle>
                    <CardText>{game.description}</CardText>
                </CardBody>
            </Card>
        );        
    }
}

export default GameItem;