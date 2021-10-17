import './Navbar.css';
import React, { Component } from "react";
import { Link, withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

class Navbar extends Component {

    onClickLogout = async (e) => {
        e.preventDefault();
        try {
            logout(this.props.dispatch);
            localStorage.removeItem('authToken');
            this.props.history.push("/");
            console.log("Logout був успішний!");
          } catch (error) {
            console.log("Logout був неуспішний:", error);
          }
    }
    render() {
        const { isAuth, email, role, userId } = this.props;

        return (
            <header className="col-12 p-3 mb-3 border-bottom">
                <div className="container-lg">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-between">
                        <Link to="/" className="logo mb-2 mb-lg-0 text-dark text-decoration-none">MOOD</Link>
                        {isAuth ?
                            <>
                                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                                    <li>
                                        <Link to="/peoples" className="nav-link px-2 link-secondary">Peoples</Link>
                                    </li>
                                </ul>
                                <div className="dropdown text-end">
                                    <Link to="#" className="d-block link-dark text-decoration-none dropdown-toggle" id="profile-menu" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src="https://cdn.popcake.tv/wp-content/uploads/2020/09/pokrov90_118863382_963425367814685_6603924445247511753_n.jpg" alt="mdo" width="32" height="32" className="rounded-circle" />
                                        <span className="header-username">{email}</span>
                                    </Link>
                                    <ul className="dropdown-menu text-small" aria-labelledby="profile-menu">
                                        <li><Link className="dropdown-item" to={`/${userId}/settings`}><i className="fa fa-cog me-2" aria-hidden="true"></i>Settings</Link></li>
                                        <li><Link className="dropdown-item" to={`/${userId}/profile`}><i className="fa fa-user me-2" aria-hidden="true"></i>Profile</Link></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><Link className="dropdown-item" to="/" onClick={this.onClickLogout}><i className="fa fa-sign-out me-2" aria-hidden="true"></i>Sign out</Link></li>
                                    </ul>
                                </div>
                            </>
                            :
                            <div className="header-login-page">
                                <Link to="/login" className="header-sign-in">Sign In</Link>
                                <Link to="/register" className="header-register">Regsiter</Link>
                            </div>
                        }
                    </div>
                </div>
            </header>
        );
    }
}


function mapStateToProps(state) {
    return {
        isAuth: state.auth.isAuth,
        email: state.auth.email,
        userId: state.auth.userId
    };
}


export default connect(mapStateToProps)(withRouter(Navbar));