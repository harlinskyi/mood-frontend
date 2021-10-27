import './LoginPage.css'
import React, { Component } from 'react'
import accountService from '../../../services/account.service';
import { withRouter } from "react-router-dom";
import { authUser } from '../../../actions/auth';
import { connect } from 'react-redux';
import EclipseWidget from '../../common/eclipse/eclipse';
import classnames from 'classnames';
class LoginPage extends Component {

  state = {
    email: '',
    password: '',
    errors: {}
  };

  onSubmitHandler = async (e) => {
    e.preventDefault();

    this.setState({ loading: true })
    try {
      const model = {
        email: this.state.email,
        password: this.state.password,
      };
      const res = await accountService.login(model);
      const token = res.data;
      localStorage.setItem("authToken", token);
      const userId = authUser(token, this.props.dispatch);
      this.props.history.push(`/profile/${userId}`);

    } catch (badresponse) {
      this.setState({ success: false })
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
      else if (badresponse.response.data) {
        this.setState({ errors: badresponse.response.data });
      }
    }
    finally {
      this.setState({ loading: false })
    }
  };

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { email, password, loading, errors } = this.state;
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
              className={classnames("form-control", {"is-invalid": errors.email})}
              onChange={this.onChangeHandler}
              value={email}
              name="email"
              id="floatingInput"
              placeholder="name@example.com"
              data-tempmail="0"
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-floating mb-2" data-children-count="1">
            <input
              type="password"
              className={classnames("form-control", {"is-invalid": errors.email})}
              onChange={this.onChangeHandler}
              value={password}
              name="password"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="password">Password</label>
          </div>
          <span className={`login-errors`}>
            <ul>
              {errors.Password && <ErrorListItem error={errors.Password} />}
              {errors.Email && <ErrorListItem error={errors.Email} />}
            </ul>

          </span>
          <button className="w-100 btn btn-lg btn-primary mb-2" type="submit">
            Sign in
          </button>
        </form>

        {loading && <EclipseWidget />}
      </div>
    );
  }
}

export default connect(null)(withRouter(LoginPage))


function ErrorListItem(props) {
  return (
    props.error.map((msg, index) =>
      <li key={index}>{msg}</li>
    ))
}