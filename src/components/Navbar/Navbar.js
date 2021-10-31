import './Navbar.css';
import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import default_photo from '../../images/default_photo.jpg';
import store from '../../store';
import t from '../../utils/translations';
import Flags from 'country-flag-icons/react/3x2'

import ReactLanguageSelect from 'react-languages-select';
import 'react-languages-select/css/react-languages-select.css';

class Navbar extends Component {
    
    onClickLogout = async (e) => {
        e.preventDefault();
        try {
            logout(this.props.dispatch);
            localStorage.removeItem('authToken');
            this.props.history.push("/");
          } catch (error) {
            console.log("Logout був неуспішний:", error);
          }
    }
    
    changeLanguage = (languageCode) => {
        localStorage.language = languageCode;
        window.location.reload();
    }
    
    render() {
        const { isAuth, email, role , userId } = this.props;
        return (
            <header className="col-12 p-3 mb-3 border-bottom">
                <div className="container-lg">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-between">
                        <Link to="/" className="logo mb-2 mb-lg-0 text-dark text-decoration-none">MOOD</Link>
                        {isAuth ?
                            <>
                                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                                    <li><Link to="/peoples" className="nav-link px-2 link-secondary">{t('Peoples')}</Link></li>
                                    {role === 'Admin' &&
                                        <li><Link to="/admin-panel" className="nav-link px-2 link-secondary">Admin Panel</Link></li>
                                    }
                                    
                                </ul>
                                <div className="dropdown text-end">
                                    <Link to="#" className="d-block link-dark text-decoration-none dropdown-toggle" id="profile-menu" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src={default_photo} alt="mdo" width="32" height="32" className="rounded-circle" />
                                        <span className="header-username">{email}</span>
                                    </Link>
                                    <ul className="dropdown-menu text-small" aria-labelledby="profile-menu">
                                        <li><Link className="dropdown-item" to={`/settings`}><i className="fa fa-cog me-2" aria-hidden="true"></i>{t('Settings')}</Link></li>
                                        <li><Link className="dropdown-item" to={`/profile/${userId}`}><i className="fa fa-user me-2" aria-hidden="true"></i>{t('My Profile')}</Link></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><Link className="dropdown-item" to="/" onClick={this.onClickLogout}><i className="fa fa-sign-out me-2" aria-hidden="true"></i>{t('Sign out')}</Link></li>
                                    </ul>
                                </div>
                            </>
                            :
                            <div className="header-login-page">
                                <Link to="/login" className="header-sign-in">{t('Log in')}</Link>
                                <Link to="/register" className="header-register">{t('Registration')}</Link>
                            </div>
                        }
                        <span className="language-select">
                            <ReactLanguageSelect 
                                className="ms-2"
                                languages={["en", "ua"]}
                                defaultLanguage={localStorage.language}
                                onSelect={this.changeLanguage}
                                />
                        </span>
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
        userId: state.auth.userId,
        role: state.auth.role
    };
}


export default connect(mapStateToProps)(withRouter(Navbar));