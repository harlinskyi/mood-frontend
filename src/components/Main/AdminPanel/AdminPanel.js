import './AdminPanel.css'
import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import t from '../../../utils/translations';
import logo from '../../../images/logo.png'
import classnames from 'classnames';
import http from '../../../http-common';
import Pagination from '../../common/Pagination/Pagination';
import EclipseWidget from '../../common/eclipse/eclipse';
import customFunc from '../../../utils/customFunc';

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
                        <div className="logs-table table-responsive flex-column">
                            <Route path={`/admin-panel/logs`} component={Logs} />
                            <Route path={`/admin-panel/peoples`} component={Peoples} />
                        </div>
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
                        <LogsTable logs={currentLogs} loading={loading} />
                    </tbody>
                </table>
            </div>
            <Pagination logsPerPage={logsPerPage} totalLogs={logs.length} paginate={paginate} prev={prev} next={next} currentPage={currentPage} />
        </>
    )
}

const LogsTable = ({ logs, loading }) => {
    if (loading) {
        return (
            <tr>
                <td>
                    <EclipseWidget />
                </td>
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
    const [logs, setLogs] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [logsPerPage] = useState(15);
    const [userDel, setDelteUser] = useState(false);

    useEffect(() => {
        const fetchLogs = async () => {
            setLoading(true)
            const res = await http.post('get-users')
            setLogs(res.data.userShortInfos)
            setLoading(false)
        }

        fetchLogs();
    }, [], [userDel])

    const paginate = pageNumber => setCurrentPage(pageNumber);
    const prev = () => { currentPage > 1 && setCurrentPage(currentPage - 1) }
    const next = (pageNumbersLenght) => { currentPage < pageNumbersLenght && setCurrentPage(currentPage + 1) }

    const indexOfLastLog = currentPage * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog)
    console.log(currentLogs)
    return (
        <>
            <div>
                <h2 className="text-center">{t('Peoples')}</h2>
                <table className="table table-striped table-hover table-logs">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">{t('Email')}</th>
                            <th scope="col">{t('First Name')}</th>
                            <th scope="col">{t('Last Name')}</th>
                            <th scope="col">{t('Nickname')}</th>
                            <th scope="col">{t('Birthday')}</th>
                            <th scope="col">{t('Country')}</th>
                            <th scope="col">{t('Photo')}</th>
                            <th scope="col">{t('Actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <UsersTable logs={currentLogs} loading={loading} />
                    </tbody>
                </table>
            </div>
            <Pagination logsPerPage={logsPerPage} totalLogs={logs.length} paginate={paginate} prev={prev} next={next} currentPage={currentPage} />
        </>
    )
}


const UsersTable = ({ logs, loading }) => {

    const handleDeleteUser = async (id) => {
        console.log('click', id)
        if (window.confirm(t('Are you sure you want to delete this article?'))) {
            if (id !== 1) {
                try {
                    await http.post(`delete-user?id=${id}`);
                    window.location.reload();
                } catch (badresponse) {
                    console.log(badresponse.response);
                }
            }
            else {
                alert(t('It is forbidden to delete this user.'))
            }

        }
    }

    if (loading) {
        return (
            <tr>
                <td>
                    <EclipseWidget />
                </td>
            </tr>
        )
    }
    console.log('UsersTable', logs)
    return (
        <>
            {logs.map(log => (
                <tr key={log.id}>
                    <th scope="row">{log.id}</th>
                    <td>{log.email}</td>
                    <td>{log.firstName}</td>
                    <td>{log.lastName}</td>
                    <td>{log.nickname}</td>
                    <td>{log.bithDay}</td>
                    <td>{log.location}</td>
                    <td>{log.fileName ?
                        <div className="admin-panel-users-photo">
                            <img alt="User photo" src={customFunc.getBaseUrl() + log.fileName} />
                        </div> : t('No photo')}
                    </td>
                    <td>
                        <label className="edit me-2" onClick={() => handleDeleteUser(log.id)}><i className="fa fa-edit" aria-hidden="true"></i></label>
                        <label className="delete" onClick={() => handleDeleteUser(log.id)}><i className="fa fa-trash-o" aria-hidden="true"></i></label>
                    </td>
                </tr>
            ))}
        </>
    )
}