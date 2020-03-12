import React, {Component} from 'react';
import "../../css/textArea.css"
import {withRouter} from 'react-router-dom';


class addAcount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            content: ""
        }
    };

    componentDidMount() {
        const {acountInfo} = this.props.location;
        if (!acountInfo) return window.history.back();
        this.setState({
            username: this.getValue(acountInfo.username)+":"+this.getValue(acountInfo.password),
            content: this.getValue(acountInfo.content),
        });

    }

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
                    <h4 className="py-2 ">نمایش اکانت</h4>
                </div>
                <div className="col-12 justify-content-center align-items-center text-center body-color">
                    <div className="rtl m-0 float-right row w-100 justify-content-start body-color">
                        <div className="form-group col-12 ">
                            <div className="rtl m-0 float-right row w-100 justify-content-start my-3 pb-3">
                                <div className="form-group col-12 col-sm-6 col-md-5 float-right">
                                    <label>ایمیل و پسورد :</label>
                                    <input className="form-control text-center w-100"
                                           type={"input"}
                                           placeholder="---"
                                           value={this.state.username}
                                    />
                                </div>
                                <label className="col-12 py-2">مشخصات اکانت :</label>
                                <div className="form-group col-6 float-right">
                            <textarea className="form-control text-center textarea-style"
                                      value={this.state.content}
                            />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 p-3 text-center">
                            <input type="button" className="btn btn-danger mr-3" value="بازگشت"
                                   onClick={() => {
                                       this.cancel()
                                   }}/>
                        </div>
                    </div>
                </div>


            </div>
        );
    };
}

export default withRouter(addAcount);


