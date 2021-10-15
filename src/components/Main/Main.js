import './Main.css'
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LeftSide from './Profile/LeftSide/LeftSide'
import RightSide from './Profile/RightSide/RightSide'
import LoginPage from './LoginPage/LoginPage'
import Register from './Register/Register';
import Settings from './Settings/Settings';
import Peoples from './Peoples/Peoples.js'
import { connect } from "react-redux";


class Main extends Component {

    render() {
        const { isAuth } = this.props;
        return (
            <main className="container-lg">
                {isAuth ?
                    <div className="row logged-in">
                        <Route exact path="/userID">
                            <LeftSide />
                            <RightSide />
                        </Route>
                        <Route exact path="/userID/settings">
                            <Settings />
                        </Route>
                        <Route exact path="/peoples">
                            <Peoples />
                        </Route>
                    </div>
                    :
                    <div className="row-auto guest">
                        <Route exact path={["/login"]}>
                            <LoginPage />
                        </Route>
                        <Route exact path="/register">
                            <Register />
                        </Route>
                    </div>
                }
            </main>
        )
    }
}

function mapState(stateRedux) {
    return {
        isAuth: stateRedux.auth.isAuth
    }
}

export default connect(mapState)(Main);