import './Main.css'
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LeftSide from './Profile/LeftSide/LeftSide'
import RightSide from './Profile/RightSide/RightSide'
import LoginPage from './LoginPage/LoginPage'
import Register from './Register/Register';
import Settings from './Settings/Settings';
import Peoples from './Peoples/Peoples.js'

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
                    <Route exact path="/peoples">
                        <Peoples />
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