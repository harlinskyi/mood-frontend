import './Settings.css'
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import http from '../../../http-common';
import store from '../../../store';
import EclipseWidget from '../../common/eclipse/eclipse'


class Settings extends Component {

    
    constructor(props) {
        super(props);
        this.state = {};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted');
        event.preventDefault();
    }

    async componentDidMount() {
        const { userId } = store.getState().auth;
        this.setState({ loading: true })
        try {
            const response = await http.post(`get-user-profile?id=${userId}`);
            const userProfile = response.data;
            console.log(userProfile);
            this.setState(userProfile);
        } catch (badresponse) {
            console.log("problem", badresponse);
            // if(badresponse.response.status===401) {
            //     this.props.history.push("/login");
            // }
        }
        this.setState({ loading: false })
    }

    render() {
        const { loading, bithDay, email, firstName, lastName, nickName, location, quote, link, sex } = this.state;
        return (
            <div className="col-10 m-auto pt-2">
                <form className="form-edit p-4 mb-3 bg-body rounded-c shadow" onSubmit={this.handleSubmit} >
                    <h1 className="h3 mb-3 fw-normal text-center fw-bold">Settings</h1>

                    {/* <div className="mb-2">
                        <input type="file" className="form-control" id="inputGroupFile02" />
                    </div> */}

                    <div className="form-floating mb-2">
                        <textarea defaultValue={quote} type="text" onChange={this.handleChange} className="form-control" name="quote" id="quoteInput" placeholder="Quote" data-tempmail="0"></textarea>
                        <label htmlFor="quoteInput">Quote</label>
                    </div>

                    <div className="form-floating mb-2">
                        <input defaultValue={firstName} type="text" onChange={this.handleChange} className="form-control" name="firstName" id="firstnameInput" placeholder="firstname" data-tempmail="0" required />
                        <label htmlFor="firstnameInput">First name</label>
                    </div>

                    <div className="form-floating mb-2">
                        <input defaultValue={lastName} type="text" onChange={this.handleChange} className="form-control" name="lastName" id="lastnameInput" placeholder="lastname" data-tempmail="0" required />
                        <label htmlFor="lastnameInput">Last name</label>
                    </div>

                    <div className="form-floating mb-2">
                        <input defaultValue={nickName} type="text" onChange={this.handleChange} className="form-control" name="nickName" id="nicknameInput" placeholder="nickname" data-tempmail="0" required />
                        <label htmlFor="nicknameInput">Nickname</label>
                    </div>

                    <div className="form-floating mb-2" required>
                        <input defaultValue={email} type="email" onChange={this.handleChange} className="form-control" name="email" id="emailInput" placeholder="name@example.com" data-tempmail="0" required />
                        <label htmlFor="emailInput">Email address</label>
                    </div>
                    <div className="form-floating mb-2">
                        <select value={sex} className="form-select" onChange={this.handleChange} name="sex" aria-label="Default select example" required>
                            <option defaultValue="">Open this select menu</option>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                        </select>
                        <label htmlFor="siteInput">Gender</label>
                    </div>

                    <div className="form-floating mb-2">
                        <input defaultValue={bithDay && bithDay.substr(0, 10)} onChange={this.handleChange} type="date" className="form-control" name="bithDay" id="datebirthInput" placeholder="datebirth" data-tempmail="0" />
                        <label htmlFor="datebirthInput">Birthday</label>
                    </div>

                    <div className="form-floating mb-2">
                        <input defaultValue={link} type="text" onChange={this.handleChange} className="form-control" name="link" id="siteInput" placeholder="Site" data-tempmail="0" />
                        <label htmlFor="siteInput">Site</label>
                    </div>

                    <div className="form-floating mb-2">
                        <select value={location} className="form-select" onChange={this.handleChange} name="location" aria-label="Default select example">
                            <option defaultValue="">Open this select menu</option>
                            <option value="Ukraine">Ukraine</option>
                            <option value="Poland">Poland</option>
                            <option value="Russia">Russia</option>
                            <option value="USA">USA</option>
                            <option value="Moldova">Moldova</option>
                        </select>
                        <label htmlFor="siteInput">Country</label>
                    </div>


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