import './App.css'
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import LeftSide from './components/Main/LeftSide/LeftSide'
import RightSide from './components/Main/RightSide/RightSide'
import LoginPage from './components/Main/LoginPage/LoginPage'
import Register from './components/Main/Register/Register';
import Main from './components/Main/Main';

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Main />
      </Router>
    )
  }
}

export default App