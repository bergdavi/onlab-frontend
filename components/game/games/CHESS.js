import React from 'react';
import {
    Card, Row, Button, Modal, ModalBody, ModalHeader
} from 'reactstrap';

export default class Chess extends React.Component {

    constructor(props) {
        super(props);
        this.state = {loading: true};
    }

    componentDidMount() {
        let images = ["pawn", "king", "queen", "bishop", "rook", "knight"];
        
        this.images = {};
        
        images.forEach(img => {
            this.images[`white_${img}`] = {
                loaded: false,
                image: new Image
            };
            this.images[`black_${img}`] = {
                loaded: false,
                image: new Image
            }
        });

        for(let img in this.images) {
            let image = this.images[img];
            image.image.src = `chess/${img}.png`
            image.image.onload = () => {
                image.loaded = true;
                this.checkImagesLoaded();
            };
        }
    }

    componentDidUpdate() {
        this.canvas = this.refs.canvas;        
        this.canvas.onclick = this.canvasClicked;
        this.canvas.onmousedown = this.canvasMouseDown;
        this.canvas.onmouseup = this.canvasMouseUp;
        this.canvas.onmousemove = this.canvasMouseMove;

        if(!this.state.loading) {
            this.drawBackground();
            this.drawFigures();
        }
    }

    isInverted = () => {
        return this.props.userIdx == 1;
    }

    drawBackground = () => {
        if(!this.canvas) {
            return;
        }
        const ctx = this.canvas.getContext("2d");

        for(let x = 0; x < 8; x++) {
            for(let y = 0; y < 8; y++) {
                if((x + y) % 2 === 0) {
                    ctx.fillStyle = '#DDDDDD';
                } else {
                    ctx.fillStyle = '#666666';
                }
                ctx.fillRect(x * 50, y * 50, 50, 50);
            }    
        }
    }

    drawFigures = () => {
        if(!this.canvas) {
            return;
        }
        const ctx = this.canvas.getContext("2d");

        this.props.gameState.board.forEach((line, cellIdx) => {
            line.forEach((cell, lineIdx) => {
                let pixels = this.getPixelsFromCellIdx(cellIdx, lineIdx);
                if(cell && !(this.selected && (this.selected.cellIdx.cellIdx === cellIdx && this.selected.cellIdx.lineIdx === lineIdx))) {
                    let img = `${cell.color.toLowerCase()}_${cell.type.toLowerCase()}`;
                    ctx.drawImage(this.images[img].image, pixels.x, pixels.y, 50, 50);
                }
            });
        });
    }

    drawFigure = (figure, x, y, size = 50) => {
        if(!this.canvas) {
            return;
        }

        const ctx = this.canvas.getContext("2d");

        let img = `${figure.color.toLowerCase()}_${figure.type.toLowerCase()}`;
        ctx.drawImage(this.images[img].image, x - size/2, y - size/2, size, size);
    }

    canvasMouseDown = (e) => {
        let pos = this.getPosFromClickEvent(e);
        let figure = this.props.gameState.board[pos.cellIdx.cellIdx][pos.cellIdx.lineIdx]
        if(figure) { 
            this.selected = {
                figure,
                cellIdx: pos.cellIdx
            };
        }
    }

    canvasMouseUp = (e) => {
        if(!this.selected) return; 
        let pos = this.getPosFromClickEvent(e);
        let cellIdx = this.getCellIdxFromPixels(pos.pos.x, pos.pos.y);
        let alignedPos = this.getPixelsFromCellIdx(cellIdx.cellIdx, cellIdx.lineIdx);
        let selected = this.selected;
        this.drawBackground();
        this.drawFigures();
        this.drawFigure(selected.figure, alignedPos.x + 25, alignedPos.y + 25);
        if(this.selected.figure.type == 'PAWN' && ((this.props.userIdx === 0 && cellIdx.lineIdx === 7) || (this.props.userIdx === 1 && cellIdx.lineIdx === 0))) {
            this.setState({promoteOpen: true});
            this.sendPromoteTurn = (type) => {
                this.sendTurn(selected.cellIdx.cellIdx, selected.cellIdx.lineIdx, cellIdx.cellIdx, cellIdx.lineIdx, type.toUpperCase());
                this.setState({promoteOpen: false});
            };
            this.selected = undefined;
        } else {
            this.sendTurn(selected.cellIdx.cellIdx, selected.cellIdx.lineIdx, cellIdx.cellIdx, cellIdx.lineIdx);
            this.selected = undefined;
        }
    }

