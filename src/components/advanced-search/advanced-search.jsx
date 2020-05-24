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
                    this.setState({searchResultList, progress: false});
                }
            } catch (ex) {
                if (ex.response && ex.response.status === 400) {
                    toast.error(this.props.language.svConError);
                    this.setState({progress: false});
                }
            }
        } else {
            toast.error(this.props.language.partOfThePost);
        }

    };

    render() {
        return (
            <div
                className={this.props.theme === "day" ? "rtl border-light-color shadow row w-100 m-0 text-center justify-content-center align-items-center my-3 body-color-light bg-game" : "rtl border-dark-color shadow row w-100 m-0 text-center justify-content-center align-items-center my-3 body-color bg-game"}>
                <div
                    className={this.props.theme === "day" ? "col-12 justify-content-center align-items-center text-center header-box text-light header-color-light" : "col-12 justify-content-center align-items-center text-center header-box text-light header-color"}>
                    <h4 className="py-2">{this.props.language.advancedSearch}</h4>
                </div>

                <div className="col-12 py-3">
                    <div className="d-flex justify-content-center h-100">
                        <div className={this.props.language.rtl ? "searchbar" : "searchbar ltr"}>
                            <span className="search_icon pointer"
                                  onClick={() => {
                                      this.search()
                                  }}
                            ><i className="fa fa-search"/></span>
                            <input className="search_input text-white"
                                   type="text"
                                   placeholder={this.props.language.writePartOfYourPostContent}
                                   onChange={(e) => this.fillParameterValue(e.target.value, "content")}
                                   onKeyPress={event => {
                                       if (event.key === 'Enter') {
                                           this.search()
                                       }
                                   }}
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
                    <Loading
                        language={this.props.language}
                    />
                    : null
                }
            </div>
        );
    }
}

export default AdvancedSearch;
