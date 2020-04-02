import React, {Component} from 'react';
import Pagination from "./pagination";
import {paginate} from "../../utils/paginate";
import {withRouter} from "react-router-dom";

class SearchResult extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    handlePageChange = page => {
        sessionStorage.setItem('currentPage', page);
        this.props.setPage(page);
    };

    getPageData = () => {
        const {searchResultList, pageSize} = this.props;
        const {currentPage} = this.props;
        const subSearchResultList = paginate(searchResultList, currentPage, pageSize);
        return subSearchResultList;
    };

    render() {
        const {currentPage} = this.props;
        const {headerInfo, searchResultList, pageSize} = this.props;
        // const searchResultForThisPage = this.getPageData();
        let counter = (currentPage - 1) * pageSize;
        let loopCounter = 1;
        return (
            <div className="col-12 justify-content-center align-items-center text-center table-responsive pt-3 sc-y-h">
                <table className="table table-bordered table-striped">
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
                                    موردی یافت نشد.
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
                        <Pagination
                            itemCount={this.props.count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={this.handlePageChange}
                        />
                ) : null}
            </div>
        );
    }

}

export default withRouter(SearchResult);




