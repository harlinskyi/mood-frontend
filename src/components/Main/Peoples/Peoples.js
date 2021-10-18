import './Peoples.css'
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Peoples extends Component {
    render() {
        return (
            <div className="row col-12 peoples-page">
                <User />
            </div>
        )
    }
}

export default Peoples;

class User extends Component {
    render() {
        return (
            <div className="col-2 peoples-user-card mt-5 mx-auto">
                <div className="bg-body rounded-c shadow-sm p-2">
                    <div className="mx-auto peoples-user-photo">
                        <img src="https://cdn.popcake.tv/wp-content/uploads/2020/09/pokrov90_118863382_963425367814685_6603924445247511753_n.jpg" className="rounded mx-auto d-block" alt="Profile" />
                    </div>
                    <div className="mt-1 fs-5 text-center">
                        <Link to="/userNickname">Sveta Ivanova</Link>
                    </div>
                    <div className="fs-6 text-center peoples-user-nickname">
                        <span>@sveta_666</span>
                    </div>
                    <Link to="/" className="mt-1 fs-6 text-center peoples-user-button">View</Link>
                </div>
            </div>
        )
    }
};