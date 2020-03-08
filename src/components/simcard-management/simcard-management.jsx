import React, {Component} from 'react';
import SearchCriteria from "../search/search-criteria";
import SearchResult from "../search/search-result";
import {searchProduct} from "../../services/productService"
import {toast} from 'react-toastify';
import {withRouter} from 'react-router-dom';
import {loadDataOfProduct} from "../../services/productService";
import {fetchAllChildOfCurrentMerchant} from "../../services/userService";


class SimcardManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productCategory: [],
            pageSize: 5,
            searchResultList: [],
            merchants: []
        };
        this.onAccept = this.onAccept.bind(this);
        this.search = this.search.bind(this);
    }

    async componentDidMount() {
        try {
            const oldProductCategory = [{identifier: "", title: "انتخاب کنید..."}];
            const productCategoryList = [];
            const result = await loadDataOfProduct();
            if (result.status === 200) {
                result.data.productCategoryList.forEach((productCategory) => {
                    productCategoryList.push(
                        {identifier: productCategory.identifier, title: productCategory.productCategoryName}
                    )
                });
                const productCategory = oldProductCategory.concat(productCategoryList);
                this.setState({productCategory});
            }

            const resultForFetchMerchants = await fetchAllChildOfCurrentMerchant();
            if (resultForFetchMerchants.status === 200) {
                const merchantArray = this.prepareMerchantSelection(resultForFetchMerchants.data.data);
                this.setState({
                    merchants: merchantArray
                });
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('خطایی در دریافت اطلاعات رخ داده است.');
            }
        }
        document.getElementById("loading").style.display = "none";
    }
    onAccept(searchResult) {
        this.props.history.push({
            pathname: '/accept-simcard',
            productInfo: searchResult
        });
    }
    getSearchCriteriaArray() {
        return [
            {
                name: "name",
                element: "input",
                type: "text",
                placeholder: "---",
                label: "عنوان",
                defaultValue: ""
            },
            {
                name: "registerDateFrom",
                element: "date",
                placeholder: "--- ",
                label: "از تاریخ"
            },
            {
                name: "registerDateTo",
                element: "date",
                placeholder: "---",
                label: "تا تاریخ"
            },
            {
                name: "mobileNumber",
                element: "input",
                type: "number",
                placeholder: "---",
                label: "شماره مشتری",
                defaultValue: ""
            },
            {
                name: "requesterUserId",
                element: "select",
                placeholder: "---",
                defaultValue: "",
                label: "پذیرنده",
                options: this.state.merchants
            },
            {
                name: "registrationStatusCode",
                element: "select",
                placeholder: "---",
                defaultValue: "",
                label: "وضعیت ثبت",
                options: [
                    {
                        value: "",
                        title: "---"
                    },
                    {
                        value: "CONFORMED_PRODUCT_REGISTRATION_STATUS",
                        title: "تایید شده"
                    },
                    {
                        value: "REJECTED_PRODUCT_REGISTRATION_STATUS",
                        title: "رد شده"
                    },
                    {
                        value: "WAITING_FOR_CONFORM_PRODUCT_REGISTRATION_STATUS",
                        title: "در انتظار تایید"
                    }
                ]
            }
        ];
    }

    getResultTableHeader() {
        let headerInfo = {
            showCheckBox: false,
            actions: [
                {
                    name: 'accept',
                    title: 'تایید لغو',
                    icon: 'fa fa-check-square',
                    style: 'btn btn-success btn-xs',
                    onclick: this.onAccept
                }
            ],
            headerTitleInfos: [
                {name: "name", title: "عنوان"},
                {name: "status", title: "وضعیت"},
                {name: "price", title: "مبلغ"},
                {name: "dealType", title: "نوع معامله"},
            ]
        };
        return headerInfo;
    }

    getExtraActions() {
        let extraActions = {
            rightActions: [],
            leftActions: []
        };
        return extraActions;
    }


    search = async (parameters) => {
        try {
            const result = await searchProduct(Object.assign(parameters, {onlyForCustomer: true , searchForCMS : true}));
            let searchResultList = [];
            if (result.status === 200) {
                console.log(result.data.data,12345)
                result.data.data.forEach((dataInfo) => {
                    searchResultList.push(
                        {
                            name: dataInfo.name,
                            firstName: dataInfo.customerInfo.firstName,
                            rejectionReason: dataInfo.rejectionReason,
                            lastName: dataInfo.customerInfo.lastName,
                            mobileNumber: dataInfo.customerInfo.mobileNumber,
                            dealType: dataInfo.dealTypeInfo.name,
                            identifier: dataInfo.identifier,
                            canConfirmOrRejectProduct: dataInfo.canConfirmOrRejectProduct,
                            status: dataInfo.status,
                            price: dataInfo.productItemInfo.price,
                            productAttributeItemList: dataInfo.productItemInfo.productAttributeItemList,
                            allowedMerchants: dataInfo.allowedMerchants,
                            merchants: this.state.merchants,
                        }
                    )
                });
                this.setState({searchResultList});
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('لطفا کلیه موارد را پر کنید');
            }
        }
        document.getElementById("loading").style.display = "none";
    };

    prepareMerchantSelection(merchants) {
        let merchantArray = [{
            value: "",
            title: "انتخاب کنید..."
        }];
        merchants.forEach((merchant) => {
            let data = {
                value: merchant.identifier,
                title: merchant.name
            };
            merchantArray.push(data);
        });
        return merchantArray;
    }

    render() {
        const {searchResultList, pageSize} = this.state;
        const searchCriteriaArray = this.getSearchCriteriaArray();
        const headerInfo = this.getResultTableHeader();
        const extraActions = this.getExtraActions();

        return (
            <div
                className="rtl border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3">
                <div className="col-12 justify-content-center align-items-center text-center header-box text-light">
                    <h4 className="py-2">مدیریت سیمکارت</h4>
                </div>
                <SearchCriteria extraActions={extraActions} onSearch={this.search}
                                searchCriteriaArray={searchCriteriaArray}/>
                <SearchResult headerInfo={headerInfo} searchResultList={searchResultList} pageSize={pageSize}/>
            </div>
        );
    }
}

export default withRouter(SimcardManagement);
