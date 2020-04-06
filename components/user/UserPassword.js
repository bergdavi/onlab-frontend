import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Spinner, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Constants from '../util/constants';

class UserPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            oldPasswordInput: '',
            newPasswordInput: '',
            loading: false
        }
    }

    submitChangePassword = async (e) => {
        e.preventDefault();
        this.setState({loading: true});
        let data = {
            newPassword: this.state.newPasswordInput,
            oldPassword: this.state.oldPasswordInput
        };
        data = JSON.stringify(data);
        const res = await fetch(`${Constants.api.pathPrefix}/users/changepassword`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
        if(res.status === 200) {
            this.setState({
                newPassword: "",
                oldPassword: "",
                changed: true,
                loading: false
            });
        } else {
            this.setState({
                newPassword: "",
                oldPassword: "",
                loading: false
            });
        }
    }

    render() {
        return (
            <Form id="passwordForm" onSubmit={this.submitChangePassword}>
                <FormGroup>
                    <Label for="oldPassword">Username</Label>
                    <Input type="password" onChange={(e) => this.setState({oldPasswordInput: e.target.value})} value={this.state.oldPasswordInput} name="oldPassword" id="oldPassword" placeholder="Old password" />
                </FormGroup>
                <FormGroup>
                    <Label for="newPassword">Password</Label>
                    <Input type="password" onChange={(e) => this.setState({newPasswordInput: e.target.value})} value={this.state.newPasswordInput} name="newPassword" id="newPassword" placeholder="New password" />
                </FormGroup>
                <Button color={this.state.changed?"success":"primary"} type="submit" disabled={this.state.loading} style={{width: "300px", height: "40px"}}>
                    {this.state.loading?<Spinner type="border" style={{width: "26px", height: "26px"}} />:this.state.changed?"Password changed":"Change password"}
                </Button>
            </Form>
        )
    }
}

export default UserPassword;