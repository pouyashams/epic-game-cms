import React, {Component} from 'react';


class Loading extends Component {

    isPhone = () => {
        return !!(navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/Android/i));
    };

    render() {
        return (
            <div className="bg-spinner">
                <div className={this.isPhone() ? "centered-phone" :this.props.language.rtl? "centered":"centered-ltr"}>
                    <div id="loader">
                        <div className="dot"/>
                        <div className="dot"/>
                        <div className="dot"/>
                        <div className="dot"/>
                        <div className="dot"/>
                        <div className="dot"/>
                        <div className="dot"/>
                        <div className="dot"/>
                        <div className="lading"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Loading;
