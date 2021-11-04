import './Pagination.css'
import classnames from 'classnames';
import React from 'react';
import t from '../../../utils/translations';

const Pagination = ({ logsPerPage, totalLogs, paginate, prev, next, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalLogs / logsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="Page navigation">
            <ul className='pagination justify-content-center'>
                <li className={classnames('page-item', { 'disabled': currentPage === 1 })}>
                    <span onClick={() => prev()} className='page-link'>
                        {t('prev')}
                    </span>
                </li>
                {pageNumbers.map(number => (
                    <li key={number} className={classnames('page-item', { 'active': currentPage === number })}>
                        <span onClick={() => paginate(number)} className='page-link'>
                            {number}
                        </span>
                    </li>
                ))}
                <li className={classnames('page-item', { 'disabled': currentPage === pageNumbers.length })}>
                    <span onClick={() => next(pageNumbers.length)} className='page-link'>
                        {t('next')}
                    </span>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;