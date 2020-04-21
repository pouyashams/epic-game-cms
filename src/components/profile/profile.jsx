import React, {Component} from 'react';

import epic from "./epic.jpg"
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <div
                className="rtl border shadow row w-100 m-0 text-center justify-content-center align-items-center my-3 body-color">
                <div
                    className="col-12 justify-content-center align-items-center text-center header-box text-light header-color">
                    <h4 className="py-2">مدیریت پروفایل</h4>
                </div>

                <div className="col-12 justify-content-center align-items-center text-center body-color py-3">



                        <div className="row">
                            <div className="col-sm-3">
                                <div className="text-center justify-content-center mr-5 ">
                                    <img src={epic} className="avatar img-circle img-thumbnail p" alt="avatar"/>
                                </div>
                            <ul className="list-group col-12 pt-4">
                                <li className="list-group-item text-muted"><i className="fa fa-dashboard fa-1x text-warning"/> فعالیت ها</li>
                                <li className="list-group-item text-right"><span className="pull-left text-success">1000</span><strong>تعداد کل</strong></li>
                                <li className="list-group-item text-right"><span className="pull-left text-primary">1000</span><strong>فروخته شده</strong></li>
                                <li className="list-group-item text-right"><span className="pull-left text-info">1000</span><strong>ثبت شده</strong></li>
                                <li className="list-group-item text-right"><span className="pull-left text-danger">1000</span><strong>حذف شده</strong></li>

                            </ul>
                        </div>
                        <div className="col-sm-9">
                            <hr/>
                                <div className="form-group justify-content-center py-2 ">
                                    <div
                                        className="col-12 justify-content-center align-items-center text-center header-box text-light header-color">
                                        <h4 className="py-2">اطلاعات پروفایل</h4>
                                    </div>
                                    <div
                                        className="col-12">
                                        <div className="rtl  float-right row   body-color box-shadow  border radius-line">
                                            <div className="form-group  col-sm-6 col-md-3 float-right pt-3 ml-2">
                                                <label className=" float-right">شماره موبایل :</label>
                                                <input className="form-control text-center w-100 dir-text-left"
                                                       type={"input"}
                                                       value={this.state.interval}
                                                       onChange={(e) => this.handelChangeInput(e.target.value, "interval")}
                                                />
                                            </div>
                                            <div className="form-group  col-sm-6 col-md-3 float-right pt-3 ml-2">
                                                <label className=" float-right">نام کاربری :</label>
                                                <input className="form-control text-center w-100 dir-text-left"
                                                       type={"input"}
                                                       value={this.state.interval}
                                                       onChange={(e) => this.handelChangeInput(e.target.value, "interval")}
                                                />
                                            </div>
                                            <div className="form-group  col-sm-6 col-md-3 float-right pt-3 ml-2"/>
                                            <div className="form-group  col-sm-6 col-md-3 float-right pt-3 ml-2">
                                                <label className=" float-right">پسورد جدید :</label>
                                                <input className="form-control text-center w-100 dir-text-left"
                                                       type={"input"}
                                                       value={this.state.interval}
                                                       onChange={(e) => this.handelChangeInput(e.target.value, "interval")}
                                                />
                                            </div>
                                            <div className="form-group  col-sm-6 col-md-3 float-right pt-3 ml-2">
                                                <label className=" float-right">تایید پسورد :</label>
                                                <input className="form-control text-center w-100 dir-text-left"
                                                       type={"input"}
                                                       value={this.state.interval}
                                                       onChange={(e) => this.handelChangeInput(e.target.value, "interval")}
                                                />
                                            </div>
                                            <div className="form-group  col-sm-6 col-md-3 float-right pt-3 ml-2">
                                                <label className=" float-right">پسورد قدیمی :</label>
                                                <input className="form-control text-center w-100 dir-text-left"
                                                       type={"input"}
                                                       value={this.state.interval}
                                                       onChange={(e) => this.handelChangeInput(e.target.value, "interval")}
                                                />
                                            </div>
                                            <div className="col-12 p-3 text-center">
                                                <input type="button" className="btn btn-success mr-3" value="اعمال تغیییرات"
                                                       onClick={() => {
                                                           this.sendBotInfo()
                                                       }}/>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                        </div>
                    </div>
                </div>


                </div>

        );
    }
}

export default Profile;
