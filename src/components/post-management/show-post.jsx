import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import {toast} from 'react-toastify';
import Loading from "../loading/loading";
import {onDeActive} from "../../services/acountService";


class ShowPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            content: "",
            boldText: "",
            progress: "",
            price: "",
            favoriteType: "",
            inputList: [],
            attributes: [],
            result: "",
            favourite: "",
            id: ""
        };
    };

    componentDidMount() {
        const {accountInfo} = this.props.location;
        if (!accountInfo) return window.history.back();
        this.setState({
            result: accountInfo
        });
        let attributes = [];
        let favoriteType;
        if (this.getValue(accountInfo.favourite)) {
            favoriteType = this.props.language.favourite
        } else {
            favoriteType = this.props.language.normal
        }
        this.getValue(accountInfo.attributes).forEach((attribute) => {
            attributes.push(
                {
                    "id": attributes.length + 1,
                    "title": attribute.title,
                    "value": attribute.value
                }
            )
        });

        this.setState({
            attributes,
            content: this.getValue(accountInfo.originalContent),
            favoriteType: favoriteType,
            price: this.getValue(accountInfo.amount),
            id: this.getValue(accountInfo.identifier),
        });
    }

    hasValue(field) {
        return field !== null && field !== undefined && field !== "";
    };

    getValue(field) {
        if (this.hasValue(field)) {
            return field;
        } else {
            return "";
        }
    };

    cancel = () => {
        window.history.back();
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
            this.cancel();
        } else {
            toast.error(this.props.language.delSoldError);
        }

    };


    render() {
        let dir = null;
        if (this.props.language.rtl) {
            dir = "rtl"
        } else {
            dir = "ltr"
        }
        return (
            <div
                className={this.props.theme === "day" ? "border-light-color row w-100 m-0 my-3 body-color-light" : "border-dark-color row w-100 m-0 my-3 body-color"}>
                <div
                    className={this.props.theme === "day" ? "col-12 justify-content-center align-items-center text-center header-box  text-light header-color-light" : "col-12 justify-content-center align-items-center text-center header-box  text-light header-color"}>
                    <h4 className="py-2 ">{this.props.language.displayPost}</h4>
                </div>
                <div className={this.props.theme === "day" ? "col-12 body-color-light" : "col-12 body-color"}>
                    <div
                        className={this.props.theme === "day" ? dir + " m-0  row w-100  body-color-light-d box-shadow my-4 dark-shadow radius-line" : dir + " m-0  row w-100  body-color box-shadow my-4 white-shadow radius-line"}>
                        <div className="col-12 form-group">
                            <div className="m-0 row w-100 my-1 pb-3">
                                <div className="form-group col-lg-2 col-md-3 col-sm-12  float-right pt-3 ml-2">
                                    <label
                                        className={this.props.theme === "day" ? "text-dark" : "text-white"}>{this.props.language.type} :</label>
                                    <input className="form-control text-center w-100 p-radius"
                                           type={"input"}
                                           value={this.state.favoriteType}
                                    />
                                </div>
                                <div className="form-group  col-lg-2 col-md-3 col-sm-12 float-right pt-3 ml-2">
                                    <label
                                        className={this.props.theme === "day" ? "text-dark" : "text-white"}>{this.props.language.price} :</label>
                                    <input className="form-control text-center w-100 p-radius"
                                           type={"input"}
                                           value={this.state.price}
                                    />
                                </div>
                                <div className="form-group  col-lg-2 col-md-3 col-sm-12 col-md-2 float-right pt-3 ml-2">
                                    <label
                                        className={this.props.theme === "day" ? "text-dark" : "text-white"}>{this.props.language.code} :</label>
                                    <input className="form-control text-center w-100 p-radius"
                                           type={"input"}
                                           value={this.state.id}
                                    />
                                </div>
                                {
                                    sessionStorage.getItem('username') === "sinashamsi" || "pouyashamsi" || "mahdimohamadi" ?
                                        <div className="form-group col-md-6 float-right pt-4 row"
                                             style={{
                                                 marginTop: "23px"
                                             }}>
                                            <div className="col-lg-2 col-md-3 col-sm-2 w-25 mx-2">
                                                <input type="button" className="btn btn-danger mr-4 " value="email"
                                                       onClick={() => navigator.clipboard.writeText("https://id.sonyentertainmentnetwork.com/id/tv/signin/?ui=ds&hidePageElements=noAccountSection%2CtroubleSigningInLink&service_logo=ps&smcid=tv%3Apsvue#/signin")}
                                                />
                                            </div>

                                            <div className="col-lg-2 col-md-3 col-sm-2 w-25 mx-2">
                                                <input type="button" className="btn btn-success mr-4 " value="login"
                                                       onClick={() => navigator.clipboard.writeText("https://account.sonyentertainmentnetwork.com/liquid/cam/devices/device-list.action?category=psn&displayNavigation=false")}
                                                />
                                            </div>

                                            <div className="col-lg-3 col-md-4 col-sm-1 w-25 mx-2">
                                                <input type="button" className="btn btn-primary mr-4 "
                                                       value="playstation"
                                                       onClick={() => navigator.clipboard.writeText("http://my.playstation.com/")}
                                                />
                                            </div>
                                        </div>
                                        : null
                                }
                            </div>
                        </div>
                        <div className="form-group col-12">
                            <div className="m-0 row w-100 my-1 pb-3 ml-2">
                                {this.state.attributes.map(
                                    (attribute) => (
                                        <div className="form-group col-12 col-sm-6 col-md-3 float-right ">
                                            <label
                                                className={this.props.theme === "day" ? "text-dark" : "text-white"}>{attribute.title} :</label>
                                            <input className="form-control text-center w-100 p-radius"
                                                   type={"input"}
                                                   value={attribute.value}
                                            />
                                        </div>
                                    ))}

                                {sessionStorage.getItem('username') === "sinashamsi" || "pouyashamsi" || "mahdimohamadi" ?
                                    <div className="form-group col-12 col-sm-6 col-md-3 float-right "
                                         style={{marginTop: "32px"}}>

                                        {this.state.attributes.length !== 0 ?
                                            this.state.attributes[1] ?
                                                <input type="button" className="btn btn-warning"
                                                       style={{height: "95%"}}
                                                       value="copy"
                                                       onClick={() => navigator.clipboard.writeText(this.state.attributes[0].value + ":" + this.state.attributes[1].value)}

                                                />
                                                :
                                                <input type="button" className="btn btn-warning"
                                                       style={{height: "95%"}}
                                                       value="copy"
                                                       onClick={() => navigator.clipboard.writeText(this.state.attributes[0].value)}

                                                />
                                            : null}
                                    </div>
                                    : null}

                            </div>

                        </div>
                        <div className="form-group col-12 ">
                            <div className="form-group col-12 ">
                                <label
                                    className={this.props.theme === "day" ? "text-dark" : "text-white"}>{this.props.language.content} :</label>
                                <SunEditor
                                    setContents={this.state.content}
                                    setOptions={{
                                        buttonList: [
                                            ['undo', 'redo'],
                                            ['link'],
                                            ['formatBlock'],
                                            ['bold', 'underline', 'italic', 'strike'],
                                            ['removeFormat'],
                                        ]
                                    }}
                                    disable={true}
                                    enableToolbar={false}
                                    setDefaultStyle="direction: ltr !important; min-height: 200px;"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 p-3 text-center">
                        <input type="button" className="btn btn-warning mr-3" value={this.props.language.sold}
                               onClick={() => {
                                   this.onDeActiveInfo(this.state.result)
                               }}/>
                        <input type="button" className="btn btn-danger mr-3" value={this.props.language.back}
                               onClick={() => {
                                   this.cancel()
                               }}/>
                    </div>
                </div>
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

export default withRouter(ShowPost);


