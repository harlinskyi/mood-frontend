import './Navbar.css'
import React, { Component } from "react";
import { Link } from 'react-router-dom'

class Navbar extends Component {
    render() {
        return (
            <header className="col-12 p-3 mb-3 border-bottom">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-between">
                        <Link to="/" className="logo mb-2 mb-lg-0 text-dark text-decoration-none">MOOD</Link>

                        {/* STARTLogged user */}
                        {/* <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li>
                                <Link to="#" className="nav-link px-2 link-secondary">Peoples</Link>
                            </li>
                        </ul>
                        <div className="dropdown text-end">
                            <Link to="#" className="d-block link-dark text-decoration-none dropdown-toggle" id="profile-menu" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://cdn.popcake.tv/wp-content/uploads/2020/09/pokrov90_118863382_963425367814685_6603924445247511753_n.jpg" alt="mdo" width="32" height="32" className="rounded-circle" />
                                <span className="header-username">Sveta Ivanova</span>
                            </Link>
                            <ul className="dropdown-menu text-small" aria-labelledby="profile-menu">
                                <li><Link className="dropdown-item" to="#">Settings</Link></li>
                                <li><Link className="dropdown-item" to="#">Profile</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" to="#">Sign out</Link></li>
                            </ul>
                        </div> */}
                        {/* END Logged user */}
                        <div className="header-login-page">
                            <Link to="/login" className="header-sign-in">Sign In</Link>
                            <Link to="/register" className="header-register">Regsiter</Link>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Navbar;