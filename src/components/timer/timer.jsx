import React, {Component} from 'react';


class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: {},
            seconds: this.props.seconds
        };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    secondsToTime(secs) {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({time: timeLeftVar});
        this.startTimer();
    }

    startTimer() {
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        if (seconds === 0) {
            this.props.onTime(false);
            clearInterval(this.timer);
        }
    }

    render() {
        return (
            <div className="timer radius-line">
                {this.state.time.m < 10 ?
                    this.state.time.s < 10 ?
                        <div className="timer radius-line mr-4">
                            0{this.state.time.m}:0{this.state.time.s}
                        </div>
                        : <div className="timer radius-line mr-4">
                            0{this.state.time.m}:{this.state.time.s}
                        </div>
                    : <div className="timer radius-line mr-4">
                        {this.state.time.m}:{this.state.time.s}
                    </div>
                }
            </div>
        );
    }
}

export default Timer;
