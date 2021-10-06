import './Register.css'
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class Register extends Component {
    render() {
        return (
            <div className="col-12 m-auto pt-5">
            <form className="form-register p-4 mb-5 bg-body rounded-c shadow">
                <h1 className="h3 mb-3 fw-normal text-center fw-bold">Register</h1>

                <div className="form-floating mb-2">
                    <input type="email" className="form-control" id="EmailInput" placeholder="name@example.com" data-tempmail="0"/>
                    <label for="EmailInput">Email</label>
                </div>
                <div className="form-floating mb-2">
                    <input type="text" className="form-control" id="NicknameInput" placeholder="Nickname" data-tempmail="0"/>
                    <label for="NicknameInput">Nickname</label>
                </div>
                <div className="form-floating mb-2" data-children-count="1">
                    <input type="text" className="form-control" id="FirstNameInput" placeholder="First Name"/>
                    <label for="PasswordInput">First Name</label>
                </div>
                <div className="form-floating mb-2" data-children-count="1">
                    <input type="text" className="form-control" id="LastNameInput" placeholder="Last Name"/>
                    <label for="PasswordInput">Last Name</label>
                </div>
                <div className="form-floating mb-2" data-children-count="1">
                    <input type="password" className="form-control" id="PasswordInput" placeholder="Password"/>
                    <label for="PasswordInput">Password</label>
                </div>
                <span className="login-errors">
                    <ul>
                        <li>Some problem 1</li>
                        <li>Some problem 2</li>
                        <li>Some problem 3</li>
                    </ul>
                </span>
                <button className="w-100 btn btn-lg btn-primary mb-2" type="submit">Register</button>
            </form>
        </div>
        )
    }
}

export default Register;