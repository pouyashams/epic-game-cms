import React, {Component} from 'react';
import "../../css/textArea.css"
import {withRouter} from 'react-router-dom';
import {toast} from 'react-toastify';
import {sendAcount} from '../../services/acountService';


class addAcount extends Component {

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
        }
    };

    componentDidMount() {
        // if (this.props.productCategoryList !== undefined) {
        //     const productCategoryList = this.props.productCategoryList.filter(product => product.identifier !== "");
        //     productCategoryList.forEach((productCategory) => {
        //         if (productCategory.identifier === parseInt(this.props.productCategory.identifier)) {
        //             this.setState({productAttributeCategoryList: productCategory.productAttributeCategoryList});
        //         }
        //     });
        // }
        // this.makeCheckBox();
        // this.showProductDetails();
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

    handelChangeInput = (value, name) => {
        this.setState({[name]: value});
    };

    sendAcountInfo = async () => {
        this.setState({progress: true});
        const content ="<b>"+this.state.boldText+"</b>".concat("\n"+ this.state.content + "\n\n".concat("🌐"+this.state.region + "\n".concat("💵" + this.state.price + "\xa0\xa0" + this.state.dolar + "$".concat("\xa0".concat("WMZ/BTC")))));
        try {
            let data = {username: this.state.username, password: this.state.password, content: content};
            const result = await sendAcount(data);
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
    cancel = () => {
        window.history.back();
    };

    render() {
        const options = [
            {name: "Region 1", title: "Region 1"},
            {name: "Region 2", title: "Region 2"},
            {name: "Region 3", title: "Region 3"},
        ];
        return (
            <div
                className="rtl border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3 body-color">
                <div
                    className=" col-12 justify-content-center align-items-center text-center header-box  text-light header-color">
                    <h4 className="py-2 ">اضافه کردن اکانت</h4>
                </div>
                <div className="col-12 justify-content-center align-items-center text-center body-color">
                    <div className="rtl m-0 float-right row w-100 justify-content-start body-color">
                        <div className="form-group col-12 ">
                            <div className="rtl m-0 float-right row w-100 justify-content-start my-3 pb-3">
                                <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                                    <label>ایمیل :</label>
                                    <input className="form-control text-left dir-text-left w-100"
                                           type={"input"}
                                           value={this.state.username}
                                           onChange={(e) => this.handelChangeInput(e.target.value, "username")}

                                    />
                                </div>
                                <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                                    <label>پسورد :</label>
                                    <input className="form-control text-left w-100 dir-text-left"
                                           type={"input"}
                                           value={this.state.password}
                                           onChange={(e) => this.handelChangeInput(e.target.value, "password")}
                                    />
                                </div>
                                <div className="form-group col-sm-6 col-md-2 float-right">
                                    <label>قیمت :</label>
                                    <input className="form-control text-left w-100 dir-text-left"
                                           type={"input"}
                                           value={this.state.price}
                                           onChange={(e) => this.handelChangeInput(e.target.value, "price")}
                                    />
                                </div>
                                <div className="form-group  col-sm-6 col-md-2 float-right">
                                    <label>قیمت دلار :</label>
                                    <input className="form-control text-left w-100 dir-text-left"
                                           type={"input"}
                                           value={this.state.dolar}
                                           onChange={(e) => this.handelChangeInput(e.target.value, "dolar")}
                                    />
                                </div>
                                <div className="form-group  col-sm-6 col-md-2 float-right ">
                                    <label>ریجن :</label>
                                    <select
                                        className="form-control text-center dir-text-left"
                                        onChange={(e) => this.handelChangeInput(e.target.value, "region")}
                                    >
                                        {options.map(
                                            (option) => {
                                                return (<option value={option.value}>{option.title}</option>);
                                            }
                                        )}
                                    </select>
                                </div>
                                <div className="form-group  col-sm-6 col-md-6 float-right ">
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
                            <input type="button" className="btn btn-success mr-3" value="اضافه کردن "
                                   onClick={() => {
                                       this.sendAcountInfo()
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

export default withRouter(addAcount);


