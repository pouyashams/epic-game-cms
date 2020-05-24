import React, {Component} from 'react';
import DatePicker from "../date-picker/SimpleDatePicker";

class SearchCriteria extends Component {

    constructor(props) {
        super(props);
        const {searchCriteriaArray} = this.props;
        let parameters = {};
        searchCriteriaArray.forEach((searchCriteria) => {
            let value = (searchCriteria.defaultValue !== null && searchCriteria.defaultValue !== undefined) ? searchCriteria.defaultValue : "";
            parameters = Object.assign({}, {[searchCriteria.name]: value}, parameters);
        });
        this.state = parameters;
        this.fillParameterValue = this.fillParameterValue.bind(this);
        this.search = this.search.bind(this);
    }


    fillParameterValue = (value, name) => {
        this.setState({[name]: value});
    };

    search = () => {
        this.props.onSearch(this.state);
    };

    render() {

        const {searchCriteriaArray, extraActions} = this.props;
        let dir = null;
        if (this.props.language.rtl) {
            dir = "rtl"
        } else {
            dir = "ltr"
        }
        let index = 1;
        return (
            <div className="col-12 justify-content-center align-items-center text-center ">
                <form
                    className={this.props.theme === "day" ? dir + " m-0 dark-shadow float-right row w-100 justify-content-center my-3 pb-3 body-color-light" : dir + " m-0 white-shadow float-right row w-100 justify-content-center my-3 pb-3 body-color"}>
                    {searchCriteriaArray.map((searchCriteria) => {
                            if (searchCriteria.element === 'input') {
                                return (
                                    <div className="form-group col-12 col-sm-6 col-md-3 float-right py-3" key={index++}>
                                        <label
                                            className={this.props.theme === "day" ? "text-dark" : "text-white"}>{searchCriteria.label} :</label>
                                        <input className="form-control text-center border p-radius"
                                               onKeyPress={event => {
                                                   if (event.key === 'Enter') {
                                                       this.search()
                                                   }
                                               }}
                                               type={searchCriteria.type}
                                               placeholder={searchCriteria.placeholder}
                                               value={this.state[searchCriteria.name]}
                                               name={searchCriteria.name}
                                               onChange={(e) => this.fillParameterValue(e.target.value, searchCriteria.name)}
                                        />
                                    </div>
                                );
                            } else if (searchCriteria.element === 'number') {
                                return (
                                    <div className="form-group col-12 col-sm-6 col-md-3 float-right py-3" key={index++}>
                                        <label className={this.props.theme === "day" ? "text-dark" : "text-white"}>{searchCriteria.label} :</label>
                                        <input className="form-control text-center p-radius"
                                               onKeyPress={event => {
                                                   if (event.key === 'Enter') {
                                                       this.search()
                                                   }
                                               }}
                                               type={searchCriteria.type}
                                               placeholder={searchCriteria.placeholder}
                                               value={this.state[searchCriteria.name]}
                                               name={searchCriteria.name}
                                               onChange={(e) => this.fillParameterValue(e.target.value, searchCriteria.name)}
                                        />
                                    </div>
                                );
                            } else if (searchCriteria.element === 'select') {
                                return (
                                    <div className="form-group col-12 col-sm-6 col-md-3 float-right py-3" key={index++}>
                                        <label className={this.props.theme === "day" ? "text-dark" : "text-white"}>{searchCriteria.label} :</label>
                                        <select
                                            className="form-control text-center p-radius"
                                            onChange={(e) => this.fillParameterValue(e.target.value, searchCriteria.name)}
                                        >
                                            {searchCriteria.options.map(
                                                (option) => {
                                                    return (<option value={option.value}>{option.title}</option>);
                                                }
                                            )}
                                        </select>
                                    </div>
                                );
                            } else if (searchCriteria.element === 'date') {
                                return (
                                    <div className="form-group col-12 col-sm-6 col-md-3 float-right py-3" key={index++}>
                                        <label className={this.props.theme === "day" ? "text-dark" : "text-white"}>{searchCriteria.label} :</label>
                                        <DatePicker
                                            placeholder={searchCriteria.placeholder}
                                            onChange={this.fillParameterValue}
                                            name={searchCriteria.name}
                                        />
                                    </div>
                                );
                            } else {
                                return null;
                            }
                        }
                    )}
                    <div className="col-12">
                        <div className="row">
                            <div className="col-4 text-right py-3">
                                {extraActions && extraActions.rightActions.length !== 0 ? extraActions.rightActions.map((rightAction) => (
                                    <button className={rightAction.style} data-title={rightAction.title}
                                            onClick={rightAction.onclick} key={index++}>
                                        <span className={rightAction.icon}></span>
                                    </button>
                                )) : null}
                            </div>
                            <div className="col-4 text-center ">
                                <input type="button" className="btn btn-dark pt-1" value={this.props.language.search}
                                       onClick={this.search}/>
                            </div>
                            <div className="col-4 text-left">
                                {extraActions && extraActions.leftActions.length !== 0 ? extraActions.leftActions.map((leftAction) => (
                                    <button className={leftAction.style} data-title={leftAction.title}
                                            onClick={leftAction.onclick} key={index++}>
                                        <span className={leftAction.icon} title={leftAction.title}></span>
                                    </button>
                                )) : null}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

}

export default SearchCriteria;
