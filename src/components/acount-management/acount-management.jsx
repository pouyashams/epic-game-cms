import React, {Component} from 'react';
import SearchCriteria from "../search/search-criteria";
import SearchResult from "../search/search-result";
import {toast} from 'react-toastify';
import {withRouter} from 'react-router-dom';
import {
    onActive,
    onDeActive,
    onDelete,
    onRemove,
    searchAcount,
} from "../../services/acountService"


class acountManagement extends Component {

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
    }

    async componentDidMount() {
        this.search();
    };

    onAdd() {
        this.props.history.push({
            pathname: '/add-acount',
        });
    }

    onShow(searchResult) {
        this.props.history.push({
            pathname: '/show-acount',
            acountInfo: searchResult
        });
    }

    onEdit(searchResult) {
        this.props.history.push({
            pathname: '/edit-acount',
            acountInfo: searchResult
        });
    }

    onDeActiveInfo = async (searchResult) => {
        if (searchResult.status!=="DELETED_POST_STATUS"){
            this.setState({progress: true});
            try {
                const result = await onDeActive({identifier: parseInt(searchResult.identifier)});
                if (result.status === 200) {
                    toast.success('پست با موفقیت به لیست فروخته شده اضافه شد');
                    this.setState({progress: false});
                }
            } catch (ex) {
                if (ex.response && ex.response.status === 400) {
                    toast.error('ارتباط با سرور برقرار نشد');
                    this.setState({progress: false});
                }
            }
            this.search();
        }else{
            toast.error('پست حذف شده قابل فروش نیست');
        }

    };

    setPage = page => {
        this.setState({
            currentPage: page
        }, () => {
            this.search();
        })
    };

    onDeleteInfo = async (searchResult) => {
        this.setState({progress: true});
        try {
            const result = await onDelete({identifier: parseInt(searchResult.identifier)});
            if (result.status === 200) {
                toast.success('پست با موفقیت حذف شد');
                this.setState({progress: false});
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('ارتباط با سرور برقرار نشد');
                this.setState({progress: false});
            }
        }
        this.search();
    };

    onActiveInfo = async (searchResult) => {
        switch (searchResult.status) {
            case "DELETED_POST_STATUS":
                toast.error('پست حذف شده قابل پست کردن نمی باشد');
                break;
            case "SOLD_POST_STATUS":
                toast.error('پست فروخته شده قابل پست کردن نمی باشد');
                break;
            default:
                this.setState({progress: true});
                try {
                    const result = await onActive({identifier: parseInt(searchResult.identifier), silent: false});
                    if (result.status === 200) {
                        toast.success('پست با موفقیت پست شد');
                        this.setState({progress: false});
                    }
                } catch (ex) {
                    if (ex.response && ex.response.status === 400) {
                        toast.error('ارتباط با سرور برقرار نشد');
                        this.setState({progress: false});
                    }
                }
                this.search();
        }
    };

    onActiveInfoSilent = async (searchResult) => {
        switch (searchResult.status) {
            case "DELETED_POST_STATUS":
                toast.error('پست حذف شده قابل پست کردن نمی باشد');
                break;
            case "SOLD_POST_STATUS":
                toast.error('پست فروخته شده قابل پست کردن نمی باشد');
                break;
            default:
                this.setState({progress: true});
                try {
                    const result = await onActive({identifier: parseInt(searchResult.identifier), silent: true});
                    if (result.status === 200) {
                        toast.success('پست با موفقیت پست شد');
                        this.setState({progress: false});
                    }
                } catch (ex) {
                    if (ex.response && ex.response.status === 400) {
                        toast.error('ارتباط با سرور برقرار نشد');
                        this.setState({progress: false});
                    }
                }
                this.search();
        }

    };

    onRemoveInfo = async (searchResult) => {
        this.setState({progress: true});
        try {
            const result = await onRemove({identifier: parseInt(searchResult.identifier)});
            if (result.status === 200) {
                toast.success('پست با موفقیت از کانال حذف شد');
                this.setState({progress: false});
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('ارتباط با سرور برقرار نشد');
                this.setState({progress: false});
            }
        }
        this.search();
    };

    searchData = (parameters) => {
        let data = "";
        if (sessionStorage.getItem('parameters') === null && parameters === undefined) {
            data = {
                "pagination": {
                    "maxResult": this.state.pageSize,
                    "pageNumber": this.state.currentPage
                },
                "shouldReturnCount": true
            };
        } else if (sessionStorage.getItem('parameters') === null && parameters !== undefined) {
            let status = null;
            if (parameters.name !== "" && parameters.name !== undefined) {
                status = {
                    name: parameters.name
                }
            }
            data = {
                "identifier": parameters.identifier,
                "content": parameters.content,
                "favourite": parameters.favourite,
                "pagination": {
                    "maxResult": this.state.pageSize,
                    "pageNumber": this.state.currentPage
                },
                "status": status,
                "shouldReturnCount": true
            };
            sessionStorage.parameters = JSON.stringify(parameters);
        } else if (sessionStorage.getItem('parameters') !== null && parameters === undefined) {
            let parameter = JSON.parse(sessionStorage.parameters);
            let status = null;
            if (parameter.name !== "" && parameter.name !== undefined) {
                status = {
                    name: parameter.name
                }
            }
            data = {
                "identifier": parameter.identifier,
                "content": parameter.content,
                "favourite": parameter.favourite,
                "pagination": {
                    "maxResult": this.state.pageSize,
                    "pageNumber": this.state.currentPage
                },
                "status": status,
                "shouldReturnCount": true
            };
        } else if (sessionStorage.getItem('parameters') !== null && parameters !== undefined) {
            let status = null;
            if (parameters.name !== "" && parameters.name !== undefined) {
                status = {
                    name: parameters.name
                }
            }
            data = {
                "identifier": parameters.identifier,
                "content": parameters.content,
                "favourite": parameters.favourite,
                "pagination": {
                    "maxResult": this.state.pageSize,
                    "pageNumber": this.state.currentPage
                },
                "status": status,
                "shouldReturnCount": true
            };
            sessionStorage.parameters = JSON.stringify(parameters);
        }
        return data;
    };

    makeDataForTable = (dataInfo) => {
        let postStatus = "";
        let postFavourite = "";
        switch (dataInfo.status.name) {
            case "REGISTERED_POST_STATUS":
                postStatus = <label className="text-warning">ثبت شده</label>;
                break;
            case "SENT_POST_STATUS":
                postStatus = <label className="text-success">پست شده</label>;
                break;
            case "DELETED_POST_STATUS":
                postStatus = <label className="text-primary">حذف شده</label>;
                break;
            case "SOLD_POST_STATUS":
                postStatus = <label className="text-danger">فروخته شده</label>;
                break;
            default:
        }
        switch (dataInfo.favourite) {
            case true:
                postFavourite = <label className="text-success">
                    برگزیده
                </label>;
                break;
            case false:
                postFavourite = <label className="text-danger">عادی</label>;
                break;
            default:
        }
        return {postStatus, postFavourite};
    };

    search = async (parameters) => {
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
                            identifier: dataInfo.identifier,
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
                toast.error('مشکلی در برقراری با سرور ایجاد شده است');
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
                label: "کد پست",
                defaultValue: ""
            }, {
                name: "content",
                element: "input",
                type: "text",
                placeholder: "---",
                label: "متن پست",
                defaultValue: ""
            },
            {
                name: "name",
                element: "select",
                placeholder: "---",
                defaultValue: "",
                label: "وضعیت پست",
                options: [
                    {
                        value: "",
                        title: "انتخاب کنید"
                    },
                    {
                        value: "SENT_POST_STATUS",
                        title: "پست شده"
                    },
                    {
                        value: "SOLD_POST_STATUS",
                        title: "فروخته شده"
                    },
                    {
                        value: "REGISTERED_POST_STATUS",
                        title: "ثبت شده"
                    },
                    {
                        value: "DELETED_POST_STATUS",
                        title: "حذف شده"
                    },
                ]
            },
            {
                name: "favourite",
                element: "select",
                placeholder: "---",
                defaultValue: "",
                label: "نوع پست",
                options: [
                    {
                        value: "",
                        title: "انتخاب کنید"
                    },
                    {
                        value: "true",
                        title: "برگزیده"
                    },
                    {
                        value: "false",
                        title: "عادی"
                    },
                ]
            }
        ];
    }


    getResultTableHeader() {
        let headerInfo = {
            showCheckBox: false,
            dropdowns: [
                {
                    style: 'btn btn-dark btn-xs',
                    title: 'بیشتر',
                    icon: "fa fa-ellipsis-v",
                    id: "1",
                    item: [
                        {
                            itemTitle: "پست کردن بی صدا",
                            onclick: this.onActiveInfoSilent,
                            icon: 'fa fa-bell-slash text-success',

                        }, {
                            itemTitle: "ویرایش پست",
                            onclick: this.onEdit,
                            icon: 'fa fa-edit text-primary',

                        }, {
                            itemTitle: "حذف از کانال ",
                            icon: 'fa fa-remove text-info',
                            onclick: this.onRemoveInfo
                        },
                        {
                            itemTitle: "حذف پست",
                            icon: 'fa fa-trash text-danger',
                            onclick: this.onDeleteInfo
                        },
                    ]
                }
            ],
            actions: [
                {
                    name: 'post',
                    title: 'پست کردن',
                    icon: 'fa fa-sign-in text-dark',
                    style: 'btn btn-success btn-xs',
                    onclick: this.onActiveInfo
                }, {
                    name: 'show',
                    title: 'مشاهده',
                    icon: 'fa fa-eye',
                    style: 'btn btn-warning btn-xs',
                    onclick: this.onShow
                },
                {
                    name: 'remove',
                    title: 'فروخته شده',
                    icon: 'fa fa-download text-dark',
                    style: 'btn btn-danger btn-xs',
                    onclick: this.onDeActiveInfo
                },
            ],
            headerTitleInfos: [
                {name: "identifier", title: "کد پست"},
                {name: "creationDateTime", title: "تاریخ ایجاد پست"},
                {name: "lastUpdateDateTime", title: "تاریخ اخرین بروزرسانی"},
                {name: "postFavourite", title: "نوع پست"},
                {name: "postStatus", title: "وضعیت پست"},
            ]
        };
        return headerInfo;
    }

    render() {
        const {searchResultList, pageSize, currentPage} = this.state;
        const searchCriteriaArray = this.getSearchCriteriaArray();
        const headerInfo = this.getResultTableHeader();

        return (
            <div
                className="rtl bg border shadow row w-100 m-0 text-center justify-content-center align-items-center my-3 body-color">
                <div
                    className="col-12 justify-content-center align-items-center text-center header-box text-light header-color">
                    <h4 className="py-2">مدیریت کانال</h4>
                </div>
                <SearchCriteria onSearch={this.search}
                                searchCriteriaArray={searchCriteriaArray}/>
                <SearchResult headerInfo={headerInfo} searchResultList={searchResultList} pageSize={pageSize}
                              currentPage={currentPage}
                              setPage={this.setPage}
                              count={this.state.count}
                />
                <span className="col-8 pt-4 pb-2">
                    <input type="button" className="btn btn-success col-md-2 col-sm-6 mr-3 my-1"
                           value="اضافه کردن پست"
                           onClick={this.onAdd}/>
                </span>
                {this.state.progress ?
                    <span className="col-12 py-2">
                      <div className="progress">
    <div className="progress-bar progress-bar-striped progress-bar-animated bg-warning radius-line"
         style={{width: "100%", height: "75%"}}/>
                      </div>
                </span>
                    : null
                }
            </div>
        );
    }
}

export default withRouter(acountManagement);
