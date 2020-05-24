import React from 'react';

const Footer = (props) => {
    let dir = null;
    let theme = null;
    if (props.language.rtl) {
        dir = "rtl"
    } else {
        dir = "ltr"
    }
    if (props.theme === "day") {
        theme = "bg-color-green"
    } else {
        theme = "bg-color-dark"
    }
    return (
        <footer
            className={dir + " float-left fixed-bottom navbar bg-color-dark col-md-9 ml-sm-auto col-lg-10 px-4 shadow " + theme}>
            <div className="copyright">
                <span className="fa fa-copyright m-1"/>
                {
                    props.language.footerText
                }
            </div>
            <div className="socialmedia m-1">
                <a className="fa fa-instagram pointer m-1 text-white" href="http://instagram.com/epicgameir">{""}</a>
                <a className="fa fa-telegram pointer text-white m-1"
                   href="https://t.me/joinchat/AAAAAEvgtLthuUjsNZObyg">{""}</a>
            </div>
        </footer>
    );
};

export default Footer;
