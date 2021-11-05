import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main";
import Footer from "./components/Main/Footer/Footer";

class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Main />
        <Footer />
      </>
    );
  }
}

export default App;
