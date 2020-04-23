import React, {Component} from 'react';


class Loading extends Component {

    render() {
        return (
            <div className="bg-spinner">
                <div className="centered">
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
