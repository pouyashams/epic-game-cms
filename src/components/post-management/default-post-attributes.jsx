import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {toast} from 'react-toastify';
import {fetchUserDefaultPostAttributes, saveOrUpdateDefaultPostAttributes} from '../../services/acountService';
import Loading from "../loading/loading";


class DefaultPostAttributes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputList: [],
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
                    })
                });

                this.setState({
                    inputList: attributes, progress: false
                });
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(this.props.language.conError);
                this.setState({progress: false});
            }
        }
    }

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

    saveDefaultPostAttributes = async () => {
        this.setState({progress: true});
        const attributes = [];
        this.state.inputList.forEach((dataInfo) => {
            attributes.push(dataInfo.title)
        });
        let data = {
            defaultAttributes: attributes
        };
        try {
            const result = await saveOrUpdateDefaultPostAttributes(data);
            if (result.status === 200) {
                toast.success(this.props.language.changesSuccessfully);
                this.setState({progress: false});
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(this.props.language.conError);
                this.setState({progress: false});
            }
        }
    };


    addTitle = () => {
        const inputList = this.state.inputList;
        inputList.push(
            {
                id: this.state.inputList.length + 1,
                title: ""
            }
        );
        this.setState({inputList})

    };

    deletTitle = (id) => {
        const inputList = this.state.inputList.filter(info => info.id !== id);
        this.setState({inputList});
    };

    render() {

        return (
            <div
                className={this.props.theme === "day" ? "row w-100 m-0 text-center justify-content-center align-items-center my-3 body-color-light border-light-color" : "row w-100 m-0 text-center justify-content-center align-items-center my-3 body-color border-dark-color"}>
                <div
                    className={this.props.theme === "day" ? " col-12 justify-content-center align-items-center text-center header-box  text-light header-color-light" : " col-12 justify-content-center align-items-center text-center header-box  text-light header-color"}>
                    <h4 className="py-2 ">{this.props.language.defaultPostRegistration}</h4>
                </div>
                <div
                    className={this.props.theme === "day" ? "col-12 justify-content-center align-items-center text-center body-color-light" : "col-12  justify-content-center align-items-center text-center body-color"}>
                    <div
                        className={this.props.theme === "day" ? "m-0 float-right row w-100 justify-content-start body-color-light box-shadow my-4 dark-shadow radius-line" : "m-0 float-right row w-100 justify-content-start body-color box-shadow my-4 white-shadow radius-line"}>
                        <div className="form-group col-12 ">
                            {this.props.language.rtl ?
                                <div className="rtl m-0 float-right row w-100 justify-content-start my-1 pb-3">
                                    {
                                        this.state.inputList.map(
                                            (input) => (
                                                <div
                                                    className={input.id % 2 === 0 ? "col-sm-6 col-md-3 border-right pt-3" : "col-sm-6 col-md-3 pt-3"}
                                                    key={input.id}>
                                                    <div className="form-group col-10 float-right ">
                                                        <label className={this.props.theme === "day" ? "text-dark" : "text-white"}>{this.props.language.title} :</label>
                                                        <input className="form-control text-center w-100 p-radius"
                                                               type={"input"}
                                                               onChange={(e) => this.handelChangeInputList(e.target.value, input.id, true)}
                                                               value={input.title}
                                                        />
                                                    </div>
                                                    <div className="form-group col-2 float-right m-t">
                                                        <button className="btn btn-danger rounded-circle "
                                                                onClick={() => {
                                                                    this.deletTitle(input.id)
                                                                }}
                                                        ><i className="fa fa-trash pt-1"/></button>
                                                    </div>
                                                </div>
                                            )
                                        )
                                    }
                                </div>
                                :
                                <div className="ltr m-0 float-right row w-100 justify-content-start my-1 pb-3">
                                    {
                                        this.state.inputList.map(
                                            (input) => (
                                                <div className="col-sm-6 col-md-3 pt-3" key={input.id}>
                                                    <div className="form-group col-2 float-right m-t">
                                                        <button className="btn btn-danger rounded-circle "
                                                                onClick={() => {
                                                                    this.deletTitle(input.id)
                                                                }}
                                                        ><i className="fa fa-trash pt-1"/></button>
                                                    </div>
                                                    <div className="form-group col-10 float-right ">
                                                        <label className={this.props.theme === "day" ? "text-dark" : "text-white"}>{this.props.language.title} :</label>
                                                        <input className="form-control text-center w-100 p-radius"
                                                               type={"input"}
                                                               onChange={(e) => this.handelChangeInputList(e.target.value, input.id, true)}
                                                               value={input.title}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        )
                                    }
                                </div>
                            }
                        </div>

                        <div className="col-12 p-3 text-center">
                            <input type="button" className="btn btn-success mr-3" value={this.props.language.done}
                                   onClick={() => {
                                       this.saveDefaultPostAttributes()
                                   }}/>
                            <input type="button" className="btn btn-warning mr-3" value={this.props.language.add}
                                   onClick={() => {
                                       this.addTitle()
                                   }}
                            />
                        </div>
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

export default withRouter(DefaultPostAttributes);


