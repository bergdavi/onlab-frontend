import React from 'react';
import {
    Button,
    Row,
    Col,
    ListGroupItem,
    Spinner
} from 'reactstrap';
import Constants from '../util/constants';
import ErrorHandler from '../util/errorHandler';

class EnableGameRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            enabled: props.game.enabled,
            loading: false
        }
    }

    getButton = () => {
        let color = "success";
        let text = "Enable";
        let disabled = false;
        if(this.state.enabled) {
            color = "danger";
            text = "Disable";
        }
        if(this.state.loading) {
            disabled = true;
        }
        return (
            <Button color={color} disabled={disabled} onClick={() => this.setGameEnabled(!this.state.enabled)} style={{width: "100px", height: "40px", float: "right"}}>
                {this.state.loading?
                <Spinner type="border" style={{width: "26px", height: "26px"}} />
                :
                text}
            </Button>
        );
    }

    setGameEnabled = async (enabled) => {
        this.setState({loading: true});
        const res = await fetch(`${Constants.api.pathPrefix}/games/${this.props.game.id}/${enabled ? "enable" : "disable"}`, {
            method: "POST"
        });
        if(res.status === 200) {
            this.setState({enabled, loading: false});
        } else {
            ErrorHandler.sendError({message: "Failed to get games"});
        }
    }

    render() {
        return (
            <ListGroupItem>
                <Row>
                    <Col>
                        {this.props.game.name}
                    </Col>
                    <Col>
                        {this.getButton()}
                    </Col>
                </Row>
            </ListGroupItem>
        );
    }
}

export default EnableGameRow;