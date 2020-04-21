import React from 'react'
import {DatePicker} from "react-advance-jalaali-datepicker";


export default class SimpleDatePicker extends React.Component {

    constructor(props) {
        super(props);
        this.change = this.change.bind(this);
    }

    change(unix, formatted) {
        this.props.onChange(formatted, this.props.name);
    }

    DatePickerInput(props) {
        return <input {...props} className="form-control bg-white text-center"/>;
    }

    render() {
        return (
            <DatePicker
                inputComponent={this.DatePickerInput}
                placeholder={this.props.placeholder}
                name={this.props.name}
                preSelected={this.props.preSelected}
                format="jYYYY/jMM/jDD"
                onChange={this.change}
                id="datePicker"
                controllValue={true}
            />
        );
    }
}