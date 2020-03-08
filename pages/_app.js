import React from 'react';
import App, { Container } from 'next/app'
import Cookies from 'js-cookie';

import {UserContext} from '../components/util/UserContext';
import Head from 'next/head'
import NavBar from '../components/navbar/NavBar';
import Constants from '../components/util/constants'


import 'bootstrap/dist/css/bootstrap.min.css';

class MyApp extends App {

    constructor(props) {
        super(props);
        this.state = {user: undefined};
    }

    updateUser = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.setState({user: user});
    }

    refreshUser = async () => {
        let user = JSON.parse(localStorage.getItem('user'));
        // TODO improve user handling
        if(false && Cookies.get('checkedLogin') && typeof user === 'object' && user) {
            this.updateUser(JSON.parse(localStorage.getItem('user')));
        } else {
            const res = await fetch(`${Constants.api.pathPrefix}/users/current`);
            if(res.status === 200) {
                const user = await res.json();
                this.updateUser(user);
            } else {
                this.updateUser(null);
            }
        }
        Cookies.set('checkedLogin', 1);
    }

    componentDidMount() {        
        this.refreshUser();
    }

    render() {
        const { Component, pageProps } = this.props

        return (
            <UserContext.Provider value={{user: this.state.user, updateUser: this.updateUser, refreshUser: this.refreshUser}}>
                <Head>
                    <title>Create Next App</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <header>
                    <NavBar />
                </header>
                <Component {...pageProps} {...this.state}/>
            </UserContext.Provider>
        )
    }
}
  
export default MyApp;