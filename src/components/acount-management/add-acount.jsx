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
            content: ""
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
        try {
            let data = {username: this.state.username, password: this.state.password, content: this.state.content};
            const result = await sendAcount(data);
            if (result.status === 200) {
                toast.success('اکانت با موفقیت ثبت شد');
                document.getElementById("loading").style.display = "none";
                window.history.back();
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('ارتباط با سرور برقرار نشد');
            }
        }
        document.getElementById("loading").style.display = "none";
    };
    cancel = () => {
        window.history.back();
    };

    showProductDetails = () => {
        const {productInfo} = this.props.location;
        if (!productInfo) return this.props.history.push('/simcard-management');
        console.log(productInfo)
        this.setState({
            canConfirmOrRejectProduct: this.getValue(productInfo.canConfirmOrRejectProduct),
            rejectionReason: this.getValue(productInfo.rejectionReason),
            name: this.getValue(productInfo.name),
            firstName: this.getValue(productInfo.firstName),
            dealType: this.getValue(productInfo.dealType),
            status: this.getValue(productInfo.status),
            lastName: this.getValue(productInfo.lastName),
            mobileNumber: this.getValue(productInfo.mobileNumber),
            identifier: this.getValue(productInfo.identifier),
            price: this.getValue(productInfo.price),
            productAttributeItemList: this.getValue(productInfo.productAttributeItemList),
        });
    };
    makeCheckBox = () => {
        const {productInfo} = this.props.location;
        if (!productInfo) return this.props.history.push('/simcard-management');
        const merchants = [];
        const allowedMerchants = [];
        const allowed = this.getValue(productInfo.allowedMerchants);
        allowed.forEach((allow) => {
            let data = {
                id: allow.identifier,
                checked: true,
                name: allow.name
            };
            allowedMerchants.push(data);
        });
        const merchantArray = this.getValue(productInfo.merchants.filter(merchant => merchant.value !== ""));
        merchantArray.forEach((merchant) => {
            let data = {
                id: merchant.value,
                checked: false,
                name: merchant.title
            };
            merchants.push(data);
        });
        let s = new Set();
        const data = [...allowedMerchants, ...merchants].filter(d => {
                let avail = s.has(d.id);
                !avail && s.add(d.id);
                return !avail
            }
        );
        this.setState({
            checkbox: data
        });
    };

    render() {
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
                                    <input className="form-control text-center w-75"
                                           type={"input"}
                                           placeholder="---"
                                           value={this.state.username}
                                           onChange={(e) => this.handelChangeInput(e.target.value, "username")}

                                    />
                                </div>
                                <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                                    <label>پسورد :</label>
                                    <input className="form-control text-center w-75"
                                           type={"input"}
                                           placeholder="---"
                                           value={this.state.password}
                                           onChange={(e) => this.handelChangeInput(e.target.value, "password")}

                                    />
                                </div>
                                <label className="col-12 py-2">مشخصات اکانت :</label>
                                <div className="form-group col-6 float-right">
                            <textarea className="form-control text-center textarea-style"
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


            </div>
        );
    };
}

export default withRouter(addAcount);


