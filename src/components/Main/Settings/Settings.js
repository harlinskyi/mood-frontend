import './Settings.css'
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class Settings extends Component {
    render() {
        return (
            <div className="col-10 m-auto pt-2">
                <form className="form-edit p-4 mb-5 bg-body rounded-c shadow">
                    <h1 className="h3 mb-3 fw-normal text-center fw-bold">Settings</h1>

                    <div className="mb-2">
                        <input type="file" className="form-control" id="inputGroupFile02" />
                    </div>

                    <div className="form-floating mb-2">
                        <textarea type="text" className="form-control" id="quoteInput" placeholder="Quote" data-tempmail="0"></textarea>
                        <label for="quoteInput">Quote</label>
                    </div>

                    <div className="form-floating mb-2">
                        <input type="text" className="form-control" id="firstnameInput" placeholder="firstname" data-tempmail="0" required />
                        <label for="firstnameInput">First name</label>
                    </div>

                    <div className="form-floating mb-2">
                        <input type="text" className="form-control" id="lastnameInput" placeholder="lastname" data-tempmail="0" required />
                        <label for="lastnameInput">Last name</label>
                    </div>

                    <div className="form-floating mb-2">
                        <input type="text" className="form-control" id="nicknameInput" placeholder="nickname" data-tempmail="0" required />
                        <label for="nicknameInput">Nickname</label>
                    </div>

                    <div className="form-floating mb-2" required>
                        <input type="email" className="form-control" id="emailInput" placeholder="name@example.com" data-tempmail="0" required />
                        <label for="emailInput">Email address</label>
                    </div>

                    <div className="form-floating mb-2">
                        <select className="form-select" aria-label="Default select example" required>
                            <option selected>Open this select menu</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <label for="siteInput">Gender</label>
                    </div>

                    <div className="form-floating mb-2">
                        <input type="date" className="form-control" id="datebirthInput" placeholder="datebirth" data-tempmail="0" />
                        <label for="datebirthInput">Date birth</label>
                    </div>

                    <div className="form-floating mb-2">
                        <input type="text" className="form-control" id="siteInput" placeholder="Site" data-tempmail="0" />
                        <label for="siteInput">Site</label>
                    </div>

                    <div className="form-floating mb-2">
                        <select className="form-select" aria-label="Default select example">
                            <option selected>Open this select menu</option>
                            <option value="Ukraine">Ukraine</option>
                            <option value="Poland">Poland</option>
                            <option value="Russia">Russia</option>
                            <option value="USA">USA</option>
                            <option value="Moldova">Moldova</option>
                        </select>
                        <label for="siteInput">Country</label>
                    </div>


                    <div className="col-12">
                        <button className="d-block m-auto w-50 btn btn-lg btn-primary mb-2" type="submit">Save Changes</button>
                    </div>

                </form>
            </div>
        )
    }
}

export default Settings