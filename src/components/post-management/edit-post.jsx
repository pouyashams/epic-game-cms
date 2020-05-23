import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {toast} from 'react-toastify';
import {editAcount} from '../../services/acountService';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import Loading from "../loading/loading";

class EditPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: "",
            contentText: "",
            boldText: "",
            progress: "",
            price: "",
            favoriteType: "",
            p: "",
            inputList: [],
        };
    };

    componentDidMount() {
        const {accountInfo} = this.props.location;
        if (!accountInfo) return window.history.back();
        let attributes = [];
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
            contentText: this.getValue(accountInfo.originalContent),
            inputList: attributes,
            favoriteType: this.getValue(accountInfo.favourite),
            price: this.getValue(accountInfo.amount),
            id: this.getValue(accountInfo.identifier),
        });
    }

    handleChange = (content) => {
        this.setState({
            content: content
        })
    };

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
        const content = this.state.content;
        data = {
            identifier: this.state.id,
            originalContent: content,
            content: this.makeContent(content),
            amount: parseInt(this.state.price),
            favourite: this.state.favoriteType,
            attributes: attributes
        };
        return data;
    };

    makeContent = (content) => {

        return content.toString()
            .split("<div></div>").join("")
            .replace(/<div><\s*a[^>]*>/gi, "")
            .split("</a></div>").join("\n")
            .replace(/<\s*a[^>]*>/gi, "")
            .replace(/<\s*span[^>]*>/gi, "")
            .split("</a>").join("")
            .split("</span>").join("")
            .split("<h1>").join("<p>")
            .split("<h2>").join("<p>")
            .split("<h3>").join("<p>")
            .split("<h4>").join("<p>")
            .split("<h5>").join("<p>")
            .split("<h6>").join("<p>")
            .split("<h7>").join("<p>")
            .split("</h1>").join("</p>")
            .split("</h2>").join("</p>")
            .split("</h3>").join("</p>")
            .split("</h4>").join("</p>")
            .split("</h5>").join("</p>")
            .split("</h6>").join("</p>")
            .split("</h7>").join("</p>")
            .split("<div>").join("<p>")
            .split("</div>").join("</p>")
            .split("<p><br></p>").join("\n")
            .split("<em><br></em>").join("")
            .split("<ins><br></ins>").join("")
            .split("<strong><br></strong>").join("")
            .split("<del><br></del>").join("")
            .split("<em></em>").join("")
            .split("<ins></ins>").join("")
            .split("<strong></strong>").join("")
            .split("<del></del>").join("")
            .split("<div></div>").join("")
            .split("<p></p>").join("")
            .split("<p>").join("")
            .split("</p>").join("\n")
            .split("<br>").join("")
            .split("&nbsp;").join(" ");
    };

    sendAccountInfo = async () => {
        this.setState({progress: true});
        const data = this.makeData();
        try {
            const result = await editAcount(data);
            if (result.status === 200) {
                toast.success(this.props.language.changesSuccessfully);
                window.history.back();
                this.setState({progress: false});
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(this.props.language.conError);
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

    deletTitle = (id) => {
        const inputList = this.state.inputList.filter(info => info.id !== id);
        this.setState({inputList});
    };

    render() {

        const favoriteTypes = [
            {value: true, title: this.props.language.favourite},
            {value: false, title: this.props.language.normal},
        ];
        let dir = null;
        if (this.props.language.rtl) {
            dir = "rtl"
        } else {
            dir = "ltr"
        }
        let float = null;
        if (this.props.language.rtl) {
            float = "float-right"
        } else {
            float = "float-left"
        }
        return (
            <div
                className="border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3 body-color">
                <div
                    className="col-12 justify-content-center align-items-center text-center header-box  text-light header-color">
                    <h4 className="py-2 ">{this.props.language.edit}</h4>
                </div>

                <div className="col-12 body-color">
                    <div className={dir + " m-0 row w-100 body-color box-shadow my-4 border radius-line"}>
                        <div className=" form-group col-12 m-2">
                            <div className={" form-group  col-sm-6 col-md-2 pt-3 ml-2 " + float}>
                                <label>{this.props.language.type}</label>
                                <select
                                    className="form-control text-center"
                                    onChange={(e) => this.handelChangeInput(e.target.value, "favoriteType")}
                                >
                                    {favoriteTypes.map(
                                        (option) => {
                                            return (<option selected={this.state.favoriteType === option.value}
                                                            value={option.value}>{option.title}</option>);
                                        }
                                    )}
                                </select>
                            </div>
                            <div className={"form-group  col-sm-6 col-md-2 pt-3 ml-2 " + float}>
                                <label>{this.props.language.price}</label>
                                <input className="form-control text-center w-100 ltr"
                                       type={"input"}
                                       value={this.state.price}
                                       onChange={(e) => this.handelChangeInput(e.target.value, "price")}
                                />
                            </div>
                        </div>
                        <div className="form-group col-12">
                            <div className={"m-0 row w-100  my-1 pb-3 " + float}>
                                {this.state.inputList.map(
                                    (input) => (
                                        <div
                                            className={input.id % 2 === 0 ? "col-lg-6 col-md-12 border-right" : "col-lg-6 col-md-12"}
                                            key={input.id}>
                                            <div className={"form-group col-5 " + float}>
                                                <label>{this.props.language.title}</label>
                                                <input className="form-control text-center w-100 "
                                                       type={"input"}
                                                       onChange={(e) => this.handelChangeInputList(e.target.value, input.id, true)}
                                                       value={input.title}
                                                />
                                            </div>
                                            <div className={"form-group col-5 " + float}>
                                                <label>{this.props.language.text}</label>
                                                <input className="form-control text-center w-100"
                                                       type={"input"}
                                                       onChange={(e) => this.handelChangeInputList(e.target.value, input.id, false)}
                                                       value={input.value}
                                                />
                                            </div>
                                            <div className={"form-group col-2 m-t " + float}>
                                                <button className="btn btn-danger rounded-circle "
                                                        onClick={() => {
                                                            this.deletTitle(input.id)
                                                        }}
                                                ><i className="fa fa-trash pt-1"/></button>
                                            </div>
                                        </div>
                                    ))}
                                <div className={"form-group col-12 pt-5 " + float}>
                                    <label>{this.props.language.content}</label>
                                    <SunEditor
                                        onChange={this.handleChange}
                                        setContents={this.state.contentText}
                                        setOptions={{
                                            buttonList: [
                                                ['undo', 'redo'],
                                                ['link'],
                                                ['formatBlock'],
                                                ['bold', 'underline', 'italic', 'strike'],
                                                ['removeFormat'],
                                            ]
                                        }}
                                        setDefaultStyle="direction: ltr !important; min-height: 200px;"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-12 p-3">
                        <input type="button" className="btn btn-success mr-3 my-2" value={this.props.language.done}
                               onClick={() => {
                                   this.sendAccountInfo()
                               }}/>
                        <input type="button" className="btn btn-warning mr-3 my-2" value={this.props.language.add}
                               onClick={() => {
                                   this.addTitle()
                               }}/>
                        <input type="button" className="btn btn-danger mr-3 my-2" value={this.props.language.back}
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

export default withRouter(EditPost);


