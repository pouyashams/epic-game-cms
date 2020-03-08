import React, {Component} from 'react';
import "../../css/textArea.css"
import {withRouter} from 'react-router-dom';
import {acceptProduct, cancelProduct} from "../../services/productService";
import {toast} from 'react-toastify';

class acceptSimcard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            firstName: "",
            lastName: "",
            mobileNumber: "",
            status: "",
            rejectionReason: "",
            dealType: "",
            price: "",
            productAttributeItemList: [],
            identifier: "",
            canConfirmOrRejectProduct: "",
            checkbox: []
        }
    };

    handelChangeCheckBox = (id, checked) => {
        const checkbox = [];
        this.state.checkbox.forEach((merchant) => {
            if (merchant.id === parseInt(id)) {
                checkbox.push(
                    {
                        id: merchant.id,
                        checked: checked,
                        name: merchant.name
                    }
                )
            }
            else {
                checkbox.push(
                    {
                        id: merchant.id,
                        checked: merchant.checked,
                        name: merchant.name

                    }
                )
            }
        });
        this.setState({checkbox});
    };


    componentDidMount() {
        if (this.props.productCategoryList !== undefined) {
            const productCategoryList = this.props.productCategoryList.filter(product => product.identifier !== "");
            productCategoryList.forEach((productCategory) => {
                if (productCategory.identifier === parseInt(this.props.productCategory.identifier)) {
                    this.setState({productAttributeCategoryList: productCategory.productAttributeCategoryList});
                }
            });
        }
        this.makeCheckBox();
        this.showProductDetails();
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

    acceptProductInfo = async () => {
        const allowedMerchants = [];
        this.state.checkbox.forEach((merchant) => {
            if (merchant.checked === true) {
                allowedMerchants.push(merchant.id);
            }
        });
        try {
            let data = {identifier: this.state.identifier, allowedMerchants: allowedMerchants};
            const result = await acceptProduct(data);
            if (result.status === 200) {
                toast.success('کالا با موفقیت تایید شد');
                document.getElementById("loading").style.display = "none";
                return this.props.history.push('/simcard-management');
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('ارتباط با سرور برقرار نشد');
            }
        }
        document.getElementById("loading").style.display = "none";
    };
    cancelProductInfo = async () => {
        try {
            let data = {
                identifier: this.state.identifier,
                rejectionReason: this.state.rejectionReason
            };
            const result = await cancelProduct(data);
            if (result.status === 200) {
                toast.success('کالا با موفقیت لغو شد');
                document.getElementById("loading").style.display = "none";
                return this.props.history.push('/simcard-management');
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('ارتباط با سرور برقرار نشد');
            }
        }
        document.getElementById("loading").style.display = "none";
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
        const productItem = this.state;
        return (
            <div
                className="rtl border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3">
                <div
                    className=" col-12 justify-content-center align-items-center text-center header-box  text-light">
                    <h4 className="py-2">تایید و لغو سیمکارت</h4>
                </div>
                <div className="col-12 justify-content-center align-items-center text-center">
                    <div
                        className="rtl border bg-light shadow m-0 float-right row w-100 justify-content-start my-3 pb-3">
                        <div className="form-group col-12 ">
                            <h4 className="py-2">مشخصات مشتری :</h4>
                    <div className="rtl m-0 float-right row w-100 justify-content-start my-3 pb-3">
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>نام مشتری :</label>
                            <input className="form-control text-center w-75"
                                   type={"input"}
                                   placeholder="---"
                                   value={productItem.firstName}
                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>نام خانوادگی مشتری :</label>
                            <input className="form-control text-center w-75"
                                   type={"input"}
                                   placeholder="---"
                                   value={productItem.lastName}
                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>عنوان :</label>
                            <input className="form-control text-center w-75"
                                   type={"input"}
                                   placeholder="---"
                                   value={productItem.name}
                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>قیمت :</label>
                            <input className="form-control text-center w-75"
                                   type={"input"}
                                   placeholder="---"
                                   value={productItem.price}

                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>وضعیت :</label>
                            <input className="form-control text-center w-75"
                                   type={"input"}
                                   placeholder="---"
                                   value={productItem.status}

                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>شماره مشتری :</label>
                            <input className="form-control text-center w-75"
                                   type={"input"}
                                   placeholder="---"
                                   value={productItem.mobileNumber}

                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>نوع معامله :</label>
                            <input className="form-control text-center w-75"
                                   type={"input"}
                                   placeholder="---"
                                   value={productItem.dealType}

                            />
                        </div>
                    </div>
                </div>
                </div>
                </div>
                <div className="col-12 justify-content-center align-items-center text-center">
                    <div
                        className="rtl border bg-light shadow m-0 float-right row w-100 justify-content-start my-3 pb-3">
                        <div className="form-group col-12 ">
                            <h4 className="py-3">مشخصات سیمکارت :</h4>
                            {console.log(this.state.productAttributeItemList, 1234)}
                            {this.state.productAttributeItemList.map((productAttribute) =>
                                (
                                    <div>
                                        {productAttribute.value !== null ?
                                            <div className="form-group col-12 col-sm-6 col-md-3 float-right">

                                                <label>{productAttribute.productAttributeCategory.categoryName}:</label>
                                                <input className="form-control text-center w-75"
                                                       type={"input"}
                                                       placeholder="---"
                                                       value={productAttribute.value}
                                                />
                                            </div> :
                                            <div className="form-group col-12 col-sm-6 col-md-3 float-right">

                                                <label>{productAttribute.productAttributeCategory.categoryName}:</label>
                                                <input className="form-control text-center w-75"
                                                       type={"input"}
                                                       placeholder="---"
                                                       value={productAttribute.productAttribute.attributeValue}
                                                />
                                            </div>
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="col-12 justify-content-center align-items-center text-center">
                    <div
                        className="rtl border bg-light shadow m-0 float-right row w-100 justify-content-start my-3 pb-3">
                        <h4 className="py-3 col-12">علت لغو کالا :</h4>
                        <div className="form-group col-6 float-right">
                            <textarea className="form-control text-center textarea-style"
                                      value={this.state.rejectionReason}
                                      name={"rejectionReason"}
                                      onChange={(e) => this.handelChangeInput(e.target.value, e.target.name)}
                            />
                        </div>
                    </div>
                </div>
                {this.state.checkbox.length !== 0 ? (
                    <div className="col-12 justify-content-center align-items-center text-center">
                        <div
                            className="rtl border m-0 bg-light shadow float-right row w-100 justify-content-start my-3 pb-3">
                            <div className="form-group col-12 ">
                                <h4 className="py-3"> پذیرنده ها:</h4>
                            </div>
                            {this.state.checkbox.map((merchant) =>
                                (
                                    <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                                        <div className="input-group">
                                            <div className="input-group addon">
                                                <div className="py-2 custom-control custom-checkbox">
                                                    <input type="checkbox" className=" custom-control-input"
                                                           checked={merchant.checked}
                                                           id={merchant.id}
                                                           onChange={(e) => this.handelChangeCheckBox(e.target.id, e.target.checked)}
                                                    />
                                                    <label className="px-4 custom-control-label"
                                                           htmlFor={merchant.id}>{merchant.name}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                ) : null}
                {this.state.canConfirmOrRejectProduct ?
                    <div className="col-12 p-3 text-center">
                        <input type="button" className="btn btn-success mr-3" value="تایید "
                               onClick={() => {
                                   this.acceptProductInfo()
                               }}/>
                        <input type="button" className="btn btn-danger mr-3" value="لغو"
                               onClick={() => {
                                   this.cancelProductInfo()
                               }}/>
                    </div> :
                    <div className="col-12 p-3 text-center justify-content-center">


                        <button className="btn btn-danger btn-sm">
                            <span className="fa fa-warning"/>
                        </button>
                        <h6 className="p-2 font-weight-bold">(قادر به تایید یا لغو نمی باشید)</h6>
                    </div>
                }

            </div>
        );
    };
}

export default withRouter(acceptSimcard);


