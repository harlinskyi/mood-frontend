import './Register.css'
import React, { Component } from 'react'
import accountService from '../../../services/account.service';
import { Link, withRouter } from 'react-router-dom';
import { authUser } from '../../../actions/auth';
import { connect } from 'react-redux';

class Register extends Component {
  state = {
    email: "",
    password: "",
    errors: {
      password: "",
    },
    success: false,
    loading: false
  };

  onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Hello state", this.state);
    this.setState({loading: true})
    try {
        const model = {
            email: this.state.email,
            password: this.state.password,
        };
        const res = await accountService.register(model);
        this.setState({success: true})
        const { token } = res.data;

        // localStorage.setItem("authToken", token);
        // authUser(token, this.props.dispatch);
        // this.props.dispatch({type: REGISTER_AUTH});

        // console.log("Усе пройшло добре", res);
        
        // this.props.history.push("/");
    } catch (error) {
      console.log("Виникли проблеми");
    }
    finally {
      this.setState({loading: false})
    }
  };

  onChangeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const { email, password, errors, success } = this.state;

    return (
      <div className="col-12 m-auto pt-5">
        <form className="form-register p-4 mb-5 bg-body rounded-c shadow" onSubmit={this.onSubmitHandler} >
          <h1 className="h3 mb-3 fw-normal text-center fw-bold">Register</h1>

          <div className="form-floating mb-2">
            <input
              type="email"
              className="form-control"
              value={email}
              id="email"
              name="email"
              placeholder="name@example.com"
              data-tempmail="0"
              onChange = {this.onChangeHandler}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-floating mb-2" data-children-count="1">
            <input
              type="password"
              className="form-control"
              value={password}
              id="password"
              name="password"
              placeholder="Password"
              onChange = {this.onChangeHandler}
            />
            <label htmlFor="password">Password</label>
          </div>
          <span className="login-errors hidden">
            <ul>
              <li>Some problem 1</li>
            </ul>
          </span>
          <div className={`alert alert-success ${success ? 'show' : 'hidden'}`} role="alert">
              Реєстрація пройшла успішно, <Link to="/login" className="login-msg" >авторизуйтесь</Link> використовуючи дані при реєстрації!
          </div>
          <button className="w-100 btn btn-lg btn-primary mb-2" type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default connect(null)(withRouter(Register))