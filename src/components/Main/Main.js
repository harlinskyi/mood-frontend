import './Main.css'
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LeftSide from './LeftSide/LeftSide'
import RightSide from './RightSide/RightSide'
import LoginPage from './LoginPage/LoginPage'
import Register from './Register/Register';
import Settings from './Settings/Settings';

class Main extends Component {
    render() {
        return (
            <main className="container-lg">
                <div className="row loged-in">
                    <Route exact path="/userID">
                        <LeftSide  />
                        <RightSide />
                    </Route>
                    <Route exact path="/userID/settings">
                        <Settings />
                    </Route>
                </div>
                <div className="row-auto guest">
                    <Route exact path={["/login"]}>
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