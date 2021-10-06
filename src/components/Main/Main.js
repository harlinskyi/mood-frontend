import './Main.css'
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LeftSide from './LeftSide/LeftSide'
import RightSide from './RightSide/RightSide'
import LoginPage from './LoginPage/LoginPage'
import Register from './Register/Register';

class Main extends Component {
    render() {
        return (
            <main className="container-lg">
                <div className="row loged-in">
                    <LeftSide />
                    <RightSide />
                </div>
                <div className="row-auto guest">
                    <Route exact path={["/login", "/"]}>
                        <LoginPage />
                    </Route>
                    <Route exact path="/register">
                        <Register />
                    </Route>
                </div>
            </main>
        )
    }
}

export default Main;