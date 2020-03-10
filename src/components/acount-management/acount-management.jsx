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
    onRemove
} from "../../services/acountService"


class acountManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageSize: 5,
            searchResultList: [],
            progress: false,
        };
        this.onEdit = this.onEdit.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onShow = this.onShow.bind(this);
        this.search = this.search.bind(this);
    }

    componentDidMount() {
        this.search();
    }

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
        let data = {
            active: "true",
            content: "",
            identifier: "",
        };
        if (parameters !== undefined) {
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
        try {
            const result = await searchAcount(data);
            let searchResultList = [];
            if (result.status === 200) {
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
                    icon: 'fa fa-trash-o',
                    style: 'btn btn-danger btn-xs',
                    onclick: this.onDeActiveInfo
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
        const {searchResultList, pageSize} = this.state;
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
                <SearchResult headerInfo={headerInfo} searchResultList={searchResultList} pageSize={pageSize}/>
                <span className="pt-4 pb-3">
                    <input type="button" className="btn btn-success  mr-3" value="پست کردن تمامی اکانت ها"
                           onClick={this.postAllAcountInfo}/>
                    <input type="button" className="btn btn-warning  m-3" value="اضافه کردن اکانت"
                           onClick={this.onAdd}/>
                    <input type="button" className="btn btn-danger  ml-3" value=" حذف تمامی پست ها از کانال"
                           onClick={this.removeAllAcountInfo}/>
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
