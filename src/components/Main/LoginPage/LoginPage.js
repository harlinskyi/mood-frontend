import './LoginPage.css'
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


class LoginPage extends Component {
    render() {
        return (
            <div className="col-12 m-auto pt-5">
                <form className="form-signin p-4 mb-5 bg-body rounded-c shadow">
                    <h1 className="h3 mb-3 fw-normal text-center fw-bold">Sign In</h1>

                    <div className="form-floating mb-2">
                        <input type="email" className="form-control is-invalid" id="floatingInput" placeholder="name@example.com" data-tempmail="0"/>
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-2" data-children-count="1">
                        <input type="password" className="form-control is-valid" id="floatingPassword" placeholder="Password"/>
                        <label for="floatingPassword">Password</label>
                    </div>
                    <span className="login-errors">
                        <ul>
                            <li>Some problem 1</li>
                            <li>Some problem 2</li>
                            <li>Some problem 3</li>
                        </ul>
                    </span>
                    <button className="w-100 btn btn-lg btn-primary mb-2" type="submit">Sign in</button>
                </form>
            </div>
        )
    }
}

export default LoginPage;