import React, {Component} from 'react';
import Loading from "../loading/loading";
import {searchAcount} from "../../services/acountService";
import {toast} from "react-toastify";
import SunEditor from "suneditor-react";


class AdvancedSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: false,
            content: "",
            searchResultList: [],
        };
        this.search = this.search.bind(this);
    };

    fillParameterValue = (value, name) => {
        this.setState({[name]: value});
    };

    search = async () => {
        if (this.state.content !== "") {
            this.setState({progress: true});
            const data = {
                content: this.state.content,
                favourite: "",
                identifier: "",
                status: {
                    name: "SENT_POST_STATUS"
                },
                "pagination": {
                    "maxResult": 200,
                    "pageNumber": 1
                },
                "shouldReturnCount": false
            };
            try {
                const result = await searchAcount(data);
                let searchResultList = [];
                if (result.status === 200) {
                    this.setState({count: result.data.data.count});
                    result.data.data.searchResultArray.forEach((dataInfo) => {
                        searchResultList.push(
                            {
                                identifier: dataInfo.identifier,
                                content: dataInfo.originalContent,
                            }
                        )
                    });
                    console.log(searchResultList)
                    this.setState({searchResultList, progress: false});
                }
            } catch (ex) {
                if (ex.response && ex.response.status === 400) {
                    toast.error('مشکلی در برقراری با سرور ایجاد شده است');
                    this.setState({progress: false});
                }
            }
        } else {
            toast.error('قسمتی از پست را بنویسید.');
        }

    };

    render() {
        return (
            <div
                className="rtl bg border shadow row w-100 m-0 text-center justify-content-center align-items-center my-3 body-color bg-game">
                <div
                    className="col-12 justify-content-center align-items-center text-center header-box text-light header-color">
                    <h4 className="py-2">جستجو پیشرفته</h4>
                </div>

                <div className="col-12 py-3">
                    <div className="d-flex justify-content-center h-100">
                        <div className="searchbar">
                            <span className="search_icon pointer"
                                  onClick={() => {
                                      this.search()
                                  }}
                            ><i className="fa fa-search"/></span>
                            <input className="search_input text-white"
                                   type="text"
                                   placeholder="بخشی از متن پست مورد نظر بنویسید!"
                                   onChange={(e) => this.fillParameterValue(e.target.value, "content")}
                            />
                        </div>
                    </div>
                </div>

                <div className="row col-12">
                    {this.state.searchResultList.map(
                        (result) => (
                            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                                <div className="thumbnail"
                                >
                                    <div
                                        className="col-12 justify-content-center align-items-center text-center header-box text-light header-color">
                                        <h5 className="py-2">{result.identifier}</h5>
                                    </div>

                                    <div className='col-lg-12'>
                                        <SunEditor
                                            setContents={result.content}
                                            setOptions={{
                                                buttonList: []
                                            }}
                                            disable={true}
                                            enableToolbar={false}
                                            setDefaultStyle="direction: ltr !important; min-height: 200px; max-height: 400px!important; min-height: 400px!important;"
                                        /></div>
                                    <span
                                        className='glyphicon glyphicon-exclamation-sign text-danger pull-right icon-style'/>
                                </div>
                            </div>
                        )
                    )

                    }
                </div>


                {this.state.progress ?
                    <Loading/>
                    : null
                }
            </div>
        );
    }
}

export default AdvancedSearch;
