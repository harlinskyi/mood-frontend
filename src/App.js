import './App.css'
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import LeftSide from './components/Main/LeftSide/LeftSide'
import RightSide from './components/Main/RightSide/RightSide'
import LoginPage from './components/Main/LoginPage/LoginPage'

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <main className="container-lg">
          {/* <div className="row loged-in">
              <LeftSide/>
              <RightSide/>
          </div> */}
          <div className="row-auto guest">
              <LoginPage/>
          </div>
        </main>
      </Router>
    )
  }
}

export default App