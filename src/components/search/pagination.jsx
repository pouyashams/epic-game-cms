import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import _ from 'lodash';

class Pagination extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    };

    makePageList = () => {
        const pageCount = Math.ceil(this.props.itemCount / this.props.pageSize);
        if (pageCount === 1) return [];
        return _.range(1, pageCount + 1);
    };


    render() {
        return (
            <div>
                <ul className=" col-12 pagination flex-wrap justify-content-center pr-0">
                    {this.makePageList().map(page => (
                        <li
                            className={
                                page === parseInt(this.props.currentPage)
                                    ? 'page-item active'
                                    : 'page-item'
                            }
                            key={page}
                        >
                            <button
                                className="page-link rounded-0"
                                onClick={() => this.props.onPageChange(page)}
                            >
                                {page}
                            </button>
                        </li>

                    ))}
                </ul>

            </div>
        );
    };
}

export default withRouter(Pagination);


