import React, {Component} from 'react';
import {
    loadDataOfhardware,
    restartTomcat,
    killAllJava,
    receiveTime,
    sendDataTime
} from "../services/hardwareInfoService";
import {toast} from "react-toastify";
import SearchResult from "../components/search/search-result";
import {DateTimePicker} from "react-advance-jalaali-datepicker";


class hardwareInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lastExecutionTime: "",
            lastExecutionDate: "",
            cpuusagePercent: "",
            ramusagePercent: "",
            dataTime: [],
        };
        this.onDelete = this.onDelete.bind(this);
        this.addTime = this.addTime.bind(this);

    };

    addTime = () => {
        const {lastExecutionDate, lastExecutionTime} = this.state;
        if (lastExecutionDate !== "" && lastExecutionTime !== "") {
            const dataTime = this.state.dataTime.concat([{
                executionDate: this.state.lastExecutionDate,
                executionTime: this.state.lastExecutionTime
            }]);
            this.setState({dataTime});
        } else {
            toast.error('تاریخ و ساعت را انتخاب کنید');
        }
    };

    getResultTableHeader() {
        let headerInfo = {
            showCheckBox: false,
            actions: [
                {
                    name: 'delete',
                    title: 'حذف',
                    icon: 'fa fa-remove',
                    style: 'btn btn-danger btn-sm',
                    onclick: this.onDelete
                }
            ],
            headerTitleInfos: [
                {name: "executionDate", title: "تاریخ"},
                {name: "executionTime", title: "زمان"},
            ]
        };
        return headerInfo;
    }

    onDelete(data) {
        const dataInfo = this.state.dataTime.filter(dataInfos => dataInfos.executionTime !== data.executionTime && dataInfos.executionDate !== data.executionDate);
        this.setState({dataTime: dataInfo});
    }

    pickDate = (unix, formatted) => {
        this.setState({
            lastExecutionDate: formatted.substr(5, 13).substr(2, 10),
            lastExecutionTime: formatted.substr(24),
        });
    };

    async componentDidMount() {
        try {
            const result = await loadDataOfhardware();
            if (result.status === 200) {
                this.setState({
                    cpuusagePercent: result.data.data.cpuusagePercent,
                    ramusagePercent: result.data.data.ramusagePercent
                });
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('خطایی در دریافت اطلاعات رخ داده است.');
            }
        }
        this.receiveTimeInfo();
        document.getElementById("loading").style.display = "none";
    }

    restartTomcatInfo = async () => {
        const result = await restartTomcat();
        try {
            if (result.status === 200) {
                toast.success('عملیات با موفقیت انجام شد.');
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('خطایی در دریافت اطلاعات رخ داده است.');
            }
        }
        document.getElementById("loading").style.display = "none";
    };

    sendDataTimeInfo = async () => {
        const data = {
            jobCode: "RESTART_ISUNIC",
            scheduledJobExecutionList: this.state.dataTime
        };
        const result = await sendDataTime(data);
        try {
            if (result.status === 200) {
                toast.success('عملیات با موفقیت انجام شد.');
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('خطایی در دریافت اطلاعات رخ داده است.');
            }
        }
        document.getElementById("loading").style.display = "none";
    };

    killAllJavaInfo = async () => {
        await killAllJava();

    };

    receiveTimeInfo = async () => {
        try {
            const result = await receiveTime();
            if (result.status === 200) {
                const dataTime = [];
                result.data.data.forEach((data) => {
                    data.scheduledJobExecutionList.forEach((dataInfo) => {
                        dataTime.push(
                            {
                                executionDate: dataInfo.executionDate,
                                executionTime: dataInfo.executionTime,
                            }
                        )
                    });
                });
                this.setState({dataTime});
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('خطایی در دریافت اطلاعات رخ داده است.');
            }
        }
        document.getElementById("loading").style.display = "none";
    };

    DatePickerInput(props) {
        return <input {...props} className="form-control bg-white text-center"/>;
    }

    render() {
        const headerInfo = this.getResultTableHeader();
        const pageSize = 5;
        return (
            <div
                className="rtl border bg-light shadow row  m-0 text-center justify-content-center align-items-center my-3">
                <div className="col-12 justify-content-center align-items-center text-center header-box text-light">
                    <h4 className="py-2">گزارش سخت افزار</h4>
                </div>

                <div className="col-6">
                    <div
                        className=" border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3">
                        <div
                            className="col-12 justify-content-center align-items-center text-center header-box text-light">
                            <h6 className="col-12 py-2 font-weight-bold">گزارشات سخت افزار</h6>
                        </div>
                        <h6 className=" col-12 py-4">میزان RAM مصرفی شامل
                            <span
                                className="text-danger font-weight-bold"> {this.state.ramusagePercent.substring(0, 5)}%</span> می
                            باشد.
                        </h6>
                        <h6 className=" col-12 py-4"> میزان CPU مصرفی شامل
                            <span
                                className="text-danger font-weight-bold"> {this.state.cpuusagePercent.substring(0, 5)}%</span> می
                            باشد.
                        </h6>

                    </div>
                </div>

                <div className="col-6">
                    <div className=" border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3">
                        <div
                            className="col-12 justify-content-center align-items-center text-center header-box text-light">
                            <h6 className="col-12 py-2 font-weight-bold">افزودن زمان</h6>
                        </div>
                        <div className="col-10 text-center justify-content-center p-3">
                            <DateTimePicker
                                inputComponent={this.DatePickerInput}
                                placeholder="انتخاب تاریخ و ساعت"
                                format="تاریخ: jYYYY/jMM/jDD ساعت: HH:mm"
                                id="dateTimePicker"
                                onChange={this.pickDate}
                                cancelOnBackgroundClick={true}
                            />
                        </div>
                        <div className="p-4">
                            <input type="button" className="btn btn-success" value="افزودن زمان"
                                   onClick={this.addTime}/>
                        </div>
                        <div className="p-4">
                            <input type="button" className="btn btn-warning" value="ثبت نهایی"
                                   onClick={this.sendDataTimeInfo}/>
                        </div>
                    </div>

                </div>

                <div className="col-6">
                    <div
                        className=" border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3">
                        <div
                            className="col-12 justify-content-center align-items-center text-center header-box text-light">
                            <h6 className="col-12 py-2 font-weight-bold">عملیات سخت افزار</h6>
                        </div>
                        <h6 className="col-12 py-3">
                            <span
                                className="text-danger font-weight-bold"> نرم افزار: </span>
                            تها نرم افزار آیسانیک به صورت مجدد راه اندازی می شود.
                        </h6>
                        <h6 className="col-12 ">
                            <span
                                className="text-danger font-weight-bold"> جاوا: </span> تمام
                            نرم افزارهای سرور که از جاوا استفاده میکنند از حافظه خارج شده و برای استفاده مجدد لازم است
                            به صورت دستی اقدام شود.
                        </h6>
                        <div className="p-4">
                            <input type="button" className="btn btn-danger" value="نرم افزار"
                                   onClick={this.restartTomcatInfo}/>
                        </div>
                        <div className="p-4">
                            <input type="button" className="btn btn-danger" value="جاوا"
                                   onClick={this.killAllJavaInfo}/>
                        </div>
                    </div>

                </div>

                <div className="col-6">
                    <div
                        className=" border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3">
                        <div
                            className="col-12 justify-content-center align-items-center text-center header-box text-light">
                            <h6 className="col-12 py-2 font-weight-bold">جدول زمان ها</h6>
                        </div>
                        <div
                            className="col-12 text-center justify-content-center ">
                            <SearchResult headerInfo={headerInfo} searchResultList={this.state.dataTime}
                                          pageSize={pageSize}/>
                        </div>

                    </div>

                </div>

            </div>
        );
    };
}

export default hardwareInfo;


