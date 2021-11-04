import './AdminPanel.css'
import React, { useEffect, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';
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
                                    <i className="fa fa-tasks me-3" aria-hidden="true"></i>{t('Logs')}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin-panel/peoples" className={classnames("nav-link link-dark", { "active": window.location.pathname === '/admin-panel/peoples' })} aria-current="page">
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
                        <Route path={`/admin-panel/logs`}>
                            <div id="container">
                                <table className="table table-striped table-hover table-logs">
                                    <thead>
                                        <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Action Type</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <Logs itemsPerPage={5}/>
                                    </tbody>
                                </table>
                            </div>
                        </Route>
                        <Route path={`/admin-panel/peoples`} component={Peoples} />
                    </Switch>
                </div>
            </div>
        </div>
    )
}
export default AdminPanel


// const Logs =  ({ currentItems }) => {
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     useEffect( async () => {
//         try {
//             const response = await http.post(`get-history`);
//             var logsObject = response.data
//             console.log(logsObject)
//         } catch (badresponse) {
//             console.log("logs problem", badresponse);
//         }
//     }, []);

//     return ('logs')
// }

const Peoples = () => {
    return "2"
}


var items = [];

function Items({ currentItems }) {
    return (
        <>
            {currentItems &&
                currentItems.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.actionType}</td>
                        <td>{item.description}</td>
                        <td>{item.date}</td>
                    </tr>
                ))}
        </>
    );
}
function Logs({ itemsPerPage }) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    const [asyncData, changeAsyncData] = useState([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect( () => {
        // // Fetch items from another resources.
            const endOffset = itemOffset + itemsPerPage;
            setCurrentItems(items.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, asyncData]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect ( async () => {
        try {
            const res = await http.post('get-history')
            items = res.data
            // items = res.data
            // const endOffset = itemOffset + itemsPerPage;
            // setCurrentItems(items.slice(itemOffset, endOffset));
            changeAsyncData(res.data)
        } catch (error) {
        }
    }, [])
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
    };

    return (
        <>
            <Items currentItems={items} />
            <ReactPaginate
                nextLabel={<i className='fa fa-chevron-right' aria-hidden='true'></i>}
                onPageChange={handlePageClick}
                pageRangeDisplayed={20}
                pageCount={pageCount}
                previousLabel={<i className="fa fa-chevron-left" aria-hidden="true"></i>}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />
        </>
    );
}
