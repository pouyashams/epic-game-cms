import React, {Component} from 'react';
import "../../css/textArea.css"
import {withRouter} from 'react-router-dom';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';


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
            favoriteType: "",
            inputList: [],
            attributes: [],
            favourite: "",
        };
    };

    componentDidMount() {
        const {acountInfo} = this.props.location;
        if (!acountInfo) return window.history.back();
        let attributes = [];
        let favoriteType = "";
        if (this.getValue(acountInfo.favourite)) {
            favoriteType = "برگزیده"
        } else {
            favoriteType = "عادی"
        }
        this.getValue(acountInfo.attributes).forEach((attribute) => {
            attributes.push(
                {
                    "id": attributes.length + 1,
                    "title": attribute.title,
                    "value": attribute.value
                }
            )
        });

        this.setState({
            content: this.getValue(acountInfo.content),
            attributes: attributes,
            favoriteType: favoriteType,
            price: this.getValue(acountInfo.amount),
            id: this.getValue(acountInfo.identifier),
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

    render() {
        return (
            <div
                className="rtl border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3 body-color">
                <div
                    className=" col-12 justify-content-center align-items-center text-center header-box  text-light header-color">
                    <h4 className="py-2 ">نمایش پست</h4>
                </div>
                <div className="col-12 justify-content-center align-items-center text-center body-color">
                    <div
                        className="rtl m-0 float-right row w-100 justify-content-start body-color box-shadow my-4 border radius-line">
                        <div className="form-group col-12 justify-content-center">
                            <div className="form-group  col-sm-6 col-md-2 float-right pt-3 ml-2">
                                    <label>نوع پست :</label>
                                    <input className="form-control text-center w-100 dir-text-left"
                                           type={"input"}
                                           value={this.state.favoriteType}
                                    />
                            </div>
                            <div className="form-group  col-sm-6 col-md-2 float-right pt-3 ml-2">
                                <label>قیمت :</label>
                                <input className="form-control text-center w-100 dir-text-left"
                                       type={"input"}
                                       value={this.state.price}
                                />
                            </div>
                        </div>
                        <div className="form-group col-12 ">
                            <div className="rtl m-0 float-right row w-100 justify-content-start my-1 pb-3">
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
                            </div>

                        </div>
                        <div className="form-group col-12 ">
                            <div className="form-group col-12 float-right">
                                <label>متن پست :</label>
                                <SunEditor
                                    setContents={this.state.content}
                                    setOptions={{
                                        buttonList: [["undo", "redo"], ["bold", "underline", "italic", "strike"]]
                                    }}
                                    disable={true}
                                    enableToolbar={false}
                                    setDefaultStyle="direction: ltr !important; min-height: 200px;"
                                />
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


