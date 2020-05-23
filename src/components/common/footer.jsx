import React from 'react';

const Footer = (props) => {
    let dir = null;
    if (props.language.rtl) {
        dir = "rtl"
    } else {
        dir = "ltr"
    }
    return (
        <footer
            className={dir + "float-left fixed-bottom navbar navbar-dark bg-color-dark col-md-9 ml-sm-auto col-lg-10 px-4 shadow"}>
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
