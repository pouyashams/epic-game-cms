import React, {Component} from 'react';


class Progress extends Component {

    render() {
        return (
            <div className="fixed-bottom">
                {
                    this.props.progress ?
                        <div className="progress " style={{height: "10px"}}>
                            <div className="progress-bar progress-anime" role="progressbar" aria-valuenow="70"
                                 aria-valuemin="0"
                                 aria-valuemax="100" style={{width: "80%"}}>
                                <span className="sr-only">70% Complete</span>
                            </div>
                        </div>
                        : null
                }
            </div>
        );
    }
}

export default Progress;
