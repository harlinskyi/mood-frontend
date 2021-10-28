import './Settings.css'
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import http from '../../../http-common';
import store from '../../../store';
import EclipseWidget from '../../common/eclipse/eclipse'
import accountService from '../../../services/account.service';


class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            userId: store.getState().auth.userId,
            errors: "",
            success: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ user : {[event.target.name]: event.target.value }});
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        let targ = event.target;
        console.log(event);

        this.setState({ loading: true })
        try {
            var formData = new FormData();
            Object.entries(targ).forEach(([key, element]) => {
                if (element.name !== undefined && element.name !== '') {
                    formData.append(element.name, element.value)
                }
              });
            await accountService.updateSettings(formData, this.state.userId);
        }
        catch (badresponse) {
            this.setState({errors: badresponse})
        }
        this.setState({ loading: false })
    }

    async componentDidMount() {
        this.setState({ loading: true })
        try {
            const response = await http.post(`get-user-profile?id=${this.state.userId}`);
            const userProfile = response.data;
            this.setState({ user: userProfile });
        } catch (badresponse) {
            console.log("problem", badresponse);
            this.setState({errors: badresponse})
        }
        this.setState({ loading: false })
    }

    render() {
        const { birthDay, email, firstName, lastName, nickName, location, quote, link, sex } = this.state.user;
        const { loading, success, errors } = this.state
        return (
            <div className="col-10 m-auto pt-2">
                <form className="form-edit p-4 mb-3 bg-body rounded-c shadow" id="formUserSettings" onSubmit={this.handleSubmit} >
                    <h1 className="h3 mb-3 fw-normal text-center fw-bold">Settings</h1>

                    <div className="mb-2">
                        <input type="file" className="form-control" id="inputGroupFile02" name="Image" />
                    </div>

                    <div className="form-floating mb-2">
                        <textarea defaultValue={quote} type="text" onChange={this.handleChange} className="form-control" name="Quote" id="quoteInput" placeholder="Quote" data-tempmail="0"></textarea>
                        <label htmlFor="quoteInput">Quote</label>
                    </div>

                    <div className="form-floating mb-2">
                        <input defaultValue={firstName} type="text" onChange={this.handleChange} className="form-control" name="FirstName" id="firstnameInput" placeholder="FirstName" data-tempmail="0" required />
                        <label htmlFor="firstnameInput">First name</label>
                    </div>

                    <div className="form-floating mb-2">
                        <input defaultValue={lastName} type="text" onChange={this.handleChange} className="form-control" name="LastName" id="lastnameInput" placeholder="LastName" data-tempmail="0" required />
                        <label htmlFor="lastnameInput">Last name</label>
                    </div>

                    <div className="form-floating mb-2">
                        <input defaultValue={nickName} type="text" onChange={this.handleChange} className="form-control" name="NickName" id="nicknameInput" placeholder="NickName" data-tempmail="0" required />
                        <label htmlFor="nicknameInput">Nickname</label>
                    </div>

                    <div className="form-floating mb-2" required>
                        <input defaultValue={email} type="email" onChange={this.handleChange} className="form-control" name="Email" id="emailInput" placeholder="email@example.com" data-tempmail="0" required />
                        <label htmlFor="emailInput">Email address</label>
                    </div>
                    <div className="form-floating mb-2">
                        <select value={sex} className="form-select" onChange={this.handleChange} name="Sex" aria-label="Default select example" required>
                            <option defaultValue="">Open this select menu</option>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                        </select>
                        <label htmlFor="siteInput">Gender</label>
                    </div>

                    <div className="form-floating mb-2">
                        <input defaultValue={birthDay && birthDay.substr(0, 10)} onChange={this.handleChange} type="date" className="form-control" name="BirthDay" id="datebirthInput" placeholder="BirthDay" data-tempmail="0" />
                        <label htmlFor="datebirthInput">Birthday</label>
                    </div>

                    <div className="form-floating mb-2">
                        <input defaultValue={link} type="text" onChange={this.handleChange} className="form-control" name="Link" id="siteInput" placeholder="Site" data-tempmail="0" />
                        <label htmlFor="siteInput">Site</label>
                    </div>

                    <div className="form-floating mb-2">
                        <select value={location} className="form-select" onChange={this.handleChange} name="Location" aria-label="Default select example">
                            <option defaultValue="">Open this select menu</option>
                            <option value="Ukraine">Ukraine</option>
                            <option value="Poland">Poland</option>
                            <option value="Russia">Russia</option>
                            <option value="USA">USA</option>
                            <option value="Moldova">Moldova</option>
                        </select>
                        <label htmlFor="siteInput">Country</label>
                    </div>

                    <div className={`alert alert-success ${success ? "show" : "hidden"}`} role="alert">
                        Зміни успішно збережено!
                    </div>
                    <span className={`login-errors ${!errors === "" ? "show" : "hidden"}`}>
                        <ul>
                            <li>{errors.toString()}</li>
                        </ul>
                    </span>
                    <div className="col-12">
                        <button className="d-block m-auto w-50 btn btn-lg btn-primary mb-2" type="submit">Save Changes</button>
                    </div>

                </form>
                {loading && <EclipseWidget />}
            </div>
        )
    }
};

export default Settings