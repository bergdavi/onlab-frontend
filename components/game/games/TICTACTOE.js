import React from 'react';
import {
    Card, Row, Button
} from 'reactstrap';

export default class TicTacToe extends React.Component {

    sendTurn = (x, y) => {
        this.props.sendTurn({x: x, y: y});
    }

    getCell = (x, y) => {
        let c = this.props.gameState.board[x][y];
        let char = " ";
        if(c === 0) char = "X";
        if(c === 1) char = "◯";
        let cell = (
            <Button className="cellButton" onClick={() => this.sendTurn(x, y)} style={{width: "100px", height: "100px", fontSize: "40px"}}>{char}</Button>
        )
        return cell;
    }

    render() {
        return (
            <div>
                <table style={{margin: "auto"}}>
                    <tbody>
                        <tr>
                            <td>{this.getCell(0, 0)}</td>
                            <td>{this.getCell(0, 1)}</td>
                            <td>{this.getCell(0, 2)}</td>
                        </tr>
                        <tr>
                            <td>{this.getCell(1, 0)}</td>
                            <td>{this.getCell(1, 1)}</td>
                            <td>{this.getCell(1, 2)}</td>
                        </tr>
                        <tr>
                            <td>{this.getCell(2, 0)}</td>
                            <td>{this.getCell(2, 1)}</td>
                            <td>{this.getCell(2, 2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );        
    }
}