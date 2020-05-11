import React from 'react';
import ErrorItem from './ErrorItem';
import ErrorHandler from './errorHandler';

class ErrorList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {errors: []};
    }

    componentDidMount() {
        ErrorHandler.subscribe((error) => {
            let errors = this.state.errors;
            errors.push(error);
            this.setState({errors});
        });
    }

    render() {
        return (
            <div style={{position: "absolute", width: "100%"}}>
                {this.state.errors.map(error => (<ErrorItem error={error}></ErrorItem>))}
            </div>
        );
    }
}

export default ErrorList;