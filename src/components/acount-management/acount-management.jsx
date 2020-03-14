import React, {Component} from 'react';
import SearchCriteria from "../search/search-criteria";
import SearchResult from "../search/search-result";
import {toast} from 'react-toastify';
import {withRouter} from 'react-router-dom';
import {
    searchAcount,
    postAllAcount,
    removeAllAcount,
    onDeActive,
    onActive,
    onRemove,
    onDelete,
    fetchSchedule,
    updateSchedule,
} from "../../services/acountService"


class acountManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageSize: 10,
            searchResultList: [],
            progress: false,
            bot: "",
            currentPage: sessionStorage.getItem('currentPage'),
        };
        this.onEdit = this.onEdit.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onShow = this.onShow.bind(this);
        this.search = this.search.bind(this);
    }

    async componentDidMount() {
        try {
            const result = await fetchSchedule({"task": "auto-posting-accounts"});
            if (result.status === 200) {
                console.log(result.data.data.active);
                this.setState({progress: false, bot: result.data.data.active});
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('ارتباط با سرور برقرار نشد');
                this.setState({progress: false});
            }
        }
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
        if (searchResult.active) {
            this.setState({progress: true});
            try {
                const result = await onDeActive({identifier: parseInt(searchResult.identifier)});
                if (result.status === 200) {
                    toast.success('اکانت با موفقیت به لیست فروخته شده اضافه شد');
                    this.setState({progress: false});
                }
            } catch (ex) {
                if (ex.response && ex.response.status === 400) {
                    toast.error('ارتباط با سرور برقرار نشد');
                    this.setState({progress: false});
                }
            }
            this.search();
        } else {
            toast.error('این اکانت فروخته شده و قابلیت فروش ندارد');
        }
    };

    setPage = page => {
        this.setState({currentPage: page});
    };

    updateScheduleInfo = async () => {
        if (!this.state.bot) {
            this.setState({progress: true});
            try {
                const result = await updateSchedule({"task": "auto-posting-accounts", "active": true});
                if (result.status === 200) {
                    toast.success('بات با موفقیت روشن شد');
                    this.setState({progress: false, bot: true});
                }
            } catch (ex) {
                if (ex.response && ex.response.status === 400) {
                    toast.error('ارتباط با سرور برقرار نشد');
                    this.setState({progress: false});
                }
            }
        } else {
            this.setState({progress: true});
            try {
                const result = await updateSchedule({"task": "auto-posting-accounts", "active": false});
                if (result.status === 200) {
                    toast.success('بات با موفقیت خاموش شد');
                    this.setState({progress: false, bot: false});
                }
            } catch (ex) {
                if (ex.response && ex.response.status === 400) {
                    toast.error('ارتباط با سرور برقرار نشد');
                    this.setState({progress: false});
                }
            }
        }
    };

    onDeleteInfo = async (searchResult) => {
        if (searchResult.telegram === 0) {
            if (!searchResult.active) {
                this.setState({progress: true});
                try {
                    const result = await onDelete({identifier: parseInt(searchResult.identifier)});
                    if (result.status === 200) {
                        toast.success('اکانت با موفقیت حذف شد');
                        this.setState({progress: false});
                    }
                } catch (ex) {
                    if (ex.response && ex.response.status === 400) {
                        toast.error('ارتباط با سرور برقرار نشد');
                        this.setState({progress: false});
                    }
                }
                this.search();
            } else {
                toast.error('این اکانت فروخته نشده است و قابلیت حذف ندارد');
            }
        } else {
            toast.error('پست داخل کانال این اکانت حذف کنید');
        }
    };

    onActiveInfo = async (searchResult) => {
        if (searchResult.active) {
            this.setState({progress: true});
            try {
                const result = await onActive({identifier: parseInt(searchResult.identifier)});
                if (result.status === 200) {
                    toast.success('اکانت با موفقیت پست شد');
                    this.setState({progress: false});
                }
            } catch (ex) {
                if (ex.response && ex.response.status === 400) {
                    toast.error('ارتباط با سرور برقرار نشد');
                    this.setState({progress: false});
                }
            }
            this.search();
        } else {
            toast.error('این اکانت فروخته شده و قابلیت پست ندارد');
        }

    };

    onRemoveInfo = async (searchResult) => {
        if (searchResult.active) {
            this.setState({progress: true});
            try {
                const result = await onRemove({identifier: parseInt(searchResult.identifier)});
                if (result.status === 200) {
                    toast.success('اکانت با موفقیت از کانال حذف شد');
                    this.setState({progress: false});
                }
            } catch (ex) {
                if (ex.response && ex.response.status === 400) {
                    toast.error('ارتباط با سرور برقرار نشد');
                    this.setState({progress: false});
                }
            }
            this.search();
        } else {
            toast.error('این اکانت فروخته شده و قابلیت حذف از کانال ندارد');
        }
    };

    postAllAcountInfo = async () => {
        this.setState({progress: true});
        try {
            const result = await postAllAcount();
            if (result.status === 200) {
                toast.success('اکانت ها با موفقیت پست شدند');
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

    removeAllAcountInfo = async () => {
        this.setState({progress: true});
        try {
            const result = await removeAllAcount();
            if (result.status === 200) {
                toast.success('اکانت ها با موفقیت غیرفعال شدند');
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

    search = async (parameters) => {
        this.setState({progress: true});
        if (sessionStorage.getItem('activeSearch') === "") {
            sessionStorage.setItem('activeSearch', "true");
        }
        console.log(sessionStorage.getItem('activeSearch'),1234);
        let data = {
            active: sessionStorage.getItem('activeSearch'),
            content: sessionStorage.getItem('contentSearch'),
            identifier: parseInt(sessionStorage.getItem('idSearch')),
        };
        if (parameters !== undefined) {
            sessionStorage.setItem('contentSearch', parameters.content);
            sessionStorage.setItem('idSearch', parameters.identifier);
            sessionStorage.setItem('activeSearch', parameters.active);
            if (parameters.active !== "") {
                data = {
                    active: parameters.active,
                    content: parameters.content,
                    identifier: parseInt(parameters.identifier),
                };
            }
            else {
                data = {
                    active: "true",
                    content: parameters.content,
                    identifier: parseInt(parameters.identifier),
                };
            }
        }
        console.log(data)
        try {
            const result = await searchAcount(data);
            let searchResultList = [];
            if (result.status === 200) {
                console.log(123)
                result.data.data.forEach((dataInfo) => {
                    let activeText = null;
                    let activePost = null;
                    if (dataInfo.active) {
                        activeText = (<span className="text-success">موجود</span>)
                    }
                    else {
                        activeText = (<span className="text-danger">فروخته شده</span>)
                    }
                    if (dataInfo.telegramIdentifiers.length !== 0) {
                        activePost = (<span className="text-success">پست شده</span>)
                    } else {
                        activePost = (<span className="text-danger">پست نشده</span>)
                    }
                    searchResultList.push(
                        {
                            username: dataInfo.username,
                            password: dataInfo.password,
                            content: dataInfo.content,
                            identifier: dataInfo.identifier,
                            active: dataInfo.active,
                            activeText: activeText,
                            activePost: activePost,
                            telegram: dataInfo.telegramIdentifiers.length,
                        }
                    )
                });
                this.setState({searchResultList});
                this.setState({progress: false});
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('لطفا کلیه موارد را پر کنید');
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
                label: "کد اکانت",
                defaultValue: ""
            }, {
                name: "content",
                element: "input",
                type: "text",
                placeholder: "---",
                label: "اسم بازی",
                defaultValue: ""
            },
            {
                name: "active",
                element: "select",
                placeholder: "---",
                defaultValue: "",
                label: "وضعیت فروش",
                selected: "true",
                options: [
                    {
                        value: "true",
                        title: "موجود"
                    },
                    {
                        value: "false",
                        title: "فروخته شده"
                    },
                ]
            }
        ];
    }

    getResultTableHeader() {
        let headerInfo = {
            showCheckBox: false,
            actions: [
                {
                    name: 'post',
                    title: 'پست کردن',
                    icon: 'fa fa-sign-in',
                    style: 'btn btn-success btn-xs',
                    onclick: this.onActiveInfo
                }, {
                    name: 'show',
                    title: 'مشاهده',
                    icon: 'fa fa-eye',
                    style: 'btn btn-warning btn-xs',
                    onclick: this.onShow
                }, {
                    name: 'edit',
                    title: 'ویرایش',
                    icon: 'fa fa-edit',
                    style: 'btn btn-primary btn-xs',
                    onclick: this.onEdit
                }, {
                    name: 'deActive',
                    title: 'حذف از کانال',
                    icon: 'fa fa-remove',
                    style: 'btn btn-info btn-xs',
                    onclick: this.onRemoveInfo
                }, {
                    name: 'remove',
                    title: 'فروخته شده',
                    icon: 'fa fa-download',
                    style: 'btn btn-color btn-xs',
                    onclick: this.onDeActiveInfo
                }, {
                    name: 'delete',
                    title: 'حذف کامل',
                    icon: 'fa fa-trash-o',
                    style: 'btn btn-danger btn-xs',
                    onclick: this.onDeleteInfo
                },
            ],
            headerTitleInfos: [
                {name: "identifier", title: "کد اکانت"},
                {name: "username", title: "ایمیل اکانت"},
                {name: "password", title: "رمز اکانت"},
                {name: "activeText", title: "وضعیت فروش"},
                {name: "activePost", title: "وضعیت پست"},
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
                    <h4 className="py-2">مدیریت اکانت</h4>
                </div>
                <SearchCriteria onSearch={this.search}
                                searchCriteriaArray={searchCriteriaArray}/>
                <SearchResult headerInfo={headerInfo} searchResultList={searchResultList} pageSize={pageSize}
                              currentPage={currentPage}
                              setPage={this.setPage}
                />
                <span className="col-12 pt-4 pb-2">
                    <input type="button" className="btn btn-success col-md-2 col-sm-6 mr-3 my-1"
                           value="پست کردن تمامی اکانت ها"
                           onClick={this.postAllAcountInfo}/>
                    <input type="button" className="btn btn-warning col-md-2 col-sm-6 mr-3 my-1"
                           value="اضافه کردن اکانت"
                           onClick={this.onAdd}/>
                    <input type="button" className="btn btn-danger col-md-2 col-sm-6 mr-3 my-1"
                           value=" حذف تمامی پست ها از کانال"
                           onClick={this.removeAllAcountInfo}/>
                    {this.state.bot ?
                        <input type="button" className="btn btn-primary col-md-2 col-sm-6 my-1" value="خاموش کردن bot"
                               onClick={this.updateScheduleInfo}/>
                        :
                        <input type="button" className="btn btn-color text-white col-md-2 col-sm-6 my-1"
                               value="روشن کردن bot"
                               onClick={this.updateScheduleInfo}/>
                    }
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

                <div id="circle">
                    <div class="loader">
                        <div class="loader">
                            <div class="loader">
                                <div class="loader">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(acountManagement);
