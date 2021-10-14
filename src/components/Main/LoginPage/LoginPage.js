import './LoginPage.css'
import React, { Component } from 'react'
import accountService from '../../../services/account.service';
import { authUser } from '../../../actions/auth';
import { LOGIN_AUTH } from '../../../actions/types';

class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    errors: {
      password: "",
    },
  };


  onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Hello state", this.state);
    try {
      const model = {
        email: this.state.email,
        password: this.state.password,
      };

      const res = await accountService.login(model);
      const token = res.data;
      console.log("TOKEN", token)

      localStorage.setItem("authToken", token);
      authUser(token, this.props.dispatch);
    //   this.props.dispatch({type: LOGIN_AUTH});

      console.log("Усе пройшло добре", res);

      // this.props.history.push("/");
    } catch (error) {
      console.log("Виникли проблеми");
    }
  };

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { email, password, errors } = this.state;
    return (
      <div className="col-12 m-auto pt-5">
        <form
          className="form-signin p-4 mb-5 bg-body rounded-c shadow"
          onSubmit={this.onSubmitHandler}
        >
          <h1 className="h3 mb-3 fw-normal text-center fw-bold">Sign In</h1>
          <div className="form-floating mb-2">
            <input
              type="email"
              className="form-control is-invalid"
              onChange={this.onChangeHandler}
              value={email}
              name="email"
              id="floatingInput"
              placeholder="name@example.com"
              data-tempmail="0"
            />
            <label htmlFor="email">Email address</label>
          </div>
          <div className="form-floating mb-2" data-children-count="1">
            <input
              type="password"
              className="form-control is-valid"
              onChange={this.onChangeHandler}
              value={password}
              name="password"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="password">Password</label>
          </div>
          <span className="login-errors">
            <ul>
              <li>Some problem 1</li>
            </ul>
          </span>
          <button className="w-100 btn btn-lg btn-primary mb-2" type="submit">
            Sign in
          </button>
        </form>
      </div>
    );
  }
}

export default LoginPage;