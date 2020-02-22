import React from 'react';
import App, { Container } from 'next/app'
import {UserContext} from '../components/UserContext';


import 'bootstrap/dist/css/bootstrap.min.css';

class MyApp extends App {

    constructor(props) {
        super(props);
        this.state = {user: undefined};
    }

    updateUser = (user) => {
        this.setState({user: user});
    }

    async componentDidMount() {
        const res = await fetch("/api/game-service/v1/users/current");
        if(res.status === 200) {
            const user = await res.json();
            this.updateUser(user);
        } else {
            this.updateUser(null);
        }
    }

    render() {
        const { Component, pageProps } = this.props

        return (
            <UserContext.Provider value={{user: this.state.user, updateUser: this.updateUser}}>
                <Container>
                    <Component {...pageProps} {...this.state}/>
                </Container>
            </UserContext.Provider>
        )
    }
}
  
export default MyApp;