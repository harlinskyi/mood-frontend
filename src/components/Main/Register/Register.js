import './Register.css'
import React, { Component } from 'react'
import accountService from '../../../services/account.service';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import EclipseWidget from '../../common/eclipse/eclipse';

class Register extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Hello state", this.state);
    this.setState({ loading: true })
    try {
      const model = {
        email: this.state.email,
        password: this.state.password,
      };
      await accountService.register(model);
      this.setState({ success: true, errors: {} })
    } catch (badresponse) {
      this.setState({ success: false })
      console.log(badresponse.response);
      if (badresponse.response.data.errors) {
        const { errors } = badresponse.response.data;
        let problem = {};
        Object.entries(errors).forEach(([key, values]) => {
          problem[key] = values.map((msg, index) => {
            return (
              <li key={index}>{msg}</li>
            );
          });
        });
        this.setState({ errors: problem });
      }
      console.log("Виникли проблеми ", badresponse);

    }
    finally {
      this.setState({ loading: false })
    }
  };

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { email, password, errors, success, loading } = this.state;

    return (
      <div className="col-12 m-auto pt-5">
        <form className="form-register p-4 mb-5 bg-body rounded-c shadow" onSubmit={this.onSubmitHandler} >
          <h1 className="h3 mb-3 fw-normal text-center fw-bold">Register</h1>

          <div className="form-floating mb-2">
            <input
              type="email"
              className={classnames("form-control", { "is-invalid": errors.email })}
              value={email}
              id="email"
              name="email"
              placeholder="name@example.com"
              data-tempmail="0"
              onChange={this.onChangeHandler}
            />
            <label htmlFor="email">Email</label>
          </div>
          <span className="login-errors">
          <ul>
            {!!errors.email && errors.email}
          </ul>
          </span>
          <div className="form-floating mb-2" data-children-count="1">
            <input
              type="password"
              className={classnames("form-control", { "is-invalid": errors.password })}
              value={password}
              id="password"
              name="password"
              placeholder="Password"
              onChange={this.onChangeHandler}
              autoComplete="false"
            />
            <label htmlFor="password">Password</label>
          </div>
          <span className="login-errors">
            <ul>
              {!!errors.password && errors.password}
            </ul>
          </span>
          {!!success &&
            <div className="alert alert-success" role="alert">
              Registration with email <span>{email}</span> was successful, please <Link to="/login" className="login-msg" >log in</Link>!
          </div>
          }
          <button className="w-100 btn btn-lg btn-primary mb-2" type="submit">Register</button>
        </form>
        {loading && <EclipseWidget />}
      </div>
    );
  }
}

export default connect(null)(withRouter(Register))