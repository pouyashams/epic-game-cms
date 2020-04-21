import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";

const Pagination = ({itemCount, pageSize, onPageChange, currentPage}) => {
    const pageCount = Math.ceil(itemCount / pageSize);

    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);
    return (
        <div className="table-responsive">
            <ul className=" col-12 pagination justify-content-center pr-0">
                {pages.map(page => (
                    <li
                        className={
                            page === parseInt(currentPage)
                                ? 'page-item active'
                                : 'page-item'
                        }
                        key={page}
                    >
                        <button
                            className="page-link rounded-0"
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

Pagination.propTypes = {
    itemCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
};

export default withRouter(Pagination);
