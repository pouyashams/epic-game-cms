import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import {toast} from 'react-toastify';
import Loading from "../loading/loading";


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
            dolar: "",
            region: "Region 1",
            favoriteType: "",
            inputList: [],
            attributes: [],
            favourite: "",
            id: ""
        };
    };

    componentDidMount() {
        const {accountInfo} = this.props.location;
        if (!accountInfo) return window.history.back();
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


    copyText = (text) => {
        let copyText = document.getElementById(text);
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
        toast.success('کپی شد');

    };

    render() {
        return (
            <div
                className="rtl border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3 body-color">
                <div
                    className=" col-12 justify-content-center align-items-center text-center header-box  text-light header-color">
                    <h4 className="py-2 ">{this.props.language.displayPost}</h4>
                </div>
                <div className="col-12 justify-content-center align-items-center text-center body-color">
                    <div
                        className="rtl m-0 float-right row w-100 justify-content-start body-color box-shadow my-4 border radius-line">
                        <div className="form-group col-12 justify-content-center">
                            <div className="form-group col-lg-2 col-md-3 col-sm-12  float-right pt-3 ml-2">
                                <label>{this.props.language.type}</label>
                                <input className="form-control text-center w-100 ltr"
                                       type={"input"}
                                       value={this.state.favoriteType}
                                />
                            </div>
                            <div className="form-group  col-lg-2 col-md-3 col-sm-12 float-right pt-3 ml-2">
                                <label>{this.props.language.price}</label>
                                <input className="form-control text-center w-100 ltr"
                                       type={"input"}
                                       value={this.state.price}
                                />
                            </div>
                            <div className="form-group  col-lg-2 col-md-3 col-sm-12 col-md-2 float-right pt-3 ml-2">
                                <label>{this.props.language.code}</label>
                                <input className="form-control text-center w-100 ltr"
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
                                            <input type="button" className="btn btn-danger mr-4" value="email"
                                                   onClick={() => {
                                                       this.copyText("email")
                                                   }}/>
                                        </div>

                                        <div className="col-lg-2 col-md-3 col-sm-2 w-25 mx-2">
                                            <input type="button" className="btn btn-success mr-4 " value="login"
                                                   onClick={() => {
                                                       this.copyText("login")
                                                   }}/>
                                        </div>

                                        <div className="col-lg-3 col-md-4 col-sm-1 w-25 mx-2">
                                            <input type="button" className="btn btn-primary mr-4" value="playstation"
                                                   onClick={() => {
                                                       this.copyText("playstation")
                                                   }}/>
                                        </div>

                                        <input className="dis-hid col-4" type="text"
                                               value="https://id.sonyentertainmentnetwork.com/id/tv/signin/?ui=ds&hidePageElements=noAccountSection%2CtroubleSigningInLink&service_logo=ps&smcid=tv%3Apsvue#/signin"
                                               id="email"/>
                                        <input className="dis-hid col-4" type="text" value="http://my.playstation.com/"
                                               id="playstation"/>
                                        <input className="dis-hid col-4" type="text"
                                               value="https://account.sonyentertainmentnetwork.com/liquid/cam/devices/device-list.action?category=psn&displayNavigation=false"
                                               id="login"/>
                                        {this.state.attributes.length !== 0 ?
                                            this.state.attributes[1] ?

                                                <input className="dis-hid col-4" type="text"
                                                       value={this.state.attributes[0].value + ":" + this.state.attributes[1].value}
                                                       id="copy"/>
                                                :
                                                <input className="dis-hid col-4" type="text"
                                                       value={this.state.attributes[0].value}
                                                       id="copy"/>
                                            : null}
                                    </div>
                                    : null
                            }
                        </div>

                        <div className="form-group col-12 ">
                            <div className="rtl m-0 float-right row w-100 justify-content-start my-1 pb-3 ml-2">
                                {this.state.attributes.map(
                                    (attribute) => (
                                        <div className="form-group col-12 col-sm-6 col-md-3 float-right ">
                                            <label>{attribute.title} :</label>
                                            <input className="form-control text-center w-100 "
                                                   type={"input"}
                                                   value={attribute.value}
                                            />
                                        </div>
                                    ))}

                                {sessionStorage.getItem('username') === "sinashamsi" || "pouyashamsi" || "mahdimohamadi" ?
                                    <div className="form-group col-12 col-sm-6 col-md-3 float-right "
                                         style={{marginTop: "32px"}}>
                                        <input type="button" className="btn btn-warning"
                                               style={{height: "95%"}}
                                               value="copy"
                                               onClick={() => {
                                                   this.copyText("copy")
                                               }}/>
                                    </div>
                                    : null}

                            </div>

                        </div>
                        <div className="form-group col-12 ">
                            <div className="form-group col-12 float-right">
                                <label>{this.props.language.content}</label>
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

                        <div className="col-12 p-3 text-center">
                            <input type="button" className="btn btn-danger mr-3" value={this.props.language.back}
                                   onClick={() => {
                                       this.cancel()
                                   }}/>
                        </div>
                    </div>
                </div>
                {this.state.progress ?
                    <Loading/>
                    : null
                }
            </div>
        );
    };
}

export default withRouter(ShowPost);


