import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {toast} from 'react-toastify';
import {editBot, fetchSchedule} from '../../services/acountService';
import Loading from "../loading/loading";


class EditBot extends Component {

    constructor(props) {
        super(props);
        this.state = {
            interval: "",
            numberOfNormalPost: "",
            numberOfFavouritePost: "",
            silent: "",
            active: "",
            progress: false,
        };
    };

    async componentDidMount() {
        this.setState({progress: true});
        try {
            const result = await fetchSchedule({});
            if (result.status === 200) {
                if (this.hasValue(result.data.data)) {
                    this.setState({
                        interval: result.data.data.interval,
                        numberOfNormalPost: result.data.data.numberOfNormalPost,
                        numberOfFavouritePost: result.data.data.numberOfFavouritePost,
                        silent: result.data.data.silent,
                        active: result.data.data.active,
                        progress: false
                    });
                } else {
                    this.setState({
                        interval: 10,
                        numberOfNormalPost: 1,
                        numberOfFavouritePost: 2,
                        silent: true,
                        active: false,
                        progress: false
                    });
                }
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('ارتباط با سرور برقرار نشد');
                this.setState({progress: false});
            }
        }
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

    handelChangeInput = (value, name) => {
        this.setState({[name]: value});
    };


    sendBotInfo = async () => {
        const data = {
            "interval": parseInt(this.state.interval),
            "numberOfNormalPost": parseInt(this.state.numberOfNormalPost),
            "numberOfFavouritePost": parseInt(this.state.numberOfFavouritePost),
            "silent": (this.state.silent === "true" || this.state.silent === true),
            "active": (this.state.active === "true" || this.state.active === true)
        };
        if (this.isValidToSend(data)) {
            this.setState({progress: true});
            try {
                const result = await editBot(data);
                if (result.status === 200) {
                    toast.success('تنظیمات بات با موفقیت ثبت شد');
                    this.setState({progress: false});
                }
            } catch (ex) {
                if (ex.response && ex.response.status === 400) {
                    toast.error('ارتباط با سرور برقرار نشد');
                    this.setState({progress: false});
                }
            }
        }

    };

    isValidToSend = (data) => {
        if (!this.hasValue(data.interval)) {
            toast.error('زمان چرخه پست را وارد کنید');
            return false
        } else if (!this.hasValue(data.numberOfNormalPost)) {
            toast.error('تعداد پست عادی را وارد کنید');
            return false
        } else if (!this.hasValue(data.numberOfFavouritePost)) {
            toast.error('تعداد پست برگزیده را وارد کنید');
            return false
        } else if (!this.hasValue(data.silent)) {
            toast.error('نوع نوتیفیکیشن را انتخاب کنید');
            return false
        } else if (!this.hasValue(data.active)) {
            toast.error('وضعیت بات را انتخاب کنید');
            return false
        } else {
            return true
        }
    };

    render() {
        const actives = [
            {value: true, title: this.props.language.active},
            {value: false, title: this.props.language.inactive},
        ];
        const silents = [
            {value: false, title: this.props.language.sound},
            {value: true, title: this.props.language.silent},
        ];
        let dir= null;
        if (this.props.language.rtl){
            dir="rtl"
        }else {
            dir="ltr"
        }
        return (
            <div className=" border bg-light shadow row w-100 m-0 my-3 body-color">
                <div
                    className="col-12 justify-content-center align-items-center text-center header-box  text-light header-color">
                    <h4 className="py-2 ">{this.props.language.botSetting}</h4>
                </div>
                <div className="col-12 justify-content-center align-items-center text-center body-color">
                    <div className={dir + " m-0 row w-100  body-color box-shadow my-4 border radius-line"}>
                        <div className="form-group  col-sm-6 col-md-2 float-right pt-3 ml-2">
                            <label>{this.props.language.botStatus}</label>
                            <select
                                className="form-control text-center"
                                onChange={(e) => this.handelChangeInput(e.target.value, "active")}
                            >
                                {actives.map(
                                    (option) => {
                                        return (<option selected={this.state.active === option.value}
                                                        value={option.value}>{option.title}</option>);
                                    }
                                )}
                            </select>
                        </div>
                        <div className="form-group  col-sm-6 col-md-2 float-right pt-3 ml-2">
                            <label>{this.props.language.notification}</label>
                            <select
                                className="form-control text-center"
                                onChange={(e) => this.handelChangeInput(e.target.value, "silent")}
                            >
                                {silents.map(
                                    (option) => {
                                        return (<option selected={this.state.silent === option.value}
                                                        value={option.value}>{option.title}</option>);
                                    }
                                )}
                            </select>
                        </div>
                        <div className="form-group  col-sm-6 col-md-2 float-right pt-3 ml-2">
                            <label>{this.props.language.postCycleTime}</label>
                            <input className="form-control text-center w-100 ltr"
                                   type={"input"}
                                   value={this.state.interval}
                                   onChange={(e) => this.handelChangeInput(e.target.value, "interval")}
                            />
                        </div>
                        <div className="form-group  col-sm-6 col-md-2 float-right pt-3 ml-2">
                            <label>{this.props.language.numberOfRegularPost}</label>
                            <input className="form-control text-center w-100 ltr"
                                   type={"input"}
                                   value={this.state.numberOfNormalPost}
                                   onChange={(e) => this.handelChangeInput(e.target.value, "numberOfNormalPost")}
                            />
                        </div>
                        <div className="form-group  col-sm-6 col-md-2 float-right pt-3 ml-2">
                            <label>{this.props.language.numberOfFavouritePost}</label>
                            <input className="form-control text-center w-100 ltr"
                                   type={"input"}
                                   value={this.state.numberOfFavouritePost}
                                   onChange={(e) => this.handelChangeInput(e.target.value, "numberOfFavouritePost")}
                            />
                        </div>
                        <div className="col-12 p-3 text-center">
                            <input type="button" className="btn btn-success mr-3" value={this.props.language.done}
                                   onClick={() => {
                                       this.sendBotInfo()
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

export default withRouter(EditBot);


