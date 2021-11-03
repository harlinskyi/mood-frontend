import './AdminPanel.css'
import React, { useRef, useState } from 'react';
import { Formik, Form } from 'formik';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
    Link
} from "react-router-dom";
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import t from '../../../utils/translations';
import logo from '../../../images/logo.png'
import classnames from 'classnames';

const Logs = () => {
    return ('logs')
}

const Peoples = () => {
    return ('peoples')
}

const AdminPanel = () => {
    const [path, setActivePage] = useState("");

    return (
        <div className="admin-panel container">
            <div className="row">
                <div className="col-2 admin-menu">
                    <div className="d-flex flex-column flex-shrink-0 pt-3 h-100">
                        <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none m-0-auto">
                        <label className="fs-5 admin-logo ">
                            <img alt={logo} src={logo} className="me-2" width="22"/>
                                {t('Admin-panel')}
                            </label>
                        </Link>
                        <hr />
                        <ul className="nav nav-pills flex-column mb-auto">
                            <li className="nav-item">
                                <Link to="/admin-panel/logs" className={classnames("nav-link link-dark", {"active" : window.location.pathname === '/admin-panel/logs'})} aria-current="page">
                                    <i className="fa fa-tasks me-3" aria-hidden="true"></i>{t('Logs')}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin-panel/peoples" className={classnames("nav-link link-dark", {"active" : window.location.pathname === '/admin-panel/peoples'})} aria-current="page">
                                    <i className="fa fa-users me-3" aria-hidden="true"></i>{t('Peoples')}
                                </Link>
                            </li>
                        </ul>
                        <hr />
                        <div>
                            <div className="admin-menu-info text-center">{t('DEV. GROUP')}:</div>
                            <ul>
                                <li>{t('Harlinskyi Kyrylo')}</li>
                                <li>{t('Mychko Andrii')}</li>
                                <li>{t('Tyshchuk Mykola')}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-10 admin-body">
                    <Switch>
                        <Route path={`/admin-panel/logs`} component={Logs} />
                        <Route path={`/admin-panel/peoples`} component={Peoples} />
                    </Switch>
                </div>
            </div>
        </div>
    )
}
export default AdminPanel

