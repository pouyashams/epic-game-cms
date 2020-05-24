import React, {Component} from 'react';
import Pagination from "./pagination";
import {paginate} from "../../utils/paginate";

class Table extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1
        }
    }

    handlePageChange = page => {
        this.setState({currentPage: page});
    };

    getPageData = () => {
        const {searchResultList, pageSize} = this.props;
        const {currentPage} = this.state;
        const subSearchResultList = paginate(searchResultList, currentPage, pageSize);
        return subSearchResultList;
    };


    render() {
        const {currentPage} = this.state;
        const {headerInfo, searchResultList, pageSize} = this.props;
        const searchResultForThisPage = this.getPageData();
        let counter = (currentPage - 1) * pageSize;
        let loopCounter = 1;
        return (
            <div className="col-12 justify-content-center align-items-center text-center table-responsive">
                <table className="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th className="hidden-xs table-counter"></th>
                        {headerInfo.showCheckBox ? (
                            <th>
                                <input type="checkbox" id="checkAll"/>
                            </th>
                        ) : null}
                        {headerInfo.headerTitleInfos.map((headerTitleInfo) => (
                            <th className={this.props.theme === "day" ? "text-center text-dark" : "text-center text-white"}
                                key={loopCounter++}>{headerTitleInfo.title}</th>
                        ))}
                        {headerInfo.actions.map(() =>
                            (
                                <th key={loopCounter++}/>
                            )
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    {searchResultForThisPage.length === 0 ?
                        (
                            <tr key={loopCounter++}>
                                <td colSpan={headerInfo.headerTitleInfos.length + headerInfo.actions.length + 1}>
                                    {this.props.language.tableResult}
                                </td>
                            </tr>
                        )
                        : searchResultForThisPage.map((searchResult) =>
                            (
                                <tr key={loopCounter++}>
                                    <td className={this.props.theme === "day" ? "text-center text-dark hidden-xs" : "text-center text-white hidden-xs"}>
                                        {++counter}
                                    </td>
                                    {headerInfo.showCheckBox ? (
                                        <td>
                                            <input type="checkbox" className="check"/>
                                        </td>
                                    ) : null}
                                    {headerInfo.headerTitleInfos.map((headerTitleInfo) =>
                                        (
                                            <td className={this.props.theme === "day" ? "text-dark" : "text-white"}
                                                key={loopCounter++}>{searchResult[headerTitleInfo.name]}</td>
                                        )
                                    )}
                                    {headerInfo.actions.map((action) =>
                                        (
                                            <td key={loopCounter++}>
                                                <button className={action.style} data-title={action.title}
                                                        onClick={() => {
                                                            action.onclick(searchResult)
                                                        }}>
                                                    <span className={action.icon} title={action.title}></span>
                                                </button>
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
                        itemCount={searchResultList.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    />
                ) : null}
            </div>
        );
    }

}

export default Table;
