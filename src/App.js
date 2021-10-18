import './App.css'
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import Footer from './components/Main/Footer/Footer';

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Main />
        <Footer />
      </Router>
    )
  }
}

export default App