import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import Pagination from "react-js-pagination";

class SearchResult extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    handlePageChange = page => {
        sessionStorage.setItem('currentPage', page);
        this.props.setPage(page);
    };

    render() {
        const {currentPage} = this.props;
        const {headerInfo, searchResultList, pageSize} = this.props;
        let num = currentPage;
        if (num === null || num === 0) {
            num = 1
        }
        let counter = (num - 1) * pageSize;
        let loopCounter = 1;
        return (
            <div className="col-12 justify-content-center align-items-center text-center pt-3 scroll-x-off">
                    <table className="table t-responsive table-bordered table-striped sc-y-h ">
                        <thead className="bg-dark">
                        <tr>
                            <th className="hidden-xs table-counter"/>
                            {headerInfo.showCheckBox ? (
                                <th>
                                    <input type="checkbox" id="checkAll"/>
                                </th>
                            ) : null}
                            {headerInfo.headerTitleInfos.map((headerTitleInfo) => (
                                <th className="text-center text-light" key={loopCounter++}>{headerTitleInfo.title}</th>
                            ))}
                            {headerInfo.actions.map((action) =>
                                (
                                    <th className="text-center text-light" key={loopCounter++}>{action.title}</th>
                                )
                            )} {headerInfo.dropdowns.map((dropdown) =>
                            (
                                <th className="text-center text-light" key={loopCounter++}>{dropdown.title}</th>
                            )
                        )}
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.searchResultList.length === 0 ?
                            (
                                <tr key={loopCounter++}>
                                    <td colSpan={headerInfo.headerTitleInfos.length + headerInfo.actions.length + headerInfo.dropdowns.length + 1}>
                                        {this.props.language.tableResult}
                                    </td>
                                </tr>
                            )
                            : this.props.searchResultList.map((searchResult) =>
                                (
                                    <tr key={loopCounter++}>
                                        <td className="hidden-xs table-counter">
                                            {++counter}
                                        </td>
                                        {headerInfo.showCheckBox ? (
                                            <td>
                                                <input type="checkbox" className="check"/>
                                            </td>
                                        ) : null}
                                        {headerInfo.headerTitleInfos.map((headerTitleInfo) =>
                                            (
                                                <td key={loopCounter++}>{searchResult[headerTitleInfo.name]}</td>
                                            )
                                        )}
                                        {headerInfo.actions.map((action) =>
                                            (
                                                <td key={loopCounter++}>
                                                    <button className={action.style} data-title={action.title}
                                                            onClick={() => {
                                                                action.onclick(searchResult)
                                                            }}>
                                                        <span className={action.icon} title={action.title}/>
                                                    </button>
                                                </td>
                                            )
                                        )}
                                        {headerInfo.dropdowns.map((dropdown) =>
                                            (
                                                <td key={loopCounter++}>
                                                    <div className="dropdown">
                                                        <button className={`w-38 ${dropdown.style}`}
                                                                id={dropdown.id}
                                                                data-title={dropdown.title}
                                                                data-toggle="dropdown"
                                                                aria-haspopup="true"
                                                                aria-expanded="false"
                                                        >
                                                            <span className={dropdown.icon} title={dropdown.title}/>
                                                        </button>
                                                        <div className="dropdown-menu" aria-labelledby={dropdown.id}>
                                                            {dropdown.item.map((itemInfo) =>
                                                                (
                                                                    <label className="dropdown-item pointer"
                                                                           onClick={() => {
                                                                               itemInfo.onclick(searchResult)
                                                                           }}
                                                                    >
                                                                        <span className={`pl-10 ${itemInfo.icon}`}/>
                                                                        {itemInfo.itemTitle}
                                                                    </label>


                                                                )
                                                            )
                                                            }
                                                        </div>
                                                    </div>
                                                </td>
                                            )
                                        )}
                                    </tr>
                                )
                            )
                        }
                        </tbody>
                    </table>
                {searchResultList.length !== 0 ? (
                    <div className={this.props.language.rtl ? "rtl dis-inline-flex" : "ltr dis-inline-flex"}>
                        <Pagination
                            activePage={parseInt(currentPage)}
                            itemsCountPerPage={pageSize}
                            totalItemsCount={this.props.count}
                            pageRangeDisplayed={5}
                            itemClass="page-item"
                            linkClass="page-link"
                            onChange={this.handlePageChange.bind(this)}
                        />
                    </div>
                ) : null}

            </div>
        );
    }

}

export default withRouter(SearchResult);




