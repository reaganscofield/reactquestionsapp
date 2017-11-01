import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Qandaapp from './Qandaapp';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Questions App Power With React</h1>
        </header>
        <Qandaapp />
      </div>
    );
  }
}

export default App;
