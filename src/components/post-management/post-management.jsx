import React, {Component} from 'react';
import SearchCriteria from "../search/search-criteria";
import SearchResult from "../search/search-result";
import {toast} from 'react-toastify';
import Loading from '../loading/loading';
import "../../css/loading.css"
import {withRouter} from 'react-router-dom';
import {
    onActive,
    onDeActive,
    onDelete,
    onRemove,
    searchAcount,
} from "../../services/acountService"


class PostManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageSize: 15,
            searchResultList: [],
            progress: false,
            bot: "",
            count: "",
            currentPage: sessionStorage.getItem('currentPage'),
        };
        this.onEdit = this.onEdit.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onShow = this.onShow.bind(this);
        this.search = this.search.bind(this);
        this.searchAuto = this.searchAuto.bind(this);
        this.onShowHistory = this.onShowHistory.bind(this);
    };

    async componentDidMount() {
        this.searchAuto();
    };

    onAdd() {
        this.props.history.push({
            pathname: '/add-post',
        });
    };

    onShow(searchResult) {
        this.props.history.push({
            pathname: '/show-post',
            accountInfo: searchResult
        });
    };

    onEdit(searchResult) {
        this.props.history.push({
            pathname: '/edit-post',
            accountInfo: searchResult
        });
    };

    onShowHistory(searchResult) {
        this.props.history.push({
            pathname: '/show-history',
            historyInfo: searchResult
        });
    };

    onDeActiveInfo = async (searchResult) => {
        if (searchResult.status !== "DELETED_POST_STATUS") {
            this.setState({progress: true});
            try {
                const result = await onDeActive({identifier: parseInt(searchResult.identifier)});
                if (result.status === 200) {
                    toast.success(this.props.language.notificationSold);
                    this.setState({progress: false});
                }
            } catch (ex) {
                if (ex.response && ex.response.status === 400) {
                    toast.error(this.props.language.conError);
                    this.setState({progress: false});
                }
            }
            this.searchAuto();
        } else {
            toast.error(this.props.language.delSoldError);
        }

    };

    setPage = page => {
        this.setState({
            currentPage: page
        }, () => {
            this.searchAuto();
        })
    };

    onDeleteInfo = async (searchResult) => {
        this.setState({progress: true});
        try {
            const result = await onDelete({identifier: parseInt(searchResult.identifier)});
            if (result.status === 200) {
                toast.success(this.props.language.delText);
                this.setState({progress: false});
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(this.props.language.conError);
                this.setState({progress: false});
            }
        }
        this.searchAuto();
    };

    onActiveInfo = async (searchResult) => {
        switch (searchResult.status) {
            case "DELETED_POST_STATUS":
                toast.error(this.props.language.postDelError);
                break;
            case "SOLD_POST_STATUS":
                toast.error(this.props.language.postSoldError);
                break;
            default:
                this.setState({progress: true});
                try {
                    const result = await onActive({identifier: parseInt(searchResult.identifier), silent: false});
                    if (result.status === 200) {
                        toast.success(this.props.language.postText);
                        this.setState({progress: false});
                    }
                } catch (ex) {
                    if (ex.response && ex.response.status === 400) {
                        toast.error(this.props.language.conError);
                        this.setState({progress: false});
                    }
                }
                this.searchAuto();
        }
    };

    onActiveInfoSilent = async (searchResult) => {
        switch (searchResult.status) {
            case "DELETED_POST_STATUS":
                toast.error(this.props.language.postDelError);
                break;
            case "SOLD_POST_STATUS":
                toast.error(this.props.language.postSoldError);
                break;
            default:
                this.setState({progress: true});
                try {
                    const result = await onActive({identifier: parseInt(searchResult.identifier), silent: true});
                    if (result.status === 200) {
                        toast.success(this.props.language.postText);
                        this.setState({progress: false});
                    }
                } catch (ex) {
                    if (ex.response && ex.response.status === 400) {
                        toast.error(this.props.language.conError);
                        this.setState({progress: false});
                    }
                }
                this.searchAuto();
        }

    };

    onRemoveInfo = async (searchResult) => {
        switch (searchResult.status) {
            case "DELETED_POST_STATUS":
                toast.error(this.props.language.delError);
                break;
            case "SOLD_POST_STATUS":
                toast.error(this.props.language.removeError);
                break;
            default:
                this.setState({progress: true});
                try {
                    const result = await onRemove({identifier: parseInt(searchResult.identifier)});
                    if (result.status === 200) {
                        toast.success(this.props.language.removeText);
                        this.setState({progress: false});
                    }
                } catch (ex) {
                    if (ex.response && ex.response.status === 400) {
                        toast.error(this.props.language.conError);
                        this.setState({progress: false});
                    }
                }
                this.searchAuto();
        }
    };

    hasValue(field) {
        return field !== null && field !== undefined && field !== "";
    };

    searchData = (parameters) => {
        let data = "";
        if (sessionStorage.getItem('parameters') === null && parameters === undefined) {
            let pageNumber = 1;
            if (this.hasValue(this.state.currentPage)) {
                pageNumber = this.state.currentPage
            }
            data = {
                "pagination": {
                    "maxResult": this.state.pageSize,
                    "pageNumber": pageNumber
                },
                "shouldReturnCount": true
            };
        } else if (sessionStorage.getItem('parameters') === null && parameters !== undefined) {
            let status = null;
            let pageNumber = 1;
            if (parameters.name !== "" && parameters.name !== undefined) {
                status = {
                    name: parameters.name
                }
            }
            if (this.hasValue(this.state.currentPage)) {
                pageNumber = this.state.currentPage
            }
            data = {
                "identifier": parameters.identifier,
                "content": parameters.content,
                "favourite": parameters.favourite,
                "pagination": {
                    "maxResult": this.state.pageSize,
                    "pageNumber": pageNumber
                },
                "status": status,
                "shouldReturnCount": true
            };
            sessionStorage.parameters = JSON.stringify(parameters);
        } else if (sessionStorage.getItem('parameters') !== null && parameters === undefined) {
            let parameter = JSON.parse(sessionStorage.parameters);
            let status = null;
            let pageNumber = 1;
            if (parameter.name !== "" && parameter.name !== undefined) {
                status = {
                    name: parameter.name
                }
            }
            if (this.hasValue(this.state.currentPage)) {
                pageNumber = this.state.currentPage
            }
            data = {
                "identifier": parameter.identifier,
                "content": parameter.content,
                "favourite": parameter.favourite,
                "pagination": {
                    "maxResult": this.state.pageSize,
                    "pageNumber": pageNumber
                },
                "status": status,
                "shouldReturnCount": true
            };
        } else if (sessionStorage.getItem('parameters') !== null && parameters !== undefined) {
            let status = null;
            let pageNumber = 1;
            if (parameters.name !== "" && parameters.name !== undefined) {
                status = {
                    name: parameters.name
                }
            }
            if (this.hasValue(this.state.currentPage)) {
                pageNumber = this.state.currentPage
            }
            data = {
                "identifier": parameters.identifier,
                "content": parameters.content,
                "favourite": parameters.favourite,
                "pagination": {
                    "maxResult": this.state.pageSize,
                    "pageNumber": pageNumber
                },
                "status": status,
                "shouldReturnCount": true
            };
            sessionStorage.parameters = JSON.stringify(parameters);
        }
        return data;
    };

    searchDataAuto = () => {
        let data = "";
        if (sessionStorage.getItem('parameters') === null) {
            let pageNumber = 1;
            if (this.hasValue(this.state.currentPage)) {
                pageNumber = this.state.currentPage
            }
            data = {
                "pagination": {
                    "maxResult": this.state.pageSize,
                    "pageNumber": pageNumber
                },
                "shouldReturnCount": true
            };
        } else if (sessionStorage.getItem('parameters') !== null) {
            let parameter = JSON.parse(sessionStorage.parameters);
            let status = null;
            let pageNumber = 1;
            if (parameter.name !== "" && parameter.name !== undefined) {
                status = {
                    name: parameter.name
                }
            }
            if (this.hasValue(this.state.currentPage)) {
                pageNumber = this.state.currentPage
            }
            data = {
                "identifier": parameter.identifier,
                "content": parameter.content,
                "favourite": parameter.favourite,
                "pagination": {
                    "maxResult": this.state.pageSize,
                    "pageNumber": pageNumber
                },
                "status": status,
                "shouldReturnCount": true
            };
        }
        return data;
    };

    makeDataForTable = (dataInfo) => {
        let postStatus = "";
        let postFavourite = "";
        switch (dataInfo.status.name) {
            case "REGISTERED_POST_STATUS":
                postStatus = <label className="text-warning">{this.props.language.registered}</label>;
                break;
            case "SENT_POST_STATUS":
                postStatus = <label className="text-success">{this.props.language.posted}</label>;
                break;
            case "DELETED_POST_STATUS":
                postStatus = <label className="text-primary">{this.props.language.removed}</label>;
                break;
            case "SOLD_POST_STATUS":
                postStatus = <label className="text-danger">{this.props.language.sold}</label>;
                break;
            default:
        }
        switch (dataInfo.favourite) {
            case true:
                postFavourite = <label className="text-success">{this.props.language.favourite}</label>;
                break;
            case false:
                postFavourite = <label className="text-danger">{this.props.language.normal}</label>;
                break;
            default:
        }
        return {postStatus, postFavourite};
    };

    search = async (parameters) => {
        this.setState({
            currentPage: 1
        }, async () => {
            this.setState({progress: true});
            const data = this.searchData(parameters);
            try {
                const result = await searchAcount(data);
                let searchResultList = [];
                if (result.status === 200) {
                    this.setState({count: result.data.data.count});
                    result.data.data.searchResultArray.forEach((dataInfo) => {
                        const dataForTable = this.makeDataForTable(dataInfo);
                        searchResultList.push(
                            {
                                originalContent: dataInfo.originalContent,
                                identifier: dataInfo.identifier,
                                publishHistory: dataInfo.publishHistory,
                                content: dataInfo.content,
                                attributes: dataInfo.attributes,
                                favourite: dataInfo.favourite,
                                amount: dataInfo.amount,
                                creationDateTime: dataInfo.creationDateTime,
                                lastUpdateDateTime: dataInfo.lastUpdateDateTime,
                                status: dataInfo.status.name,
                                postStatus: dataForTable.postStatus,
                                postFavourite: dataForTable.postFavourite,
                            }
                        )
                    });


                    this.setState({searchResultList, progress: false});
                }
            } catch (ex) {
                if (ex.response && ex.response.status === 400) {
                    toast.error(this.props.language.svConError);
                    this.setState({progress: false});
                }
            }
        });

    };

    searchAuto = async () => {
        this.setState({progress: true});
        const data = this.searchDataAuto();
        try {
            const result = await searchAcount(data);
            if (this.state.currentPage === 1 && result.data.data.searchResultArray.length === 0) {
                const parameters = {
                    content: "",
                    favourite: "",
                    identifier: "",
                    name: "",
                };
                this.search(parameters)
            } else if (result.data.data.searchResultArray.length === 0) {
                this.setState({
                    currentPage: 1
                }, () => {
                    this.searchAuto();
                })
            } else if (result.data.data.searchResultArray.length !== 0) {
                let searchResultList = [];
                if (result.status === 200) {
                    this.setState({count: result.data.data.count});
                    result.data.data.searchResultArray.forEach((dataInfo) => {
                        const dataForTable = this.makeDataForTable(dataInfo);
                        searchResultList.push(
                            {
                                originalContent: dataInfo.originalContent,
                                identifier: dataInfo.identifier,
                                publishHistory: dataInfo.publishHistory,
                                content: dataInfo.content,
                                attributes: dataInfo.attributes,
                                favourite: dataInfo.favourite,
                                amount: dataInfo.amount,
                                creationDateTime: dataInfo.creationDateTime,
                                lastUpdateDateTime: dataInfo.lastUpdateDateTime,
                                status: dataInfo.status.name,
                                postStatus: dataForTable.postStatus,
                                postFavourite: dataForTable.postFavourite,
                            }
                        )
                    });


                    this.setState({searchResultList, progress: false});
                }
            }

        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(this.props.language.svConError);
                this.setState({progress: false});
            }
        }
    };

    getSearchCriteriaArray() {
        return [
            {
                name: "identifier",
                element: "input",
                type: "text",
                placeholder: "---",
                label: this.props.language.code
                ,
                defaultValue: ""
            }, {
                name: "content",
                element: "input",
                type: "text",
                placeholder: "---",
                label: this.props.language.content,
                defaultValue: ""
            },
            {
                name: "name",
                element: "select",
                placeholder: "---",
                defaultValue: "",
                label: this.props.language.status,
                options: [
                    {
                        value: "",
                        title: this.props.language.choose
                    },
                    {
                        value: "SENT_POST_STATUS",
                        title: this.props.language.posted
                    },
                    {
                        value: "SOLD_POST_STATUS",
                        title: this.props.language.sold
                    },
                    {
                        value: "REGISTERED_POST_STATUS",
                        title: this.props.language.registered
                    },
                    {
                        value: "DELETED_POST_STATUS",
                        title: this.props.language.removed
                    },
                ]
            },
            {
                name: "favourite",
                element: "select",
                placeholder: "---",
                defaultValue: "",
                label: this.props.language.type,
                options: [
                    {
                        value: "",
                        title: this.props.language.choose
                    },
                    {
                        value: "true",
                        title: this.props.language.favourite
                    },
                    {
                        value: "false",
                        title: this.props.language.normal
                    },
                ]
            }
        ];
    };


    getResultTableHeader() {
        let headerInfo = {
            dropdowns: [
                {
                    style: 'btn btn-dark btn-xs',
                    title: this.props.language.more,
                    icon: "fa fa-ellipsis-v",
                    id: "1",
                    item: [
                        {
                            itemTitle: this.props.language.silentPosting,
                            onclick: this.onActiveInfoSilent,
                            icon: 'fa fa-bell-slash text-success',

                        }, {
                            itemTitle: this.props.language.edit,
                            onclick: this.onEdit,
                            icon: 'fa fa-edit text-primary',

                        }, {
                            itemTitle: this.props.language.removeFromChannel,
                            icon: 'fa fa-remove text-info',
                            onclick: this.onRemoveInfo
                        },
                        {
                            itemTitle: this.props.language.delete,
                            icon: 'fa fa-trash text-danger',
                            onclick: this.onDeleteInfo
                        },
                    ]
                }
            ],
            actions: [
                {
                    name: 'post',
                    title: this.props.language.post,
                    icon: 'fa fa-sign-in text-dark',
                    style: 'btn btn-success btn-xs',
                    onclick: this.onActiveInfo
                }, {
                    name: 'show',
                    title: this.props.language.show,
                    icon: 'fa fa-eye',
                    style: 'btn btn-warning btn-xs',
                    onclick: this.onShow
                },
                {
                    name: 'remove',
                    title: this.props.language.sold,
                    icon: 'fa fa-download text-dark',
                    style: 'btn btn-danger btn-xs',
                    onclick: this.onDeActiveInfo
                },
                {
                    name: 'history',
                    title: this.props.language.history,
                    icon: 'fa fa-book text-dark',
                    style: 'btn btn-primary btn-xs',
                    onclick: this.onShowHistory
                },
            ],
            headerTitleInfos: [
                {name: "identifier", title: this.props.language.code},
                {name: "creationDateTime", title: this.props.language.creationDate},
                {name: "lastUpdateDateTime", title: this.props.language.lastUpdateDate},
                {name: "postFavourite", title: this.props.language.type},
                {name: "postStatus", title: this.props.language.status},
            ]
        };
        return headerInfo;
    };

    render() {
        const {searchResultList, pageSize, currentPage} = this.state;
        const searchCriteriaArray = this.getSearchCriteriaArray();
        const headerInfo = this.getResultTableHeader();

        return (
            <div
                className={this.props.theme === "day" ? "border-light-color shadow row w-100 m-0 text-center justify-content-center align-items-center my-3 body-color-light" : "border-dark-color shadow row w-100 m-0 text-center justify-content-center align-items-center my-3 body-color"}>
                <div
                    className={this.props.theme === "day" ? "col-12 justify-content-center align-items-center text-center header-box text-light header-color-light" : "col-12 justify-content-center align-items-center text-center header-box text-light header-color"}>
                    <h4 className="py-2">{this.props.language.manageChannel}</h4>
                </div>
                <SearchCriteria
                    language={this.props.language}
                    theme={this.props.theme}
                    onSearch={this.search}
                    searchCriteriaArray={searchCriteriaArray}/>
                <SearchResult
                    language={this.props.language}
                    headerInfo={headerInfo} searchResultList={searchResultList} pageSize={pageSize}
                    currentPage={currentPage}
                    setPage={this.setPage}
                    theme={this.props.theme}
                    count={this.state.count}
                />
                <span className="col-8 pt-4 pb-2">
                    <input type="button" className="btn btn-success col-md-2 col-sm-6 mr-3 my-1"
                           value={this.props.language.addPost}
                           onClick={this.onAdd}/>
                </span>
                {this.state.progress ?
                    <Loading
                        language={this.props.language}
                    />
                    : null
                }


            </div>
        );
    };
}

export default withRouter(PostManagement);
