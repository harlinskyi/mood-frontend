import './AdminPanel.css'
import React, { useEffect, useRef, useState } from 'react';
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
import http from '../../../http-common';
import Pagination from '../../common/Pagination/Pagination';

const AdminPanel = () => {

    return (
        <div className="admin-panel container">
            <div className="row">
                <div className="col-2 admin-menu">
                    <div className="d-flex flex-column flex-shrink-0 pt-3 h-100">
                        <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none m-0-auto">
                            <label className="fs-5 admin-logo ">
                                <img alt={logo} src={logo} className="me-2" width="22" />
                                {t('Admin-panel')}
                            </label>
                        </Link>
                        <hr />
                        <ul className="nav nav-pills flex-column mb-auto">
                            <li className="nav-item">
                                <Link to="/admin-panel/logs" className={classnames("nav-link link-dark", { "active": window.location.pathname === '/admin-panel/logs' })} aria-current="page">
                                    <i className="fa fa-clock-o me-2" aria-hidden="true"></i>{t('Logs')}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin-panel/peoples" className={classnames("nav-link link-dark", { "active": window.location.pathname === '/admin-panel/peoples' })} aria-current="page">
                                    <i className="fa fa-users me-2" aria-hidden="true"></i>{t('Peoples')}
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
                        <Route path={`/admin-panel/logs`}>
                            <Logs />
                        </Route>
                        <Route path={`/admin-panel/peoples`} component={Peoples} />
                    </Switch>
                </div>
            </div>
        </div>
    )
}
export default AdminPanel

const Logs = () => {
    const [logs, setLogs] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [logsPerPage] = useState(15);

    useEffect(() => {
        const fetchLogs = async () => {
            setLoading(true)
            const res = await http.post('get-history')
            setLogs(res.data)
            setLoading(false)
        }

        fetchLogs();
    }, [])

    const paginate = pageNumber => setCurrentPage(pageNumber);
    const prev = () => { currentPage > 1 && setCurrentPage(currentPage - 1) }
    const next = (pageNumbersLenght) => { currentPage < pageNumbersLenght && setCurrentPage(currentPage + 1) }

    const indexOfLastLog = currentPage * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog)
    return (
        <>
            <div className="logs-table table-responsive flex-column">
                <div>
                    <h2 className="text-center">{t('Logs')}</h2>
                    <table className="table table-striped table-hover table-logs">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">{t('Action Type')}</th>
                                <th scope="col">{t('Description')}</th>
                                <th scope="col">{t('Date')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <LogTable logs={currentLogs} loading={loading} />
                        </tbody>
                    </table>
                </div>
                <Pagination logsPerPage={logsPerPage} totalLogs={logs.length} paginate={paginate} prev={prev} next={next} currentPage={currentPage} />
            </div>

        </>
    )
}

const LogTable = ({ logs, loading }) => {
    if (loading) {
        return (
            <tr>
                <td>Loading...</td>
            </tr>
        )
    }
    return (
        <>
            {logs.map(log => (
                <tr key={log.id}>
                    <th scope="row">{log.id}</th>
                    <td>{log.actionType}</td>
                    <td className="wrap">{log.description}</td>
                    <td>{log.date}</td>
                </tr>
            ))}
        </>
    )

}
const Peoples = () => {
    return (<h2 className="text-center">{t('Peoples')}</h2>)
}