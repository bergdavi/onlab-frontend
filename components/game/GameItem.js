import React from 'react';
import {
    Card, Row, CardImg, CardBody, CardTitle, CardText
} from 'reactstrap';
import Router from 'next/router';

class GameItem extends React.Component {

    constructor(props) {
        super(props);
        this.width = (props.style && props.style.width) ? props.style.width : "300px";
    }

    render() {
        let game = this.props.game;
            
        return (    
            <Card style={{width: this.width, margin: "10px", cursor: "pointer"}}>
                <CardImg top src={`/${game.id}.png`} style={{width: this.width, height: `calc(${this.width} / 2)`, objectFit: "contain"}} />
                <CardBody style={{padding: "5px"}}>
                    <CardTitle style={{fontSize: "25px", fontWeight: "bold", marginBottom: "0px"}}>{game.name}</CardTitle>
                    <CardText>{game.description}</CardText>
                </CardBody>
            </Card>
        );        
    }
}

export default GameItem;