    canvasMouseMove = (e) => {
        if (!this.selected) return;
        let pos = this.getPosFromClickEvent(e);        
        this.drawBackground();
        this.drawFigures();
        this.drawFigure(this.selected.figure, pos.pos.x, pos.pos.y, 80);
    }

    getPosFromClickEvent = (e) => {
        const canvas = e.target;
        const rect = canvas.getBoundingClientRect()
        let x = (e.clientX  - rect.left)/rect.width*canvas.width;
        let y = (e.clientY  - rect.top)/rect.height*canvas.height;
        return {
            cellIdx: this.getCellIdxFromPixels(x, y),
            pos: {x, y}
        };
    }

    getCellIdxFromPixels = (x, y) => {
        let cellIdx = Math.floor(x / 50);
        let lineIdx = Math.floor(8 - y / 50);
        if(this.isInverted()) {
            return {
                cellIdx: 7 - cellIdx,
                lineIdx: 7 - lineIdx
            }
        }
        return {
            cellIdx: cellIdx,
            lineIdx: lineIdx
        }
    }

    getPixelsFromCellIdx = (x, y) => {
        if(this.isInverted()) {
            x = 7 - x;
            y = 7 - y;
        }
        return {
            x: x*50,
            y: (8-1-y)*50
        };
    }

    checkImagesLoaded() {
        let loaded = true;
        for(let img in this.images) {
            let image = this.images[img];
            if(!image.loaded) {
                loaded = false;
                break;
            }
        }
        if(loaded) {
            this.setState({loading: false});
        }
    }

    sendTurn = (fromCellIdx, fromLineIdx, toCellIdx, toLineIdx, promote) => {
        this.props.sendTurn({fromX: fromCellIdx, fromY: fromLineIdx, toX: toCellIdx, toY: toLineIdx, promote});
    }

    sendForfeit = () => {
        this.props.sendTurn({forfeit: true});
    }

    sendOfferDraw = () => {
        this.props.sendTurn({offerDraw: true});
    }

    render() {
        let color = this.props.userIdx === 0 ? 'white' : 'black';
        return (
            <div>
                <Modal isOpen={this.state.promoteOpen}>
                    <ModalHeader>
                        Choose a figure to promote to!
                    </ModalHeader>
                    <ModalBody>
                        <div style={{display: 'flex', justifyContent: 'space-around'}}>
                            <img height='100px' width='100px' src={`chess/${color}_queen.png`} onClick={() => this.sendPromoteTurn('queen')}></img>
                            <img height='100px' width='100px' src={`chess/${color}_rook.png`} onClick={() => this.sendPromoteTurn('rook')}></img>
                            <img height='100px' width='100px' src={`chess/${color}_bishop.png`} onClick={() => this.sendPromoteTurn('bishop')}></img>
                            <img height='100px' width='100px' src={`chess/${color}_knight.png`} onClick={() => this.sendPromoteTurn('knight')}></img>
                        </div>
                    </ModalBody>
                </Modal>
                <canvas ref="canvas" width={400} height={400} style={{height: "100%", width: "100%", objectFit: "contain"}}></canvas>
                <Button color="danger" onClick={this.sendForfeit}>Forfeit</Button>
                <Button color="secondary" onClick={this.sendOfferDraw} style={{marginLeft: "10px"}}>Offer draw</Button>
            </div>
        );
    }
}