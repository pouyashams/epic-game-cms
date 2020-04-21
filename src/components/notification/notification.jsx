import React, {Component} from 'react';


class Notification extends Component {

    render() {
        const {active, boldText, type, text, closeNotification} = this.props;
        return (
            <div>
                {active ?
                    <span>

                       <div
                           className={`alert f-r notification-anime dir-text-right  ${type}`}
                           id="success-alert">
                               <strong>{boldText}: </strong>
                           {text}

                </div>
                        <span className="dis-hid">
                                                    {setTimeout(closeNotification, 6000)}
                        </span>
                </span>
                    : null
                }
            </div>
        );
    }
}

export default Notification;
