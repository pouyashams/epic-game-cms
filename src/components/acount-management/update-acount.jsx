import React, {Component} from 'react';
import "../../css/textArea.css"
import {withRouter} from 'react-router-dom';
import {toast} from 'react-toastify';
import {editAcount} from "../../services/acountService";


class updateAcount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            content: "",
            id: "",
            boldText: "",
            progress: ""
        }
    };

    componentDidMount() {
        const {acountInfo} = this.props.location;
        if (!acountInfo) return window.history.back();
        this.setState({
            username: this.getValue(acountInfo.username),
            password: this.getValue(acountInfo.password),
            content: this.getValue(acountInfo.content),
            id: this.getValue(acountInfo.identifier),
        });

    }

    editAcountInfo = async () => {
        this.setState({progress: true});
        const content ="<b>"+this.state.boldText+"</b>".concat("\n"+ this.state.content);
        try {
            let data = {
                username: this.state.username,
                password: this.state.password,
                content: content,
                identifier: this.state.id
            };
            const result = await editAcount(data);
            if (result.status === 200) {
                toast.success('اکانت با موفقیت ثبت شد');
                window.history.back();
                this.setState({progress: false});
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('ارتباط با سرور برقرار نشد');
                this.setState({progress: false});
            }
        }
    };

    handelChangeInput = (value, name) => {
        this.setState({[name]: value});
    };

    hasValue(field) {
        return field !== null && field !== undefined && field !== "";
    }

    getValue(field) {
        if (this.hasValue(field)) {
            return field;
        } else {
            return "";
        }
    }

    cancel = () => {
        window.history.back();
    };

    render() {
        return (
            <div
                className="rtl border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3 body-color">
                <div
                    className=" col-12 justify-content-center align-items-center text-center header-box  text-light header-color">
                    <h4 className="py-2 ">ویرایش اکانت</h4>
                </div>
                <div className="col-12 justify-content-center align-items-center text-center body-color">
                    <div className="rtl m-0 float-right row w-100 justify-content-start body-color">
                        <div className="form-group col-12 ">
                            <div className="rtl m-0 float-right row w-100 justify-content-start my-3 pb-3">
                                <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                                    <label>ایمیل :</label>
                                    <input className="form-control text-left w-100"
                                           type={"input"}
                                           placeholder="---"
                                           value={this.state.username}
                                           onChange={(e) => this.handelChangeInput(e.target.value, "username")}
                                    />
                                </div>
                                <div className="form-group col-12 col-sm-6 col-md-4 float-right">
                                    <label>پسورد :</label>
                                    <input className="form-control text-left dir-text-left w-75"
                                           type={"input"}
                                           placeholder="---"
                                           value={this.state.password}
                                           onChange={(e) => this.handelChangeInput(e.target.value, "password")}
                                    />
                                </div>
                                <div className="form-group col-sm-6 col-md-6 float-right ">
                                    <label className="py-2">مشخصات اکانت (bold) :</label>
                                    <textarea className="form-control textarea-style text-left"
                                              value={this.state.boldText}
                                              onChange={(e) => this.handelChangeInput(e.target.value, "boldText")}
                                    />
                                </div>
                                <div className="form-group  col-sm-6 col-md-6 float-right ">
                                    <label className=" py-2">مشخصات اکانت :</label>
                                    <textarea className="form-control textarea-style text-left"
                                              value={this.state.content}
                                              onChange={(e) => this.handelChangeInput(e.target.value, "content")}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 p-3 text-center">
                            <input type="button" className="btn btn-success mr-3" value="ویرایش"
                                   onClick={() => {
                                       this.editAcountInfo()
                                   }}/>
                            <input type="button" className="btn btn-danger mr-3" value="بازگشت"
                                   onClick={() => {
                                       this.cancel()
                                   }}/>
                        </div>
                    </div>
                </div>
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
    };
}

export default withRouter(updateAcount);


