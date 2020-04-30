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
                        id : attributes.length + 1 ,
                        title : attribute
                    })
                });

                this.setState({
                    inputList: attributes , progress: false
                });
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('ارتباط با سرور برقرار نشد');
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
            defaultAttributes : attributes
        };
        try {
            const result = await saveOrUpdateDefaultPostAttributes(data);
            if (result.status === 200) {
                toast.success('تغغیرات با موفقیت ثبت شد');
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
            <div className="rtl border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3 body-color">
                <div
                    className=" col-12 justify-content-center align-items-center text-center header-box  text-light header-color">
                    <h4 className="py-2 ">ثبت مشخصات پیش فرض پست</h4>
                </div>
                <div className="col-12 justify-content-center align-items-center text-center body-color">
                    <div className="rtl m-0 float-right row w-100 justify-content-start body-color box-shadow my-4 border radius-line">
                        <div className="form-group col-12 ">
                            <div className="rtl m-0 float-right row w-100 justify-content-start my-1 pb-3">
                                {
                                    this.state.inputList.map(
                                        (input) => (
                                            <div className={input.id % 2 === 0 ? "col-sm-6 col-md-3 border-right" : "col-sm-6 col-md-3"}
                                                 key={input.id}>
                                                <div className="form-group col-10 float-right ">
                                                    <label>عنوان :</label>
                                                    <input className="form-control text-center w-100 "
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
                        </div>

                        <div className="col-12 p-3 text-center">
                            <input type="button" className="btn btn-success mr-3" value="انجام عملیات"
                                   onClick={() => {
                                       this.saveDefaultPostAttributes()
                                   }}/>
                            <input type="button" className="btn btn-warning mr-3" value="اضافه کردن"
                                   onClick={() => {
                                       this.addTitle()
                                   }}
                            />
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

export default withRouter(DefaultPostAttributes);


