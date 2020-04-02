import React, {Component} from 'react';
import "../../css/textArea.css"
import {withRouter} from 'react-router-dom';
import {toast} from 'react-toastify';
import {fetchUserDefaultPostAttributes, sendAcount} from '../../services/acountService';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';


class addAcount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: "",
            progress: "",
            price: "",
            dolar: "",
            region: "Region 1",
            dataType: "auto",
            favoriteType: true,
            inputList: [{
                id: 1,
                title: "",
                value: ""
            }],
        };
    };

    async componentDidMount() {
        this.setState({progress: true});
        try {
            const result = await fetchUserDefaultPostAttributes();
            if (result.status === 200) {
                let attributes = [];
                result.data.data.forEach((attribute) => {
                    attributes.push({
                        id: attributes.length + 1,
                        title: attribute
                    });
                });
                this.setState({
                    inputList: attributes, progress: false
                });
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

    handelChangeInputList = (value, id, check) => {
        const {inputList} = this.state;
        for (let i = 0; i < inputList.length; i++) {
            if (inputList[i].id === id) {
                if (check) {
                    inputList[i].title = value;
                    break;
                } else {
                    inputList[i].value = value;
                    break;
                }
            }
        }
        this.setState({inputList});
    };

    makeData = () => {
        let data = "";
        let attributes = [];
        this.state.inputList.forEach((attribute) => {
            attributes.push({
                title: attribute.title,
                value: attribute.value
            });
        });
        if (sessionStorage.getItem('username') === "epicgame") {
            const content =this.state.content + "\n\n".concat("🌐" + this.state.region + "\n".concat("💵" + this.state.price + "\xa0\xa0" + this.state.dolar + "$".concat("\xa0".concat("WMZ/BTC"))));
            data = {
                content: content,
                favourite: this.state.favoriteType,
                amount: parseInt(this.state.price.split(',').join('')),
                attributes: attributes
            };
        } else {
            const content = this.state.content;
            data = {
                content: content,
                favourite: this.state.favoriteType,
                amount: parseInt(this.state.price.split(',').join('')),
                attributes: attributes
            };
        }
        return data;
    };

    sendAcountInfo = async () => {
        this.setState({progress: true});
        const data = this.makeData();
        try {
            const result = await sendAcount(data);
            if (result.status === 200) {
                toast.success('پست با موفقیت ثبت شد');
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

    addTitle = () => {
        const inputList = [];
        this.state.inputList.forEach((attribute) => {
            inputList.push({
                id: inputList.length + 1,
                title: attribute.title,
                value: attribute.value
            });
        });
        inputList.push({
            id: inputList.length + 1,
            title: "",
            value: ""
        });
        this.setState({inputList})

    };
    handleChange = (content) => {
        this.setState({
            content: content.toString().split("<p>").join("").split("</p>").join("\n")
        })
    };

    deletTitle = (id) => {
        const inputList = this.state.inputList.filter(info => info.id !== id);
        this.setState({inputList});
    };

    render() {
        const options = [
            {value: "Region 1", title: "Region 1"},
            {value: "Region 2", title: "Region 2"},
            {value: "Region 3", title: "Region 3"},
        ];

        const favoriteTypes = [
            {value: true, title: "برگزیده"},
            {value: false, title: "عادی"},
        ];
        return (
            <div
                className="rtl border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3 body-color">
                <div
                    className=" col-12 justify-content-center align-items-center text-center header-box  text-light header-color">
                    <h4 className="py-2 ">اضافه کردن پست</h4>
                </div>
                <div className="col-12 justify-content-center align-items-center text-center body-color">
                    <div
                        className="rtl m-0 float-right row w-100 justify-content-start body-color box-shadow my-4 border radius-line">
                        <div className="form-group col-12 justify-content-center">
                            <div className="form-group  col-sm-6 col-md-2 float-right pt-3 ml-2">
                                <label>نوع پست :</label>
                                <select
                                    className="form-control text-center"
                                    onChange={(e) => this.handelChangeInput(e.target.value, "favoriteType")}
                                >
                                    {favoriteTypes.map(
                                        (option) => {
                                            return (<option value={option.value}>{option.title}</option>);
                                        }
                                    )}
                                </select>
                            </div>
                            {
                                sessionStorage.getItem('username') === "epicgame" ?
                                    <div className="col-12">
                                        <div className="form-group  col-sm-6 col-md-2 float-right pt-3 ml-2">
                                            <label>ریجن :</label>
                                            <select
                                                className="form-control text-center dir-text-left"
                                                onChange={(e) => this.handelChangeInput(e.target.value, "region")}
                                            >
                                                {options.map(
                                                    (option) => {
                                                        return (
                                                            <option
                                                                value={option.value}>{option.title}</option>);
                                                    }
                                                )}
                                            </select>
                                        </div>
                                        <div className="form-group  col-sm-6 col-md-2 float-right pt-3 ml-2">
                                            <label>قیمت دلار :</label>
                                            <input className="form-control text-center w-100 dir-text-left"
                                                   type={"input"}
                                                   value={this.state.dolar}
                                                   onChange={(e) => this.handelChangeInput(e.target.value, "dolar")}
                                            />
                                        </div>
                                        <div className="form-group col-12 col-sm-6 col-md-2 float-right pt-3 ml-2">
                                            <label>قیمت :</label>
                                            <input className="form-control text-center w-100 dir-text-left"
                                                   type={"input"}
                                                   value={this.state.price}
                                                   onChange={(e) => this.handelChangeInput(e.target.value, "price")}
                                            />
                                        </div>

                                    </div>
                                    : <div className="form-group col-12 col-sm-6 col-md-2 float-right pt-3 ml-2">
                                        <label>قیمت :</label>
                                        <input className="form-control text-center w-100 dir-text-left"
                                               type={"input"}
                                               value={this.state.price}
                                               onChange={(e) => this.handelChangeInput(e.target.value, "price")}
                                        />
                                    </div>
                            }

                        </div>


                        <div className="form-group col-12">
                            <div className="rtl m-0 float-right row w-100 justify-content-start my-1 pb-3">
                                {this.state.inputList.map(
                                    (input) => (
                                        <div className={input.id % 2 === 0 ? "col-6 border-right" : "col-6"}
                                             key={input.id}>
                                            <div className="form-group col-12 col-sm-6 col-md-5 float-right ">
                                                <label>عنوان :</label>
                                                <input className="form-control text-center w-100 "
                                                       type={"input"}
                                                       onChange={(e) => this.handelChangeInputList(e.target.value, input.id, true)}
                                                       value={input.title}
                                                />
                                            </div>
                                            <div className="form-group col-12 col-sm-6 col-md-5 float-right">
                                                <label>متن :</label>
                                                <input className="form-control text-center w-100"
                                                       type={"input"}
                                                       onChange={(e) => this.handelChangeInputList(e.target.value, input.id, false)}
                                                       value={input.value}
                                                />
                                            </div>
                                            <div className="form-group col-12 col-sm-6 col-md-2 float-right m-t">
                                                <button className="btn btn-danger rounded-circle "
                                                        onClick={() => {
                                                            this.deletTitle(input.id)
                                                        }}
                                                ><i className="fa fa-trash pt-1"/></button>
                                            </div>
                                        </div>
                                    ))}
                                <div className="form-group col-12 float-right">
                                    <label>متن پست :</label>
                                    <SunEditor
                                        onChange={this.handleChange}
                                        setOptions={{
                                            buttonList: [["undo", "redo"], ["bold", "underline", "italic", "strike"]]
                                        }}
                                        setDefaultStyle="direction: ltr !important; min-height: 200px;"
                                    />
                                </div>

                            </div>
                        </div>

                        <div className="col-12 p-3 text-center">
                            <input type="button" className="btn btn-success mr-3" value="انجام عملیات"
                                   onClick={() => {
                                       this.sendAcountInfo()
                                   }}/>
                            <input type="button" className="btn btn-warning mr-3" value="اضافه کردن"
                                   onClick={() => {
                                       this.addTitle()
                                   }}/>
                            <input type="button" className="btn btn-danger mr-3" value="بازگشت"
                                   onClick={() => {
                                       this.cancel()
                                   }}/>
                        </div>
                    </div>
                </div>
                {
                    this.state.progress ?
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


