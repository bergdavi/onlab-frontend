import $ from 'jquery';
import React from 'react';
import logo from './logo.svg';
import NavBar from './NavBar';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.checkUserLogin();
  }

  checkUserLogin() {
    $.getJSON("/api/game-service/v1/users/current").then((data) => this.userUpdated(data)).catch(() => this.userUpdated(undefined));
  }

  userUpdated = (user) => {
    console.log(user);
    this.setState(this.setState({user: user}));      
    if(user) {
      console.log('user is logged in');
    } else {
      console.log('not logged in');
    }
  }
  
  render() {
    return (      
      <div className="App">
        <NavBar user={this.state.user} userUpdated={this.userUpdated}></NavBar>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
