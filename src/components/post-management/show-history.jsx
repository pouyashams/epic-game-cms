import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import 'suneditor/dist/css/suneditor.min.css';
import Table from "../table/table";


class ShowHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            historyList: []
        };
    };

    componentDidMount() {
        const {historyInfo} = this.props.location;
        if (!historyInfo) return window.history.back();
        const historyList = [];
        this.getValue(historyInfo.publishHistory).forEach((history) => {

            let active = "";
            if (history.active) {
                active = <label className="text-success">{this.props.language.active}</label>
            } else {
                active = <label className="text-danger">{this.props.language.inactive}</label>
            }
            historyList.push(
                {
                    "identifier": history.identifier,
                    "creationDateTime": history.creationDateTime,
                    "lastUpdateDateTime": history.lastUpdateDateTime,
                    "active": active
                }
            )
        });

        this.setState({historyList});
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

    getResultTableHeader() {
        let headerInfo = {
            showCheckBox: false,
            actions: [],
            headerTitleInfos: [
                {name: "identifier", title: this.props.language.code},
                {name: "creationDateTime", title: this.props.language.creationDate},
                {name: "lastUpdateDateTime", title: this.props.language.updateDate},
                {name: "active", title: this.props.language.status}
            ]
        };
        return headerInfo;
    }


    render() {
        const headerInfo = this.getResultTableHeader();
        return (
            <div
                className="rtl border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3 body-color">
                <div
                    className=" col-12 justify-content-center align-items-center text-center header-box  text-light header-color">
                    <h4 className="py-2 ">{this.props.language.showHistory}</h4>
                </div>
                <div className="col-12 justify-content-center align-items-center text-center body-color py-3">
                    <Table headerInfo={headerInfo} searchResultList={this.state.historyList} pageSize={5}
                           language={this.props.language}
                    />
                    <div className="col-12 p-3 text-center">
                        <input type="button" className="btn btn-danger mr-3" value={this.props.language.back}
                               onClick={() => {
                                   this.cancel()
                               }}/>
                    </div>
                </div>

            </div>
        );
    };
}

export default withRouter(ShowHistory);


